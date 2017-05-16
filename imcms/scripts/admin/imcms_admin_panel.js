(function (Imcms) {
    Imcms.AdminPanel = {
        init: function () {
            Imcms.AdminPanel.showPanel();
            $(document).click(Imcms.AdminPanel.hidePanel);
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

        }
    };

    return Imcms.AdminPanel
})(Imcms);