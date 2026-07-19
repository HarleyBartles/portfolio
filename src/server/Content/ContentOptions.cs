namespace Portfolio.Server.Content;

public sealed class ContentOptions
{
    public string ContentRoot { get; set; } = string.Empty;

    public string ManifestFileName { get; set; } = "content-manifest.json";
}
