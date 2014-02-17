<?php
    error_reporting(1);
    $ch = curl_init();
    # set headers
    $headers = array(); 
    $endpoint = "currentprice.json";

    if($_GET['endpoint']){
        $endpoint = $_GET['endpoint'];
    }

    $callback = FALSE;
    $out = "";

    $base_url = "http://api.coindesk.com/v1/bpi/";
    $url        = $base_url.$endpoint;  
    
    curl_setopt($ch, CURLOPT_URL, $url);

    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 ); # return into a variable
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers ); # custom headers, see above
    $result = curl_exec( $ch ); # run!
    $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);


    // Build the result json        
    // Empty response object
    $response = new stdClass();

    // Attach results
    $response->results = json_decode($result);

    // Attach meta data
    $response->meta = new stdClass();
    
    $response->meta->originalQuery = $query;
    $response->meta->originalType = $type;
    $response->meta->originalUrl = $url;
    $response->meta->serviceStatus = $http_status;
    $response->meta->serviceMessage = "";



    if($http_status !=200){
        switch ($http_status){
            case 400:
                $response->meta->serviceMessage = "Bad Request - Please make sure you don't have strange characters in your search query, that *might* cause this error";
            break;

            case 401:
                $response->meta->serviceMessage = "Invalid API Key";
            break;

            case 404:
                $response->meta->serviceMessage = "404 Not Found - Incorrect endpoint URL";
            break;

            case 429:
                $response->meta->serviceMessage = "Sorry, we have reached API Rate Limit.. The service is obviously a success :-). Please try again in a minute!";
            break;

            case 500:
                $response->meta->serviceMessage = "API Service Is Down or an error occured, please make sure you are not using strange characters in your search and try again!";
            break;
        }
    }

    // Do we have a callback param?

    $getCallback = $_GET['callback'];

    if($getCallback && $getCallback !=""){
        $out = $getCallback."(".json_encode($response).");";  
    } else {
        // json header
        header("Content-Type: application/json");
        $out = json_encode($response);
    }

    print($out);
    



