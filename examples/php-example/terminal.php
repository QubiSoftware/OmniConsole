<?php
require_once __DIR__ . '/../../wrappers/omni-php/OmniConsole.php';
use OmniConsole\PHP\OmniConsole;

// Simple CORS header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

OmniConsole::handle(function($cmd) {
    return "PHP Backend response for: " . htmlspecialchars($cmd);
});