<?php
/*
REQUIREMENTS
* A custom slash commant on a Slack team
* A web server running PHP5 with cURL enabled
USAGE
* Place this script on a server running PHP5 with cURL.
* Set up a new custom slash command on your Slack team: 
  http://my.slack.com/services/new/slash-commands
* Under "Choose a command", enter whatever you want for 
  the command. /isitup is easy to remember.
* Under "URL", enter the URL for the script on your server.
* Leave "Method" set to "Post".
* Decide whether you want this command to show in the 
  autocomplete list for slash commands.
* If you do, enter a short description and usage hing.
*/
# Grab some of the values from the slash command, create vars for post back to Slack
$command = $_POST['command'];
$text = $_POST['text'];
$token = $_POST['token'];
$channel = $_POST['channel_name'];
$channel_id = $_POST['channel_id'];
$responseUrl = 'https://hooks.slack.com/services/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';
$myMsg = 'https://slack.com/api/chat.postMessage';
# Check the token and make sure the request is from our team 
if($token != 'mN0cr5i9MFyIgiYzu4slmxpP'){ #replace this with the token from your slash command configuration page
  $msg = "The token for the slash command doesn't match. Check your script.";
  die($msg);
  echo $msg;
}
# We're just taking the text exactly as it's typed by the user. If it's not a valid domain, isitup.org will respond with a `3`.
# We want to get the JSON version back (you can also get plain text).
$url_to_check = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&as_filetype=gif&imgtype=animated&tbs=itp:animated&q=".urlencode($text);
# Set up cURL 
$ch = curl_init($url_to_check);
# Set up options for cURL 
# We want to get the value back from our query 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
# Send in our user agent string 
curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
# Make the call and get the response 
$ch_response = curl_exec($ch);
# Close the connection 
curl_close($ch);
# Decode the JSON array sent back by isitup.org
$response_array = json_decode($ch_response,false);
# Build our response 
# Note that we're using the text equivalent for an emoji at the start of each of the responses.
# You can use any emoji that is available to your Slack team, including the custom ones.
if($ch_response === FALSE){
  # isitup.org could not be reached 
  $reply = "Sorry, couldn't find ".$text;
}else{
    $reply = $response_array->responseData->results[0]->unescapedUrl;
    // $payloadURl = $responseUrl.'?payload={"attachments":[{"image_url":'.$reply.'}]}"'; 
    $data = '{"text":"Your Gif"}';
    $arrayName = array('attachments' => array(array("image_url" => $reply, "title" => $text)), "channel" => $channel_id);
    $data_string = json_encode($arrayName);
    $ch = curl_init($responseUrl);
    curl_setopt($ch,CURLOPT_URL, $responseUrl);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    // curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));   
    curl_exec($ch);
    // [0]['results']['responseData'][0]['unescapedUrl']
    // print_r($response_array);
    // print_r(array_values($response_array));
    // $response_array["responseData"]["results"][0]["unescapedUrl"];
  // if($response_array["status_code"] == 1){
  //   # Yay, the domain is up! 
  //   $reply = ":thumbsup: I am happy to report that *<http://".$response_array["domain"]."|".$response_array["domain"].">* is *up*!";
  // } else if($response_array["status_code"] == 2){
  //   # Boo, the domain is down. 
  //   $reply = ":disappointed: I am sorry to report that *<http://".$response_array["domain"]."|".$response_array["domain"].">* is *not up*!";
  // } else if($response_array["status_code"] == 3){
  //   # Uh oh, isitup.org doesn't think the domain entered by the user is valid
  //   $reply = ":interrobang: *".$text."* does not appear to be a valid domain. \n";
  //   $reply .= "Please enter both the domain name AND suffix (example: *amazon.com* or *whitehouse.gov*).";
  // }
}
# Send the reply back to the user. 
#echo ':smile: {"attachments":[{"image_url":"'.$reply.'""}]}';