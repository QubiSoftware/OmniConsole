using OmniConsole.DotNet;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(); // Enable CORS for Frontend communication

var app = builder.Build();
app.UseCors(p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Setup Terminal at "/api/terminal"
app.UseOmniConsole("/api/terminal", (cmd) => {
    return cmd.ToLower() switch {
        "help" => "Try: info, server, clear",
        "info" => "OmniConsole .NET Example v1.0",
        "server" => $"Machine: {Environment.MachineName} | OS: {Environment.OSVersion}",
        _ => $"[DotNet Server]: Executed '{cmd}'"
    };
});

app.Run("http://localhost:5000");