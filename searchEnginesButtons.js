/**
 * Created by guillermoblascojimenez on 24/01/15.
 */
(function() {
    var template =
        "<div> \
            <a class=\"btn btn-default\" href=\"{{googleUrl}}\" role=\"button\" target=\"_blank\">Google</a>\
            <a class=\"btn btn-default\" href=\"{{bingUrl}}\" role=\"button\" target=\"_blank\">Bing</a>\
            <a class=\"btn btn-default\" href=\"{{askUrl}}\" role=\"button\" target=\"_blank\">Ask</a>\
            <a class=\"btn btn-default\" href=\"{{duckduckGo}}\" role=\"button\" target=\"_blank\">DuckDuckGo</a>\
        </div>\
        ";
    var service = function(topic, panel) {

        var data = {
            google : encodeURIComponent(topic),
            bing : encodeURIComponent(topic.replace(" ", "+")),
            ask : encodeURIComponent(topic.replace(" ", "+")),
            duckduckgo : encodeURIComponent(topic.replace(" ", "+"))
        };
        var urlData = {
            googleUrl : Mustache.render("https://www.google.es/webhp#q={{google}}", data),
            bingUrl : Mustache.render("http://www.bing.com/search?q={{bing}}", data),
            askUrl : Mustache.render("http://www.ask.com/web?q={{ask}}", data),
            duckduckGo : Mustache.render("https://duckduckgo.com/?q={{duckduckgo}}", data)
        };

        panel.prepend(Mustache.render(template, urlData));
    };
    REF_SERVICES.push(service);
})();