<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


$url = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
$parameters = [
    'start' => '1',
    'limit' => '100', // Adjust limit as needed
    'convert' => 'USD'
];

$headers = [
    'Accepts: application/json',
    'X-CMC_PRO_API_KEY: fabb54ac-627f-4910-8f3b-3758fb408864'
];

$qs = http_build_query($parameters); // Query string encode the parameters
$request = "{$url}?{$qs}"; // Create the request URL

$curl = curl_init(); // Initialize cURL session
curl_setopt_array($curl, [
    CURLOPT_URL => $request,         // Set the request URL
    CURLOPT_HTTPHEADER => $headers,  // Set the headers
    CURLOPT_RETURNTRANSFER => true   // Return response as a string
]);

$response = curl_exec($curl); // Execute cURL session
curl_close($curl); // Close cURL session

header('Content-Type: application/json');
echo $response; // Output JSON response from CoinMarketCap API
?>
