using System.Text.Json;
using Portfolio.Server.Content;

namespace Portfolio.Server.Tests;

public sealed class ContentManifestTests
{
    [Fact]
    public async Task LoadsValidManifest()
    {
        using var fixture = new ContentFixture();
        fixture.WriteMarkdown("projects/wild-bunch.md", "Line one\r\nLine two\r\n");
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                new
                {
                    slug = "wild-bunch",
                    kind = "project",
                    title = "Wild Bunch",
                    status = "pre-alpha",
                    summary = "A work-in-progress project demonstrating deliberate complex architecture.",
                    path = "projects/wild-bunch.md",
                    tags = new[] { "project", "architecture" },
                    relatedSlugs = new[] { "engineering-practice" }
                }
            }
        });

        var manifest = await ContentManifestLoader.LoadAsync(fixture.ManifestPath);

        var item = Assert.Single(manifest.Items);
        Assert.Equal("wild-bunch", item.Slug);
        Assert.Equal(ContentKind.Project, item.Kind);
        Assert.Equal("Wild Bunch", item.Title);
        Assert.Equal("pre-alpha", item.Status);
        Assert.Equal("A work-in-progress project demonstrating deliberate complex architecture.", item.Summary);
        Assert.Equal("projects/wild-bunch.md", item.Path);
        Assert.Equal(new[] { "project", "architecture" }, item.Tags);
        Assert.Equal(new[] { "engineering-practice" }, item.RelatedSlugs);
        Assert.Equal("Line one\nLine two\n", item.Markdown);
    }

    [Fact]
    public async Task PreservesManifestOrdering()
    {
        using var fixture = new ContentFixture();
        fixture.WriteMarkdown("projects/portfolio.md", "Portfolio");
        fixture.WriteMarkdown("projects/wild-bunch.md", "Wild Bunch");
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                ManifestItem("portfolio", "project", "Portfolio", "The portfolio project.", "projects/portfolio.md"),
                ManifestItem("wild-bunch", "project", "Wild Bunch", "The Wild Bunch project.", "projects/wild-bunch.md")
            }
        });

        var manifest = await ContentManifestLoader.LoadAsync(fixture.ManifestPath);

        Assert.Equal(new[] { "portfolio", "wild-bunch" }, manifest.Items.Select(item => item.Slug));
    }

    [Fact]
    public async Task RejectsDuplicateSlugs()
    {
        using var fixture = new ContentFixture();
        fixture.WriteMarkdown("projects/portfolio.md", "Portfolio");
        fixture.WriteMarkdown("projects/wild-bunch.md", "Wild Bunch");
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                ManifestItem("portfolio", "project", "Portfolio", "The portfolio project.", "projects/portfolio.md"),
                ManifestItem("portfolio", "project", "Duplicate", "A duplicate slug.", "projects/wild-bunch.md")
            }
        });

        var exception = await Assert.ThrowsAsync<InvalidDataException>(
            () => ContentManifestLoader.LoadAsync(fixture.ManifestPath));
        Assert.Contains("duplicate slug", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task RejectsUnsupportedKinds()
    {
        using var fixture = new ContentFixture();
        fixture.WriteMarkdown("projects/wild-bunch.md", "Wild Bunch");
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                ManifestItem("wild-bunch", "case-study", "Wild Bunch", "The Wild Bunch project.", "projects/wild-bunch.md")
            }
        });

        var exception = await Assert.ThrowsAsync<InvalidDataException>(
            () => ContentManifestLoader.LoadAsync(fixture.ManifestPath));
        Assert.Contains("unsupported kind", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Theory]
    [InlineData("", "Summary")]
    [InlineData("   ", "Summary")]
    [InlineData("Title", "")]
    [InlineData("Title", "   ")]
    public async Task RejectsEmptyTitleOrSummary(string title, string summary)
    {
        using var fixture = new ContentFixture();
        fixture.WriteMarkdown("projects/wild-bunch.md", "Wild Bunch");
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                ManifestItem("wild-bunch", "project", title, summary, "projects/wild-bunch.md")
            }
        });

        var exception = await Assert.ThrowsAsync<InvalidDataException>(
            () => ContentManifestLoader.LoadAsync(fixture.ManifestPath));
        Assert.Contains("title and summary", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Theory]
    [InlineData("C:/content/wild-bunch.md")]
    [InlineData("/content/wild-bunch.md")]
    [InlineData("../wild-bunch.md")]
    [InlineData("projects/../wild-bunch.md")]
    public async Task RejectsAbsolutePathsAndPathsContainingTraversalSegments(string path)
    {
        using var fixture = new ContentFixture();
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                ManifestItem("wild-bunch", "project", "Wild Bunch", "The Wild Bunch project.", path)
            }
        });

        var exception = await Assert.ThrowsAsync<InvalidDataException>(
            () => ContentManifestLoader.LoadAsync(fixture.ManifestPath));
        Assert.Contains("unsafe path", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task RejectsManifestPathThatDoesNotResolveToMarkdownFile()
    {
        using var fixture = new ContentFixture();
        fixture.WriteText("projects/wild-bunch.txt", "Wild Bunch");
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                ManifestItem("wild-bunch", "project", "Wild Bunch", "The Wild Bunch project.", "projects/wild-bunch.txt")
            }
        });

        var exception = await Assert.ThrowsAsync<InvalidDataException>(
            () => ContentManifestLoader.LoadAsync(fixture.ManifestPath));
        Assert.Contains("Markdown", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task RepositoryContentManifestLoadsInitialContentContract()
    {
        var manifestPath = System.IO.Path.Combine(FindRepositoryRoot(), "src", "content", "content-manifest.json");

        var manifest = await ContentManifestLoader.LoadAsync(manifestPath);

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
            manifest.Items.Select(item => item.Slug));
        Assert.Equal(2, manifest.Items.Count(item => item.Kind == ContentKind.Project));
        Assert.Equal(3, manifest.Items.Count(item => item.Kind == ContentKind.Capability));
        Assert.Single(manifest.Items, item => item.Kind == ContentKind.Learning);
        Assert.Equal(2, manifest.Items.Count(item => item.Kind == ContentKind.Writing));
        Assert.All(manifest.Items, item => Assert.NotEmpty(item.Markdown));
        Assert.Contains("Harley Bartles: Full Stack Software Engineer", manifest.Items.Single(item => item.Slug == "portfolio").Markdown);
        Assert.Contains(
            "AI-forward. Stack-agnostic. Experienced across languages, frameworks, and full-stack systems.",
            manifest.Items.Single(item => item.Slug == "portfolio").Markdown);
    }

    private static object ManifestItem(string slug, string kind, string title, string summary, string path)
    {
        return new
        {
            slug,
            kind,
            title,
            summary,
            path,
            tags = Array.Empty<string>(),
            relatedSlugs = Array.Empty<string>()
        };
    }

    private static string FindRepositoryRoot()
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);

        while (directory is not null)
        {
            var manifestPath = System.IO.Path.Combine(directory.FullName, "src", "content", "content-manifest.json");
            if (File.Exists(manifestPath))
            {
                return directory.FullName;
            }

            directory = directory.Parent;
        }

        throw new InvalidOperationException("Could not find repository root.");
    }

    private sealed class ContentFixture : IDisposable
    {
        private readonly string _root = System.IO.Path.Combine(
            System.IO.Path.GetTempPath(),
            "portfolio-content-tests",
            Guid.NewGuid().ToString("N"));

        public string ManifestPath => System.IO.Path.Combine(_root, "content-manifest.json");

        public void WriteManifest(object manifest)
        {
            Directory.CreateDirectory(_root);
            var json = JsonSerializer.Serialize(manifest, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(ManifestPath, json);
        }

        public void WriteMarkdown(string relativePath, string content)
        {
            WriteText(relativePath, content);
        }

        public void WriteText(string relativePath, string content)
        {
            var path = System.IO.Path.Combine(_root, relativePath.Replace('/', System.IO.Path.DirectorySeparatorChar));
            Directory.CreateDirectory(System.IO.Path.GetDirectoryName(path)!);
            File.WriteAllText(path, content);
        }

        public void Dispose()
        {
            if (Directory.Exists(_root))
            {
                Directory.Delete(_root, recursive: true);
            }
        }
    }
}
