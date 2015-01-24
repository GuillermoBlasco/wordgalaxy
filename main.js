/**
 * Created by guillermoblascojimenez on 23/01/15.
 */
(function() {

    var hashCode = function(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    };
    var arrayUnique = function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
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
                <div class=\"panel-body\">\
                    <div class=\"container\">\
                    </div>\
                </div> \
            </div> \
        </div>";

    TOPIC_SERVICES = [ ];

    REF_SERVICES = [ ];

    var wordInput = $("#wordInput");
    var resultSet = $("#resultset");

    var topics = [];
    var servicesDone = 0;

    var dispatchRelatedTopic = function(relatedTopics) {
        topics = topics.concat(relatedTopics);
        servicesDone += 1;
        if (servicesDone === TOPIC_SERVICES.length) {
            topics = arrayUnique(topics);
            for (var j = 0; j < topics.length; j++) {
                var relatedTopic = topics[j];
                var data = {
                    id : hashCode(relatedTopic),
                    topic : relatedTopic
                };
                resultSet.append(Mustache.render(accordionPanelTemplate, data));
                var topicElement = $("#collapse-" + hashCode(relatedTopic) + " .panel-body");
                for (var i = 0; i < REF_SERVICES.length; i++) {
                    REF_SERVICES[i](relatedTopic, topicElement);
                }
            }
        }
    };


    var getWord = function() {
        return wordInput.val();
    };
    var dispatchInput = function() {
        resultSet.empty();
        var word = getWord();
        servicesDone = 0;
        topics = [];
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