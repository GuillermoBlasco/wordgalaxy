/**
 * Created by guillermoblascojimenez on 24/01/15.
 */
(function() {
    var template =
        "<div> \
            <a class=\"btn btn-default\" href=\"{{googleUrl}}\" role=\"button\" target=\"_blank\">Google</a>\
            <a class=\"btn btn-default\" href=\"{{bingUrl}}\" role=\"button\" target=\"_blank\">Bing</a>\
            <a class=\"btn btn-default\" href=\"{{askUrl}}\" role=\"button\" target=\"_blank\">Ask</a>\
            <a class=\"btn btn-default\" href=\"{{duckUrl}}\" role=\"button\" target=\"_blank\">DuckDuckGo</a>\
            <a class=\"btn btn-default\" href=\"{{twitterUrl}}\" role=\"button\" target=\"_blank\">Twitter</a>\
            <a class=\"btn btn-default\" href=\"{{scholarUrl}}\" role=\"button\" target=\"_blank\">Scholar</a>\
        </div>\
        ";
    var service = function(topic, panel) {

        var data = {
            google : encodeURIComponent(topic),
            bing : encodeURIComponent(topic),
            ask : encodeURIComponent(topic),
            duckduckgo : encodeURIComponent(topic),
            twitter : encodeURIComponent(topic),
            scholar : encodeURIComponent(topic.replace(" ", "+"))
        };
        var urlData = {
            googleUrl : Mustache.render("https://www.google.es/webhp#q={{google}}&lr=lang_ca", data),
            bingUrl : Mustache.render("http://www.bing.com/search?q={{bing}}&lf=1", data),
            askUrl : Mustache.render("http://www.ask.com/web?q={{ask}}", data),
            duckUrl : Mustache.render("https://duckduckgo.com/?q={{duckduckgo}}&lr=lang_ca", data),
            twitterUrl : Mustache.render("https://twitter.com/search?q={{twitter}}%20filter%3Alinks%20lang%3Aca", data),
            scholarUrl : Mustache.render("https://scholar.google.es/scholar?q={{scholar}}&lr=lang_ca", data)
            
        };

        panel.prepend(Mustache.render(template, urlData));
    };
    REF_SERVICES.push(service);
})();