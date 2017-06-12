(function (Imcms) {
    Imcms.Folders = {
        init: function () {
            $(".imcms-folder__name").click(Imcms.Folders.active);
            $(".imcms-folder__btn").click(Imcms.Folders.showHide);
            $(".imcms-content-manager .imcms-button--save").click(Imcms.Folders.saveAndCloseWindow);
            $(".imcms-content-manager .imcms-button--close").click(Imcms.Folders.closeWindow);
            $(".imcms-folder__controls .imcms-control").click(Imcms.Folders.folderControls);

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
                    if ($(this).attr("data-folders-lvl") !== "1") {
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

            if ($btn.hasClass("imcms-folder-btn--close")) {
                $btn.removeClass("imcms-folder-btn--close").addClass("imcms-folder-btn--open");
                subfolders.slideDown();
            }
            else {
                $btn.removeClass("imcms-folder-btn--open").addClass("imcms-folder-btn--close");
                subfolders.slideUp();
            }
        },
        saveAndCloseWindow: function () {
            $(this).parents(".imcms-content-manager").hide();
            //todo: save logic
        },
        closeWindow: function () {
            $(this).parents(".imcms-content-manager").hide();
        },
        folderControls: function () {
            var $ctrl = $(this);
            if ($ctrl.hasClass("imcms-control--move")){
                Imcms.Folders.moveFolder($ctrl);
            }
            else if($ctrl.hasClass("imcms-control--remove")){
                Imcms.Folders.removeFolder($ctrl);
            }
            else if($ctrl.hasClass("imcms-control--rename")){
                Imcms.Folders.renameFolder($ctrl);
            }
            else if($ctrl.hasClass("imcms-control--create")){
                Imcms.Folders.createFolder($ctrl);
            }
        },
        moveFolder: function () {
            console.log("moveFolder")
        },
        removeFolder: function ($ctrl) {
            var $removeCtrl = $ctrl,
                currentFolder = $removeCtrl.closest(".imcms-folder"),
                subFolder = currentFolder.next()
            ;

            if(subFolder.length !== 0){
                subFolder.remove();
            }
            currentFolder.remove();
        },
        renameFolder: function () {
            console.log("renameFolder")
        },
        createFolder: function () {
            console.log("createFolder")
        }

    };

    return Imcms.Folders;
})(Imcms);