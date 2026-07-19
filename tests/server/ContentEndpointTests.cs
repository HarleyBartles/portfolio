using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Portfolio.Server.Tests;

public sealed class ContentEndpointTests
{
    [Fact]
    public async Task NavigationEndpoint_ReturnsOrderedSummariesFromRepositoryManifest()
    {
        await using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/content/navigation");
        var body = await response.Content.ReadAsStringAsync();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.DoesNotContain("Z:", body, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("content-manifest.json", body, StringComparison.OrdinalIgnoreCase);

        using var document = JsonDocument.Parse(body);
        var items = document.RootElement.EnumerateArray().ToArray();
        Assert.Equal(
            new[]
            {
                "wild-bunch",
                "portfolio",
                "experience",
                "engineering-practice",
                "ai-engineering",
                "learning-and-development",
                "agent-ready-repositories",
                "model-selection-is-engineering"
            },
            items.Select(item => item.GetProperty("slug").GetString()));
        Assert.Equal(
            new[]
            {
                "project",
                "project",
                "experience",
                "practice",
                "ai-engineering",
                "learning",
                "writing",
                "writing"
            },
            items.Select(item => item.GetProperty("kind").GetString()));
    }

    [Fact]
    public async Task DocumentEndpoint_ReturnsMarkdownDocument()
    {
        await using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/content/wild-bunch");
        var body = await response.Content.ReadAsStringAsync();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.DoesNotContain("Z:", body, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("projects/wild-bunch.md", body, StringComparison.OrdinalIgnoreCase);

        using var document = JsonDocument.Parse(body);
        Assert.Equal("wild-bunch", document.RootElement.GetProperty("summary").GetProperty("slug").GetString());
        Assert.Equal("project", document.RootElement.GetProperty("summary").GetProperty("kind").GetString());
        Assert.Contains("Wild Bunch is an active, buggy, pre-alpha project.", document.RootElement.GetProperty("markdown").GetString(), StringComparison.Ordinal);
    }

    [Fact]
    public async Task MissingDocumentEndpoint_ReturnsSafeProblemDetails()
    {
        await using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/content/missing");
        var body = await response.Content.ReadAsStringAsync();

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("application/problem+json", response.Content.Headers.ContentType?.MediaType);
        Assert.DoesNotContain("Z:", body, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("content-manifest.json", body, StringComparison.OrdinalIgnoreCase);

        using var document = JsonDocument.Parse(body);
        Assert.Equal(404, document.RootElement.GetProperty("status").GetInt32());
        Assert.Equal("Content not found", document.RootElement.GetProperty("title").GetString());
    }
}
