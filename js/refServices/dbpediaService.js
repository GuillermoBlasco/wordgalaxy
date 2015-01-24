
/**
 * Created by guillermoblascojimenez on 24/01/15.
 */
(function() {
    var service = function(word, panel) {

        $.ajax({
            url: "api/spotlight.php",
            data: {
                q: word
            },
            success : function(data) {
                console.log("RAW: " + data);
                data = JSON.parse(data);
                for (var i = 0; i < data.length; i++) {
                    panel.append("<a href=\"" + data[i].name + "\">" + data[i].name + "</a>");
                }
            }
        });


    };
    REF_SERVICES.push(service);
})();