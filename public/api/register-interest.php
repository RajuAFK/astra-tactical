<?php
/**
 * POST /api/register-interest.php
 *
 * Body (JSON): { name, email, interest_type }
 *   interest_type ∈ {player, store, franchise}
 *
 * Inserts into `registered_interest` and (optionally) mirrors the row to a
 * Google Sheet via an Apps Script webhook (SHEET_WEBHOOK_URL in config.php).
 */

require_once __DIR__ . '/_bootstrap.php';

api_run(function() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_err('method not allowed', 405);
    }

    $body = read_json_body();

    $name          = trim((string)($body['name']          ?? ''));
    $email         = trim((string)($body['email']         ?? ''));
    $interest_type = trim((string)($body['interest_type'] ?? ''));

    if ($name === '' || mb_strlen($name) > 120) {
        json_err('invalid name', 422);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 190) {
        json_err('invalid email', 422);
    }
    if (!in_array($interest_type, ['player', 'store', 'franchise'], true)) {
        json_err('invalid interest_type', 422);
    }

    $ip = $_SERVER['HTTP_CF_CONNECTING_IP']
        ?? $_SERVER['HTTP_X_FORWARDED_FOR']
        ?? $_SERVER['REMOTE_ADDR']
        ?? null;
    if (is_string($ip) && strpos($ip, ',') !== false) {
        $ip = trim(explode(',', $ip)[0]);
    }
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? null;
    if (is_string($ua) && mb_strlen($ua) > 255) {
        $ua = mb_substr($ua, 0, 255);
    }

    $stmt = db()->prepare(
        'INSERT INTO registered_interest (name, email, interest_type, source, ip, user_agent)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $name,
        $email,
        $interest_type,
        'astratactical.com',
        $ip,
        $ua,
    ]);

    // Optional Google Sheet mirror (fire-and-forget). Skipped if SHEET_WEBHOOK_URL
    // isn't defined or is empty. Failure here never affects the form response.
    if (defined('SHEET_WEBHOOK_URL') && SHEET_WEBHOOK_URL) {
        @file_get_contents(SHEET_WEBHOOK_URL, false, stream_context_create([
            'http' => [
                'method'        => 'POST',
                'header'        => "Content-Type: text/plain\r\n",
                'content'       => json_encode([
                    'name'          => $name,
                    'email'         => $email,
                    'interest_type' => $interest_type,
                    'source'        => 'astratactical.com',
                    'created_at'    => date('c'),
                ]),
                'timeout'       => 3,
                'ignore_errors' => true,
            ],
        ]));
    }

    json_ok(['ok' => true]);
});
