using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace OmniConsole.DotNet;

public class OmniMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _path;
    private readonly Func<string, string> _processor;

    public OmniMiddleware(RequestDelegate next, string path, Func<string, string> processor)
    {
        _next = next;
        _path = path;
        _processor = processor;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path == _path && context.Request.Method == "POST")
        {
            using var reader = new StreamReader(context.Request.Body);
            var body = await reader.ReadToEndAsync();
            var request = JsonSerializer.Deserialize<OmniRequest>(body, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (request != null)
            {
                var result = _processor(request.Command);
                var response = new OmniResponse { Output = result };
                
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
                return;
            }
        }
        await _next(context);
    }
}