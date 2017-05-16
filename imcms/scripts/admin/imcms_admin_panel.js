(function (Imcms) {
    Imcms.AdminPanel = {
        init: function () {
            Imcms.AdminPanel.showPanel();
            $(document).click(Imcms.AdminPanel.hidePanel);
            $(".imcms-admin").find(".imcms-menu__item").click(Imcms.AdminPanel.menuEvent);
        },
        showPanel: function () {
            $(document).mousemove(function (event) {
                if (event.pageY >= 0 && event.pageY <= 15) {
                    $(".imcms-admin").css({"top": 0});
                }


            });

        },
        hidePanel: function (event) {
            if (
                !$(event.target).closest(".imcms-admin").length

            ) {
                $(".imcms-admin").css({"top": "-90px"});
                event.stopPropagation();
            }

        },
        menuEvent: function () {
            var $menuItem = $(this),
                popUpModal = $(".imcms-pop-up-modal"),
                currentPopUp
            ;

            if ($menuItem.hasClass("imcms-menu__item--page-info")) {
                popUpModal.each(function () {
                    if ($(this).attr("data-menu") === "pageInfo") {
                        $(this).css({"display": "block"});
                        currentPopUp = $(this)
                    }
                })
            }
            Imcms.PopUp.init(currentPopUp);
        }
    };

    return Imcms.AdminPanel
})(Imcms);