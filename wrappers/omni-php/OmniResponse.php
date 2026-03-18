<?php

namespace OmniConsole\PHP;

class OmniResponse {
    public string $output;
    public string $status;
    public string $version;
    public string $server_time;

    public function __construct(string $output, string $status = "success") {
        $this->output = $output;
        $this->status = $status;
        $this->version = "1.0.0";
        $this->server_time = gmdate("Y-m-d H:i:s");
    }

    public function toJson(): string {
        return json_encode([
            "output" => $this->output,
            "status" => $this->status,
            "version" => $this->version,
            "server_time" => $this->server_time
        ]);
    }
}