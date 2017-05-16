(function (Imcms) {
    Imcms.PopUp = {
        init: function (currentPopUp) {
            Imcms.PopUp.openPopUp(currentPopUp);
            currentPopUp.find(".imcms-button--negative").click( Imcms.PopUp.closePopUp)
        },
        openPopUp: function (currentPopUp) {
            var $popUp = currentPopUp,
                tab = $popUp.find(".imcms-tab")
            ;

            var modal = $("<div>", {
                "class": "modal"
            }).css({
                "position": "absolute",
                "top": 0,
                "left": 0,
                "z-index": 50,
                "display": "block",
                "width": "100vw",
                "height": "100vh",
                "background-color": "rgba(42, 42, 42, 0.8)"
            });
            modal.appendTo("body");

            $popUp.find(".imcms-form").each(function () {
                if ($(this).attr("data-window-id") === "1") {
                    $(this).css({"display": "block"});

                    $(this).parents(".imcms-pop-up-modal").find(".imcms-tab").each(function () {
                        if ($(this).attr("data-window-id") === "1") {
                            $(this).addClass("imcms-tab--active");
                        }
                        else{
                            $(this).removeClass("imcms-tab--active");
                        }
                    });
                }
                else{
                    $(this).css({"display": "none"});

                }
            });

            tab.each(function () {
                $(this).click(Imcms.PopUp.showHideContent);
            })

        },
        showHideContent: function () {
            var $tab = $(this),
                windowId = $tab.attr("data-window-id"),
                popUp = $tab.parents(".imcms-pop-up-modal")
            ;

            popUp.find(".imcms-form").each(function () {
                if ($(this).attr("data-window-id") === windowId) {
                    $(this).css({"display": "block"});
                    $(this).parents(".imcms-pop-up-modal").find(".imcms-tab").each(function () {
                        if ($(this).attr("data-window-id") === windowId) {
                            $(this).addClass("imcms-tab--active");
                        }
                        else{
                            $(this).removeClass("imcms-tab--active");
                        }
                    });
                }
                else{
                    $(this).css({"display": "none"});
                }
            });

        },
        closePopUp: function () {
            var $popUp = $(this).parents(".imcms-pop-up-modal");

            $popUp.css({"display": "none"});
            $(".modal").css({"display": "none"});
        }
    };

    return Imcms.PopUp;
})(Imcms);