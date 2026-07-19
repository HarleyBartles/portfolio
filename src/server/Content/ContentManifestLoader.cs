using System.Text;
using System.Text.Json;

namespace Portfolio.Server.Content;

public static class ContentManifestLoader
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public static async Task<ContentManifest> LoadAsync(string manifestPath, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(manifestPath))
        {
            throw new ArgumentException("Manifest path is required.", nameof(manifestPath));
        }

        var fullManifestPath = System.IO.Path.GetFullPath(manifestPath);
        var contentRoot = System.IO.Path.GetDirectoryName(fullManifestPath)
            ?? throw new InvalidDataException("Manifest path must have a containing directory.");

        await using var stream = File.OpenRead(fullManifestPath);
        var manifest = await JsonSerializer.DeserializeAsync<ManifestDocument>(stream, JsonOptions, cancellationToken)
            ?? throw new InvalidDataException("Manifest is empty.");

        if (manifest.Items is null)
        {
            throw new InvalidDataException("Manifest must contain an items array.");
        }

        var seenSlugs = new HashSet<string>(StringComparer.Ordinal);
        var items = new List<ContentManifestItem>(manifest.Items.Count);

        foreach (var item in manifest.Items)
        {
            ValidateText(item.Slug, "slug");
            ValidateTitleAndSummary(item.Title, item.Summary);

            if (!seenSlugs.Add(item.Slug))
            {
                throw new InvalidDataException($"Manifest contains duplicate slug '{item.Slug}'.");
            }

            if (!ContentKindJsonConverter.TryParseWireValue(item.Kind, out var kind))
            {
                throw new InvalidDataException($"Manifest item '{item.Slug}' has unsupported kind '{item.Kind}'.");
            }

            var relativePath = ValidateRelativeMarkdownPath(item.Slug, item.Path);
            var markdownPath = ResolveMarkdownPath(contentRoot, relativePath);
            var markdown = await File.ReadAllTextAsync(markdownPath, Encoding.UTF8, cancellationToken);

            items.Add(new ContentManifestItem(
                item.Slug,
                kind,
                item.Title,
                string.IsNullOrWhiteSpace(item.Status) ? string.Empty : item.Status,
                item.Summary,
                relativePath,
                ToReadOnlyList(item.Tags),
                ToReadOnlyList(item.RelatedSlugs),
                NormalizeLineEndings(markdown)));
        }

        return new ContentManifest(items);
    }

    private static void ValidateText(string value, string fieldName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new InvalidDataException($"Manifest item has empty {fieldName}.");
        }
    }

    private static void ValidateTitleAndSummary(string title, string summary)
    {
        if (string.IsNullOrWhiteSpace(title) || string.IsNullOrWhiteSpace(summary))
        {
            throw new InvalidDataException("Manifest item must have non-empty title and summary.");
        }
    }

    private static string ValidateRelativeMarkdownPath(string slug, string path)
    {
        ValidateText(path, "path");

        if (IsAbsolutePath(path))
        {
            throw new InvalidDataException($"Manifest item '{slug}' has unsafe path '{path}'.");
        }

        var segments = path.Split(['/', '\\'], StringSplitOptions.RemoveEmptyEntries);
        if (segments.Any(segment => segment == ".."))
        {
            throw new InvalidDataException($"Manifest item '{slug}' has unsafe path '{path}'.");
        }

        if (!path.EndsWith(".md", StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidDataException($"Manifest item '{slug}' does not resolve to a Markdown file.");
        }

        return string.Join('/', segments);
    }

    private static bool IsAbsolutePath(string path)
    {
        return System.IO.Path.IsPathRooted(path)
            || path.StartsWith("/", StringComparison.Ordinal)
            || path.StartsWith("\\", StringComparison.Ordinal)
            || (path.Length >= 3
                && char.IsAsciiLetter(path[0])
                && path[1] == ':'
                && (path[2] == '/' || path[2] == '\\'));
    }

    private static string ResolveMarkdownPath(string contentRoot, string relativePath)
    {
        var combinedPath = System.IO.Path.Combine(
            contentRoot,
            relativePath.Replace('/', System.IO.Path.DirectorySeparatorChar));
        var fullPath = System.IO.Path.GetFullPath(combinedPath);
        var rootPrefix = contentRoot.TrimEnd(System.IO.Path.DirectorySeparatorChar, System.IO.Path.AltDirectorySeparatorChar)
            + System.IO.Path.DirectorySeparatorChar;

        if (!fullPath.StartsWith(rootPrefix, StringComparison.OrdinalIgnoreCase) || !File.Exists(fullPath))
        {
            throw new InvalidDataException($"Manifest path '{relativePath}' does not resolve to a Markdown file.");
        }

        return fullPath;
    }

    private static string NormalizeLineEndings(string value)
    {
        return value.Replace("\r\n", "\n", StringComparison.Ordinal)
            .Replace("\r", "\n", StringComparison.Ordinal);
    }

    private static IReadOnlyList<string> ToReadOnlyList(string[]? values)
    {
        return Array.AsReadOnly(values?.ToArray() ?? []);
    }

    private sealed record ManifestDocument(List<ManifestItem>? Items);

    private sealed record ManifestItem(
        string Slug,
        string Kind,
        string Title,
        string? Status,
        string Summary,
        string Path,
        string[]? Tags,
        string[]? RelatedSlugs);
}
