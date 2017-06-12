(function (Imcms) {
    Imcms.Folders = {
        init: function () {
            $(".imcms-folder__name").click(Imcms.Folders.active);
            $(".imcms-folder__btn").click(Imcms.Folders.showHide);
            $(".imcms-content-manager .imcms-button--save").click(Imcms.Folders.saveAndCloseWindow);
            $(".imcms-content-manager .imcms-button--close").click(Imcms.Folders.closeWindow);
            $(".imcms-folder__controls .imcms-control--move").click(Imcms.Folders.moveFolder);
            $(".imcms-folder__controls .imcms-control--remove").click(Imcms.Folders.removeFolder);
            $(".imcms-folder__controls .imcms-control--rename").click(Imcms.Folders.renameFolder);
            $(".imcms-folder__controls .imcms-control--create").click(Imcms.Folders.createFolder);
            //$(".imcms-main-folders-controls .imcms-control--create").click(Imcms.Folders.createFolder);

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
                thisFolder.closest(".imcms-folders").removeClass("imcms-subfolders--close");
                subfolders.slideDown();
            }
            else {
                $btn.removeClass("imcms-folder-btn--open").addClass("imcms-folder-btn--close");
                thisFolder.closest(".imcms-folders").addClass("imcms-subfolders--close");
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
        moveFolder: function () {
        },
        removeFolder: function () {
            var $ctrl = $(this),
                currentFolder = $ctrl.closest(".imcms-folder"),
                subFolder = currentFolder.next()
            ;

            if (subFolder.length !== 0 && subFolder.hasClass("imcms-folders")) {
                subFolder.remove();
            }
            currentFolder.remove();
        },
        renameFolder: function () {
        },
        createFolder: function () {
            var $ctrl = $(this),
                currentFolder = $ctrl.closest(".imcms-folder"),
                subFolder = currentFolder.next()
            ;

            //create folder element
            var newFolder = $("<div>").addClass("imcms-folders__folder imcms-folder"),
                folderBtn = $("<div>")
                    .addClass("imcms-folder__btn imcms-folder-btn--open")
                    .click(Imcms.Folders.showHide),
                folderName = $("<div>")
                    .addClass("imcms-folder__name imcms-title")
                    .text("New Folder")
                    .click(Imcms.Folders.active),
                folderControls = $("<div>").addClass("imcms-folder__controls"),
                moveControl = $("<div>")
                    .addClass("imcms-controls__control imcms-control imcms-control--move")
                    .click(Imcms.Folders.moveFolder),
                removeControl = $("<div>")
                    .addClass("imcms-controls__control imcms-control imcms-control--remove")
                    .click(Imcms.Folders.removeFolder),
                renameControl = $("<div>")
                    .addClass("imcms-controls__control imcms-control imcms-control--rename")
                    .click(Imcms.Folders.renameFolder),
                createControl = $("<div>")
                    .addClass("imcms-controls__control imcms-control imcms-control--create")
                    .click(Imcms.Folders.createFolder)
            ;

            // compile folder
            createControl.prependTo(folderControls);
            renameControl.prependTo(folderControls);
            removeControl.prependTo(folderControls);
            moveControl.prependTo(folderControls);
            folderName.appendTo(newFolder);
            folderControls.appendTo(newFolder);

            //create subfolder
            var subFolderLvl = parseInt(currentFolder.closest(".imcms-folders").attr("data-folders-lvl")),
                newSubFolder = $("<div>").addClass("imcms-left-side__folders imcms-folders")
                    .attr("data-folders-lvl", subFolderLvl + 1)
            ;

            if (subFolder.length !== 0 && subFolder.hasClass("imcms-folders")) {
                newFolder.prependTo(subFolder);
            }
            else{
                currentFolder.after(newSubFolder);
                newFolder.prependTo(newSubFolder);
                folderBtn.prependTo(currentFolder);
            }
        }

    };

    return Imcms.Folders;
})(Imcms);