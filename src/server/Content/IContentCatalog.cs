namespace Portfolio.Server.Content;

public interface IContentCatalog
{
    IReadOnlyList<ContentSummary> GetNavigation();

    ContentDocument? GetBySlug(string slug);
}
