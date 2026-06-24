<?php
/**
 * Public-API bootstrap. Every /api/*.php file requires this first.
 *
 *  - Loads config (PDO factory, constants) from /private/config.php.
 *  - Emits JSON + CORS headers.
 *  - Handles OPTIONS preflight without DB work.
 *  - Provides json_ok() / json_err() helpers + a top-level try wrapper.
 */

require_once __DIR__ . '/../../private/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Vary: Origin');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

// CORS — allow the production origin and (optionally) a dev origin.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = [ALLOWED_ORIGIN];
if (defined('ALLOWED_DEV_ORIGIN') && ALLOWED_DEV_ORIGIN) {
    $allowed[] = ALLOWED_DEV_ORIGIN;
}
if (in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 3600');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function json_ok($data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function json_err(string $message, int $code = 400, array $extra = []): void {
    http_response_code($code);
    echo json_encode(array_merge(['error' => $message], $extra));
    exit;
}

/**
 * Wrap endpoint logic in a try that hides PDO/exception internals in production.
 *     api_run(function() { ... json_ok(...); });
 */
function api_run(callable $fn): void {
    try {
        $fn();
    } catch (Throwable $e) {
        error_log('[api] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
        $msg = APP_ENV === 'production' ? 'internal error' : $e->getMessage();
        json_err($msg, 500);
    }
}

function read_json_body(): array {
    $raw = file_get_contents('php://input');
    if ($raw === '' || $raw === false) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}
