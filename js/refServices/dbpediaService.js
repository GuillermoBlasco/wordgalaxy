
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
                panel=$("body > div.container-fluid.tb-wrapper > div.preview > div:nth-child(3) > ul:nth-child(4)");
                for (var i = 0; i < data.length; i++) {
                    panel.append("<li><a href=\"" + data[i].name + "\">" + data[i].name + "</a></li>");
                }
                $("body > div.container-fluid.tb-wrapper > div.preview > div:nth-child(3) > h5:nth-child(3) > span").text("(" + data.length + ")");
            }
        });


    };
    REF_SERVICES.push(service);
})();