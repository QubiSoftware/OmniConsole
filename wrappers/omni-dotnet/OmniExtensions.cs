using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace OmniConsole.DotNet;

public static class OmniExtensions
{
    /// <summary>
    /// Registers the OmniConsole Terminal middleware to the request pipeline.
    /// </summary>
    /// <param name="app">The IApplicationBuilder instance.</param>
    /// <param name="path">The endpoint path (e.g., "/api/terminal").</param>
    /// <param name="commandProcessor">The logic function that processes the command and returns a string response.</param>
    public static IApplicationBuilder UseOmniConsole(this IApplicationBuilder app, string path, Func<string, string> commandProcessor)
    {
        return app.Map(path, builder =>
        {
            builder.Run(async context =>
            {
                // Only allow POST requests
                if (context.Request.Method != "POST")
                {
                    context.Response.StatusCode = StatusCodes.Status405MethodNotAllowed;
                    await context.Response.WriteAsync("OmniConsole: Only POST method is allowed.");
                    return;
                }

                try
                {
                    // Read the body content
                    using var reader = new StreamReader(context.Request.Body);
                    var body = await reader.ReadToEndAsync();
                    
                    var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                    var requestData = JsonSerializer.Deserialize<OmniRequest>(body, jsonOptions);

                    if (requestData != null)
                    {
                        // Execute user-defined logic
                        string resultOutput = commandProcessor(requestData.Command);

                        // Create standard response
                        var finalResponse = new OmniResponse 
                        { 
                            Output = resultOutput 
                        };

                        context.Response.ContentType = "application/json";
                        await context.Response.WriteAsync(JsonSerializer.Serialize(finalResponse, jsonOptions));
                    }
                }
                catch (Exception ex)
                {
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = ex.Message }));
                }
            });
        });
    }
}