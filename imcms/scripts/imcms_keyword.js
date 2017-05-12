(function (Imcms) {
    Imcms.Keyword = {
        init: function () {
            $(".imcms-keyword .imcms-keyword__button").click(Imcms.Keyword.addKeyword);
        },
        addKeyword: function (event) {
            var $btn = $(this),
                keywordInput = $btn.parent().find(".imcms-text-box__input"),
                keywordInputVal = keywordInput.val(),
                keywords = $btn.parent().find(".imcms-keyword__filters")
            ;
            if (keywordInputVal === ""){
                event.preventDefault();
            }
            else{
                console.log(keywordInputVal);
                $("<div>", {
                    "class": "imcms-keyword__filter",
                    html: $("<button>", {
                        type: "button",
                        "class": "imcms-button imcms-button--close"
                    }).click(Imcms.Keyword.removeKeyword)
                }).prepend(keywordInputVal).appendTo(keywords);
            }
            keywordInput.val("");
        },
        removeKeyword: function () {
            var $btn = $(this),
                keyword = $btn.parents(".imcms-keyword__filter")
            ;

            keyword.remove();

        }
    };

    return Imcms.Keyword;
})(Imcms);