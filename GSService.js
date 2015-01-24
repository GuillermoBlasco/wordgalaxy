/**
 * Created by guillermoblascojimenez on 24/01/15.
 */
(function() {

    var service = function(word, callback) {

        $.ajax({
            url: "http://suggestqueries.google.com/complete/search",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
                q: word,
                client: "chrome"
            },
            success: function (res) {
                var candidates = res[1].slice(",");
                callback(candidates);
            }
        });

    };


    TOPIC_SERVICES.push(service);

})();