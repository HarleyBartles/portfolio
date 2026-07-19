using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Portfolio.Server.Tests;

public sealed class HealthEndpointTests
{
    [Fact]
    public async Task HealthEndpointReturnsOk()
    {
        await using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/health");
        var body = await response.Content.ReadAsStringAsync();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Contains("Healthy", body, StringComparison.OrdinalIgnoreCase);
    }
}
