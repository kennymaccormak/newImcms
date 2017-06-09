(function (Imcms) {
    Imcms.Folders = {
        init: function () {
            $(".imcms-folder__name").click(Imcms.Folders.active);
            $(".imcms-folder__btn").click(Imcms.Folders.showHide);

            $(function () {
                var allFoldersSection = $(".imcms-content-manager__left-side"),
                    allSubfolders = allFoldersSection
                        .find(".imcms-folders")
                        .addClass("imcms-subfolders--close")
                ;

                allFoldersSection
                    .find(".imcms-folders")
                    .addClass("imcms-subfolders--close");

                allSubfolders.each(function () {
                    if($(this).attr("data-folders-lvl") !== "1"){
                        $(this).css({"display": "none"});
                    }
                    $(this).find(".imcms-folder__btn").eq(0)
                        .removeClass("imcms-folder-btn--open")
                        .addClass("imcms-folder-btn--close");
                });

            })
        },
        active: function () {
            var allFolders = $(this).parents(".imcms-content-manager__left-side").find(".imcms-folder");

            allFolders.each(function () {
                $(this).removeClass("imcms-folder--active");
            });

            $(this).parents(".imcms-folder").addClass("imcms-folder--active");
        },
        showHide: function () {
            var $btn = $(this),
                thisFolder = $btn.parent(),
                subfolders = thisFolder.next()
            ;

            if($btn.hasClass("imcms-folder-btn--close")){
                $btn.removeClass("imcms-folder-btn--close").addClass("imcms-folder-btn--open");
                subfolders.slideDown();
            }
            else{
                $btn.removeClass("imcms-folder-btn--open").addClass("imcms-folder-btn--close");
                subfolders.slideUp();
            }


        }
    };

    return Imcms.Folders;
})(Imcms);