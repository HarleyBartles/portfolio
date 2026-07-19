using System.Text.Json;
using Microsoft.Extensions.Options;
using Portfolio.Server.Content;

namespace Portfolio.Server.Tests;

public sealed class FileContentCatalogTests
{
    [Fact]
    public void GetNavigation_LoadsSummariesInManifestOrder()
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

        var catalog = CreateCatalog(fixture.Root);

        var navigation = catalog.GetNavigation();

        Assert.Equal(new[] { "portfolio", "wild-bunch" }, navigation.Select(item => item.Slug));
        Assert.All(navigation, item => Assert.Equal(string.Empty, item.Status));
        Assert.Equal("The Wild Bunch project.", navigation[1].Summary);
    }

    [Fact]
    public void GetBySlug_ReturnsDocumentWithMarkdown()
    {
        using var fixture = new ContentFixture();
        fixture.WriteMarkdown("projects/wild-bunch.md", "Line one\r\nLine two\r\n");
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                ManifestItem("wild-bunch", "project", "Wild Bunch", "The Wild Bunch project.", "projects/wild-bunch.md")
            }
        });

        var catalog = CreateCatalog(fixture.Root);

        var document = catalog.GetBySlug("wild-bunch");

        Assert.NotNull(document);
        Assert.Equal("wild-bunch", document.Summary.Slug);
        Assert.Equal("Line one\nLine two\n", document.Markdown);
    }

    [Fact]
    public void GetBySlug_ReturnsNullForMissingSlug()
    {
        using var fixture = new ContentFixture();
        fixture.WriteMarkdown("projects/wild-bunch.md", "Wild Bunch");
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                ManifestItem("wild-bunch", "project", "Wild Bunch", "The Wild Bunch project.", "projects/wild-bunch.md")
            }
        });

        var catalog = CreateCatalog(fixture.Root);

        var document = catalog.GetBySlug("missing");

        Assert.Null(document);
    }

    [Fact]
    public void Constructor_RejectsMissingMarkdownWithoutLeakingFilesystemPath()
    {
        using var fixture = new ContentFixture();
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                ManifestItem("wild-bunch", "project", "Wild Bunch", "The Wild Bunch project.", "projects/wild-bunch.md")
            }
        });

        var exception = Assert.Throws<InvalidDataException>(() => CreateCatalog(fixture.Root));

        Assert.Contains("projects/wild-bunch.md", exception.Message, StringComparison.Ordinal);
        Assert.DoesNotContain(fixture.Root, exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Theory]
    [InlineData("C:/content/wild-bunch.md")]
    [InlineData("/content/wild-bunch.md")]
    [InlineData("../wild-bunch.md")]
    [InlineData("projects/../wild-bunch.md")]
    public void Constructor_RejectsUnsafeMarkdownPaths(string path)
    {
        using var fixture = new ContentFixture();
        fixture.WriteManifest(new
        {
            items = new object[]
            {
                ManifestItem("wild-bunch", "project", "Wild Bunch", "The Wild Bunch project.", path)
            }
        });

        var exception = Assert.Throws<InvalidDataException>(() => CreateCatalog(fixture.Root));

        Assert.Contains("unsafe path", exception.Message, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain(fixture.Root, exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void Constructor_RejectsUnknownKinds()
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

        var exception = Assert.Throws<InvalidDataException>(() => CreateCatalog(fixture.Root));

        Assert.Contains("unsupported kind", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void Constructor_RejectsDuplicateSlugs()
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

        var exception = Assert.Throws<InvalidDataException>(() => CreateCatalog(fixture.Root));

        Assert.Contains("duplicate slug", exception.Message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void ContentKindSerialization_UsesExplicitKebabCaseWireValues()
    {
        var values = Enum.GetValues<ContentKind>()
            .ToDictionary(
                kind => kind,
                kind => JsonSerializer.Serialize(kind, JsonOptions()));

        Assert.Equal("\"project\"", values[ContentKind.Project]);
        Assert.Equal("\"experience\"", values[ContentKind.Experience]);
        Assert.Equal("\"practice\"", values[ContentKind.Practice]);
        Assert.Equal("\"ai-engineering\"", values[ContentKind.AiEngineering]);
        Assert.Equal("\"learning\"", values[ContentKind.Learning]);
        Assert.Equal("\"writing\"", values[ContentKind.Writing]);
    }

    private static FileContentCatalog CreateCatalog(string root)
    {
        return new FileContentCatalog(Options.Create(new ContentOptions { ContentRoot = root }));
    }

    private static JsonSerializerOptions JsonOptions()
    {
        var options = new JsonSerializerOptions(JsonSerializerDefaults.Web);
        options.Converters.Add(new ContentKindJsonConverter());
        return options;
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

    private sealed class ContentFixture : IDisposable
    {
        public string Root { get; } = System.IO.Path.Combine(
            System.IO.Path.GetTempPath(),
            "portfolio-content-catalog-tests",
            Guid.NewGuid().ToString("N"));

        public void WriteManifest(object manifest)
        {
            Directory.CreateDirectory(Root);
            var json = JsonSerializer.Serialize(manifest, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(System.IO.Path.Combine(Root, "content-manifest.json"), json);
        }

        public void WriteMarkdown(string relativePath, string content)
        {
            var path = System.IO.Path.Combine(Root, relativePath.Replace('/', System.IO.Path.DirectorySeparatorChar));
            Directory.CreateDirectory(System.IO.Path.GetDirectoryName(path)!);
            File.WriteAllText(path, content);
        }

        public void Dispose()
        {
            if (Directory.Exists(Root))
            {
                Directory.Delete(Root, recursive: true);
            }
        }
    }
}
