using Portfolio.Server.Content;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ContentOptions>(builder.Configuration.GetSection("Content"));
builder.Services.PostConfigure<ContentOptions>(options =>
{
    if (string.IsNullOrWhiteSpace(options.ContentRoot))
    {
        var repositoryContentRoot = Path.GetFullPath(Path.Combine(builder.Environment.ContentRootPath, "..", "content"));
        var publishedContentRoot = Path.Combine(builder.Environment.ContentRootPath, "content");
        options.ContentRoot = Directory.Exists(repositoryContentRoot) ? repositoryContentRoot : publishedContentRoot;
    }
});
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new ContentKindJsonConverter());
});
builder.Services.AddSingleton<IContentCatalog, FileContentCatalog>();

var app = builder.Build();

app.MapContentEndpoints();

app.Run();

public partial class Program;
