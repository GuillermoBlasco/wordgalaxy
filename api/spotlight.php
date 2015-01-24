<?php
/**
 * Created by IntelliJ IDEA.
 * User: guillermoblascojimenez
 * Date: 24/01/15
 * Time: 16:13
 */
require_once "BaseAPI.php";

class DBpediaSpotlight extends BaseAPI {
    public function init_nlp($text) {
        $this->http_method = 'GET';
        $this->source_text = $text;     // save text
        // set API url
        $this->api_url = 'http://spotlight.dbpedia.org/rest/annotate';
        // set API arguments
        $this->api_args = array(
            'text' => stripslashes($text),
            'confidence' => !empty($GLOBALS['api_config']['DBpediaSpotlight']['confidence']) ? $GLOBALS['api_config']['DBpediaSpotlight']['confidence'] : 0.2,
            'support' => !empty($GLOBALS['api_config']['DBpediaSpotlight']['support']) ? $GLOBALS['api_config']['DBpediaSpotlight']['support'] : 10
        );
    }
    /**
     * process & return entities
     *
     * @return array
     */
    public function getEntities() {
        if(empty($this->entities)) {
            if (empty($this->data['Resources'])) {
                $this->entities = [];
            } else {
                foreach ($this->data['Resources'] as $e) {
                    $urls = array($e['@URI']);
                    $entity = array(
                        'name' => $e['@URI'],
                        'score' => $e['@similarityScore'],
                        'disambiguation' => $urls
                    );
                    $this->entities[] = $entity;
                }
            }
        }
        return $this->entities;
    }
}

$text = $_GET["q"];
$db = new DBpediaSpotlight();
$db->init_nlp($text);
$db->query();
$entities = $db->getEntities();

echo json_encode($entities);


?>