namespace OmniConsole.DotNet;

/// <summary>
/// Represents the incoming request from the terminal frontend.
/// </summary>
public class OmniRequest
{
    public string Command { get; set; } = string.Empty;
    public string? Timestamp { get; set; }
}

/// <summary>
/// Represents the standard response format sent back to the terminal.
/// </summary>
public class OmniResponse
{
    public string Output { get; set; } = string.Empty;
    public string Status { get; set; } = "success";
    public string Version { get; set; } = "1.0.0";
    public DateTime ServerTime { get; set; } = DateTime.UtcNow;
}