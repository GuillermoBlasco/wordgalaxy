/**
 * Created by guillermoblascojimenez on 23/01/15.
 */
(function() {

    TOPIC_SERVICES = [ ];

    REF_SERVICES = [ ];

    var wordInput = $("#wordInput");

    var getWord = function() {
        return wordInput.val();
    };
    var dispatchInput = function() {
        var word = getWord();
        var candidates = [];
        for (var i = 0; i < TOPIC_SERVICES.length; i++) {
           candidates = candidates.concat(TOPIC_SERVICES[i](word));
        }
        // here dispatch candidates
        for (var i = 0; i < candidates.length; i++) {
            var candidate = candidates[i];
            dispatchCandidate(candidate);
        }
    };
    var getRefs = function(word) {
        var refs = [];
        for (var i = 0; i < REF_SERVICES.length; i++) {
            refs = refs.concat(REF_SERVICES[i](word));
        }
        return refs;
    };
    var dispatchCandidate = function(candidate) {
        var refs = getRefs(candidate);
        // dispatch candidate refs
    };
    $("#searchButton").click(dispatchInput);
    wordInput.keyup(function(e){
        if(e.keyCode == 13) {
            dispatchInput();
        }
    });
})();