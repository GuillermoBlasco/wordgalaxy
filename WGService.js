/**
 * Created by guillermoblascojimenez on 24/01/15.
 */
(function() {

    var service = function(word, callback) {

        $.ajax({
            url: "topicService.php",
            data: {
                q: word
            },
            success : function(data) {
                data = JSON.parse(data);
                if (data instanceof Array) {
                    callback(data);
                    return;
                }
                var d = [];
                for(var key in data) {
                    if (data.hasOwnProperty(key)) {
                        d.push(data[key]);
                    }
                }
                callback(d);
            }
        });


    };




    TOPIC_SERVICES.push(service);

})();