(function (Imcms) {
    Imcms.ContentManager = {
        init: function () {
            $("#openCloseFolders").click(Imcms.ContentManager.openCloseFolders);
            $("#closeFolders").click(Imcms.ContentManager.closeFolders);
        },
        openCloseFolders: function () {
            var $btn = $(this),
                folders = $(".imcms-content-manager__left-side"),
                contentSide = $(".imcms-content-manager__right-side"),
                footer = $(".imcms-content-manager__footer")
            ;

            if ($btn.attr("data-state") === "close") {
                folders.animate({"left": 0}, 600);
                contentSide.animate({"left": "400px"}, 600);
                footer.animate({"left": "400px"}, 600);
                $btn.attr("data-state", "open");
                $btn.text("hide folders");
            } else {
                folders.animate({"left": "-400px"}, 600);
                contentSide.animate({"left": 0}, 600);
                footer.animate({"left": 0}, 600);
                $btn.attr("data-state", "close");
                $btn.text("show folders");
            }

        },
        closeFolders: function () {
            var openCloseBtn = $("#openCloseFolders"),
                folders = $(".imcms-content-manager__left-side"),
                contentSide = $(".imcms-content-manager__right-side"),
                footer = $(".imcms-content-manager__footer")
            ;
            folders.animate({"left": "-100%"}, 600);
            contentSide.animate({"left": 0}, 600);
            footer.animate({"left": 0}, 600);
            openCloseBtn.attr("data-state", "close");
            openCloseBtn.text("show folders");

        }
    };

    return Imcms.ContentManager;
})(Imcms);