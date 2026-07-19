using System.Text.Json;
using System.Text.Json.Serialization;

namespace Portfolio.Server.Content;

public enum ContentKind
{
    Project,
    Experience,
    Practice,
    AiEngineering,
    Learning,
    Writing
}

public sealed record ContentSummary(
    string Slug,
    ContentKind Kind,
    string Title,
    string Status,
    string Summary,
    IReadOnlyList<string> Tags,
    IReadOnlyList<string> RelatedSlugs);

public sealed record ContentDocument(
    ContentSummary Summary,
    string Markdown);

public sealed class ContentKindJsonConverter : JsonConverter<ContentKind>
{
    public override ContentKind Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();
        if (TryParseWireValue(value, out var kind))
        {
            return kind;
        }

        throw new JsonException("Unsupported content kind.");
    }

    public override void Write(Utf8JsonWriter writer, ContentKind value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(ToWireValue(value));
    }

    internal static bool TryParseWireValue(string? value, out ContentKind kind)
    {
        kind = value switch
        {
            "project" => ContentKind.Project,
            "experience" => ContentKind.Experience,
            "practice" => ContentKind.Practice,
            "ai-engineering" => ContentKind.AiEngineering,
            "learning" => ContentKind.Learning,
            "writing" => ContentKind.Writing,
            _ => default
        };

        return value is "project" or "experience" or "practice" or "ai-engineering" or "learning" or "writing";
    }

    internal static string ToWireValue(ContentKind value)
    {
        return value switch
        {
            ContentKind.Project => "project",
            ContentKind.Experience => "experience",
            ContentKind.Practice => "practice",
            ContentKind.AiEngineering => "ai-engineering",
            ContentKind.Learning => "learning",
            ContentKind.Writing => "writing",
            _ => throw new JsonException("Unsupported content kind.")
        };
    }
}
