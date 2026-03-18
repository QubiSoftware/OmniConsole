<?php

namespace OmniConsole\PHP;

class OmniConsole {
    /**
     * Handle the incoming terminal request and execute the processor.
     */
    public static function handle(callable $commandProcessor): void {
        // Only accept POST requests
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(["error" => "Only POST requests allowed"]);
            return;
        }

        // Get JSON input
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (isset($data['command'])) {
            try {
                // Execute developer's logic
                $result = $commandProcessor($data['command']);
                
                $response = new OmniResponse($result);
                
                header('Content-Type: application/json');
                echo $response->toJson();
            } catch (\Exception $e) {
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Invalid command format"]);
        }
    }
}