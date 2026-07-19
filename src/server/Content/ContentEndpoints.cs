namespace Portfolio.Server.Content;

public static class ContentEndpoints
{
    public static IEndpointRouteBuilder MapContentEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/health", () => Results.Text("Healthy", "text/plain"));
        endpoints.MapGet("/api/content/navigation", (IContentCatalog catalog) => Results.Ok(catalog.GetNavigation()));
        endpoints.MapGet("/api/content/{slug}", (string slug, IContentCatalog catalog) =>
        {
            var document = catalog.GetBySlug(slug);
            return document is null
                ? Results.Problem(statusCode: StatusCodes.Status404NotFound, title: "Content not found")
                : Results.Ok(document);
        });

        return endpoints;
    }
}
