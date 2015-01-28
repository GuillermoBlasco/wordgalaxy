<?php
/**
 * Created by IntelliJ IDEA.
 * User: guillermoblascojimenez
 * Date: 24/01/15
 * Time: 14:24
 */
function getRandomUserAgent()
{
    $userAgents=array(
        "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30)",
        "Opera/9.20 (Windows NT 6.0; U; en)",
        "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 8.50",
        "Mozilla/4.0 (compatible; MSIE 6.0; MSIE 5.5; Windows NT 5.1) Opera 7.02 [en]",
        "Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; fr; rv:1.7) Gecko/20040624 Firefox/0.9",
        "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/48 (like Gecko) Safari/48"
    );
    $random = rand(0,count($userAgents)-1);

    return $userAgents[$random];
}
function getUrl($url) {

    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch,CURLOPT_USERAGENT,getRandomUserAgent());
    curl_setopt($ch,CURLOPT_FOLLOWLOCATION,TRUE);
    curl_setopt($ch,CURLOPT_MAXREDIRS,2);//only 2 redirects
    $output=curl_exec($ch);
    if($output === false) {
        echo "Error Number:".curl_errno($ch)."<br>";
        echo "Error String:".curl_error($ch);
    }
    curl_close($ch);
    return $output;
}

if (isset($_GET["q"])) {
    $word = $_GET["q"];
} else {
    echo "[]";
    return;
}

$duckUrl = "http://ac.duckduckgo.com/ac/?q=" . $word;
$askUrl = "http://ss.ask.com/query?li=ff&sstype=prefix&q=" . $word;

$duckJson = getUrl($duckUrl);
$askJson = getUrl($askUrl);
$duckResults = json_decode($duckJson, true);
$askResults = json_decode($askJson, true);
$results = [];

foreach ($duckResults as $duckResult) {
    array_push($results, array_values($duckResult)[0]);
}

$results = array_merge($results, $askResults[1]);

echo json_encode(array_unique($results));


?>