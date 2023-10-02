function notes1() {
    alert("- RTF supported: You may copy and paste from Word Document or Text Edit and most formatting like bolding, font size, and lists will be copied over.\n- Shortcut keys: You may use shortcut keys for bold or italicized.");
}


window.formatters = [
    (text) => {
        // console.log("1");
        return text.replace(/\s/g, ''); // space, tab, newline
    },
    (text) => {
        // console.log("2");
        return text; // removing comments
    }
]

function confirmEraseText() {
    if (confirm('Start all over retyping?')) {
        $('#new .contents').val('');
        $('.highlight').removeClass('highlight');
        $("#new .contents").trigger("keyup"); // Call the delegator for evalDifference to clear accuracy text 
    }
}


function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
} // placeCaretAtEnd


function animateExploreCurriculum() {
    $("#explore-curriculum .card-header")
        .animate({ "color": "red" }, 1000)
        .delay(500)
        .animate({ "color": "black" }, 2000)
}

/**
 * Detect presetted topic search in URL
 */
$(() => {
    var params = new URLSearchParams(window.location.search);
    var qtopic = params.get("topic");

    if (qtopic) {
        var checkIframeLoading = setInterval(() => {
            var $curriculumExplorer = $("#explore-curriculum iframe").contents();
            var doesTreeExist = () => $curriculumExplorer.find(".accordion").length > 0;

            if (doesTreeExist) {
                clearInterval(checkIframeLoading);
                setTimeout(() => {
                    $topicField = $curriculumExplorer.find("#searcher-2"),
                        $topicBtn = $curriculumExplorer.find("#searcher-2-btn");;
                    $topicField.val(qtopic);
                    $topicBtn.click();
                }, 1200); // Just because part of a tree exist, doesn't mean the whole tree exists right away
            }
        }, 100);
    }
});
// End: Detect hash then searh

// Autoresize notes textarea
document.querySelector("#summary-inner")?.addEventListener("input", (event) => {
    autoExpand(event.target);
});

window.autoExpandNow = () => {
    if(document.querySelector("#summary-inner")?.length)
        autoExpand(document.querySelector("#summary-inner"));
}
autoExpandNow();
// End: Autoresize notes textarea


$(()=>{
    // UX: Can collapse summary reading to more easily reach the topics navigator
    document.querySelector("#summary-collapser")?.addEventListener("click", (event) => {
        if(event.target.className.includes("stated")) {
            event.target.classList.remove("stated");
            document.querySelector("#side-a .deemp-fieldset").classList.add("d-none");
        } else {
            event.target.classList.add("stated");
            document.querySelector("#side-a .deemp-fieldset").classList.remove("d-none");
        }
    
    });



    // UX: Copy summary to practice area
    document.querySelector("#gamify-now")?.addEventListener("click", (event) => {
        debugger;
        $('#retype-container, #rearrange-container').removeClass('hide'); 
        copyOver(); 
        document.querySelector('#retype-container').scrollIntoView()
    });

}); // On index.html ready

// Secondary: Can send topic to friends
function runtimeOnMessageReadyExplorer() {
    if (window.location.hash.length) {
        var explorer = document.querySelector("iframe").contentWindow.document
        explorer.querySelector("#searcher-2").value = decodeURIComponent(window.location.hash.length?window.location.hash.substr(1):"")
        explorer.querySelector("#searcher-2-btn").click()
    }
} // runtimeOnMessageReadyExplorer