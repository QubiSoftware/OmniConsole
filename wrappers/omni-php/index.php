<?php

require_once 'OmniResponse.php';
require_once 'OmniConsole.php';

use OmniConsole\PHP\OmniConsole;

// Simple usage in a standard PHP file
OmniConsole::handle(function($command) {
    $cmd = strtolower(trim($command));

    return match($cmd) {
        "status" => "PHP Backend is Active. Engine: " . phpversion(),
        "whoami" => "Current User: PHPMaster (Qubi Software)",
        "help" => "Available: status, whoami, help",
        default => "PHP processed: " . $command,
    };
});