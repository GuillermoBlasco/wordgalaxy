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
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
    }

    var accordionPanelTemplate = "<li id=\"{{id}}\" class=\"block social1\">\
    <a href=\"#\"><span class=\"title\">{{topic}}</span></a>\
    </li>";

    TOPIC_SERVICES = [ ];

    REF_SERVICES = [ ];

    var wordInput = $("#global-search").find("input");
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
                var panel = $("#collapse-" + hashCode(relatedTopic) + " .panel-body");
                //dispatchRefs(relatedTopic, panel);
            }
        }
    };

    var dispatchRefs = function(relatedTopic, panel) {
        for (var i = 0; i < REF_SERVICES.length; i++) {
            REF_SERVICES[i](relatedTopic, panel);
        }
    };

    var getWord = function() {
        return getURLParameter("search");
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

    $(document).ready(function() {
        wordInput.val(getWord());
        dispatchInput();
    });
})();