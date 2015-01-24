/**
 * Created by guillermoblascojimenez on 23/01/15.
 */
(function() {

    var hashCode = function(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    };

    var accordionPanelTemplate =
        "<div class=\"panel panel-default\"> \
            <div class=\"panel-heading\" role=\"tab\" id=\"{{id}}\"> \
                <h4 class=\"panel-title\"> \
                    <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse-{{id}}\" aria-expanded=\"false\" aria-controls=\"collapse-{{id}}\"> \
                    {{topic}} \
                    </a> \
                </h4> \
            </div> \
            <div id=\"collapse-{{id}}\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"{{id}}\"> \
                <div class=\"panel-body\"></div> \
            </div> \
        </div>";

    TOPIC_SERVICES = [ ];

    REF_SERVICES = [ ];

    var wordInput = $("#wordInput");
    var resultSet = $("#resultset");

    var dispatchRelatedTopic = function(relatedTopics) {
        for (var j = 0; j < relatedTopics.length; j++) {
            var relatedTopic = relatedTopics[j];
            var data = {
                id : hashCode(relatedTopic),
                topic : relatedTopic
            };
            resultSet.append(Mustache.render(accordionPanelTemplate, data));
            for (var i = 0; i < REF_SERVICES.length; i++) {
                REF_SERVICES[i](relatedTopic, dispatchRefs(relatedTopic));
            }
        }
    };

    var dispatchRefs = function(relatedTopic) {
        var topicElement = $("#collapse-" + hashCode(relatedTopic) + " .panel-body");
        return function(refs) {
            for (var i = 0; i < refs.length; i++) {
                topicElement.append("<a href=\"" + refs + "\">link " + i + "</a>");
            }
        };
    };

    var getWord = function() {
        return wordInput.val();
    };
    var dispatchInput = function() {
        resultSet.empty();
        var word = getWord();
        for (var i = 0; i < TOPIC_SERVICES.length; i++) {
           TOPIC_SERVICES[i](word, dispatchRelatedTopic);
        }
    };

    $("#searchButton").click(dispatchInput);
    wordInput.keyup(function(e) {
        if(e.keyCode == 13) {
            dispatchInput();
        }
    });
})();