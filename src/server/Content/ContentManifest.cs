namespace Portfolio.Server.Content;

public sealed record ContentManifest(IReadOnlyList<ContentManifestItem> Items);

public sealed record ContentManifestItem(
    string Slug,
    ContentKind Kind,
    string Title,
    string? Status,
    string Summary,
    string Path,
    IReadOnlyList<string> Tags,
    IReadOnlyList<string> RelatedSlugs,
    string Markdown);
