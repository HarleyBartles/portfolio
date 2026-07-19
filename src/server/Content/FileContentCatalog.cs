using Microsoft.Extensions.Options;

namespace Portfolio.Server.Content;

public sealed class FileContentCatalog : IContentCatalog
{
    private readonly IReadOnlyList<ContentSummary> _navigation;
    private readonly IReadOnlyDictionary<string, ContentDocument> _documentsBySlug;

    public FileContentCatalog(IOptions<ContentOptions> options)
    {
        ArgumentNullException.ThrowIfNull(options);

        var contentOptions = options.Value;
        if (string.IsNullOrWhiteSpace(contentOptions.ContentRoot))
        {
            throw new InvalidOperationException("Content root is required.");
        }

        var manifestFileName = string.IsNullOrWhiteSpace(contentOptions.ManifestFileName)
            ? "content-manifest.json"
            : contentOptions.ManifestFileName;
        var manifestPath = Path.Combine(contentOptions.ContentRoot, manifestFileName);
        var manifest = ContentManifestLoader.LoadAsync(manifestPath).GetAwaiter().GetResult();

        var documents = manifest.Items
            .Select(item =>
            {
                var summary = new ContentSummary(
                    item.Slug,
                    item.Kind,
                    item.Title,
                    item.Status,
                    item.Summary,
                    item.Tags,
                    item.RelatedSlugs);

                return new ContentDocument(summary, item.Markdown);
            })
            .ToArray();

        _navigation = Array.AsReadOnly(documents.Select(document => document.Summary).ToArray());
        _documentsBySlug = documents.ToDictionary(document => document.Summary.Slug, StringComparer.OrdinalIgnoreCase);
    }

    public IReadOnlyList<ContentSummary> GetNavigation()
    {
        return _navigation;
    }

    public ContentDocument? GetBySlug(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return null;
        }

        return _documentsBySlug.TryGetValue(slug, out var document) ? document : null;
    }
}
