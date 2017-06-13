(function (Imcms) {
    Imcms.Folders = {
        init: function () {
            $(".imcms-folder__name").click(Imcms.Folders.active);
            $(".imcms-folder__btn").click(Imcms.Folders.showHide);
            $(".imcms-content-manager .imcms-button--save").click(Imcms.Folders.saveAndCloseWindow);
            $(".imcms-content-manager .imcms-button--close").click(Imcms.Folders.closeWindow);
            $(".imcms-folder__controls .imcms-control--move").click(Imcms.Folders.moveFolder);
            $(".imcms-folder__controls .imcms-control--remove").click(Imcms.Folders.removeFolder);
            $(".imcms-folder__controls .imcms-control--rename").click(Imcms.Folders.showHideNamePanel);
            $(".imcms-folder__controls .imcms-control--create").click(Imcms.Folders.showHideNamePanel);
            $(".imcms-main-folders-controls .imcms-control--create").click(Imcms.Folders.createFirstLvlFolder);

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
                subFolder = currentFolder.next(),
                parentFolder = currentFolder.closest(".imcms-folders")
            ;

            if (subFolder.hasClass("imcms-folders")) {
                subFolder.remove();
            }
            currentFolder.remove();

            if (parentFolder.children().length === 0) {
                if (parentFolder.prev().hasClass("imcms-folder")) {
                    parentFolder.prev().find(".imcms-folder__btn").remove();
                }
                parentFolder.remove();
            }
        },
        createFolder: function ($btn, name) {
            var currentFolder = $btn.parent().prev(),
                subFolder = currentFolder.next(),
                newFolder = null,
                folderBtn = null, /*show/hide button*/
                newSubFolder = null
            ;
            /*
             check for subfolder; if "is" -> create new folder in subfolder
             if "no" -> create subfolder, create folder in this subfolder
             */
            if (subFolder.length !== 0 && subFolder.hasClass("imcms-folders")) {
                newFolder = Imcms.Folders.createVirtualFolder(name);
                newFolder.prependTo(subFolder);
            }
            else {
                newSubFolder = Imcms.Folders.createVirtualSubFolder(currentFolder); //new subfolder
                currentFolder.after(newSubFolder);
                newFolder = Imcms.Folders.createVirtualFolder(name);                    //new folder
                newFolder.prependTo(newSubFolder);
                folderBtn = Imcms.Folders.createFolderShowHideBtn();            //add show/hide button
                folderBtn.prependTo(currentFolder);
            }
        },
        createVirtualFolder: function (name) {
            /*create folder elements*/
            var newFolder = $("<div>").addClass("imcms-folders__folder imcms-folder"),
                folderName = $("<div>")
                    .addClass("imcms-folder__name imcms-title")
                    .text(name)
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
                    .click(Imcms.Folders.showHideNamePanel),
                createControl = $("<div>")
                    .addClass("imcms-controls__control imcms-control imcms-control--create")
                    .click(Imcms.Folders.showHideNamePanel)
            ;

            /*compile elements in folder*/
            createControl.prependTo(folderControls);
            renameControl.prependTo(folderControls);
            removeControl.prependTo(folderControls);
            moveControl.prependTo(folderControls);
            folderName.appendTo(newFolder);
            folderControls.appendTo(newFolder);

            return newFolder;
        },
        createVirtualSubFolder: function (currentFolder) {
            var subFolderLvl = (currentFolder === undefined)
                ? 0
                : parseInt(currentFolder.closest(".imcms-folders").attr("data-folders-lvl"));

            return $("<div>").addClass("imcms-left-side__folders imcms-folders")
                .attr("data-folders-lvl", subFolderLvl + 1);
        },
        createFolderShowHideBtn: function () {
            return $("<div>")
                .addClass("imcms-folder__btn imcms-folder-btn--open")
                .click(Imcms.Folders.showHide);
        },
        createFirstLvlFolder: function () {
            var $ctrl = $(this),
                newFolder = Imcms.Folders.createVirtualFolder("folder"),
                subFolder = Imcms.Folders.createVirtualSubFolder()
            ;
            $ctrl.parent().after(subFolder.append(newFolder));


        },
        showHideNamePanel: function () {
            var $ctrl = $(this),
                currentFolder = $ctrl.closest(".imcms-folder"),
                currentFolderName = currentFolder.find(".imcms-folder__name")
            ;

            $(".imcms-folder__controls .imcms-control--rename").unbind("click");
            $(".imcms-folder__controls .imcms-control--create").unbind("click");

            var folderNameInput = $("<input>", {
                "class": "imcms-panel-named__input imcms-text-box__input imcms-input",
                "value": currentFolderName.text()
            });

            var submitFolderNameBtn = $("<button>", {
                "class": "imcms-panel-named__button imcms-button--neutral imcms-button",
                text: "add+"
            });

            if ($ctrl.hasClass("imcms-control--rename")) {
                submitFolderNameBtn.addClass("imcms-button--rename")
            }
            else {
                submitFolderNameBtn.addClass("imcms-button--create")
            }

            submitFolderNameBtn.click(Imcms.Folders.submitFolderName);

            var panelNamed = $("<div>", {
                "class": "imcms-panel-named",
                html: folderNameInput
            }).append(submitFolderNameBtn);
            currentFolder.after(panelNamed);
        },
        submitFolderName: function () {
            var $btn = $(this),
                folderNameInput = $btn.prev(),
                setName = null,
                currentFolderName = $btn.parent().prev().find(".imcms-folder__name")
            ;

            if ($btn.hasClass("imcms-button--rename")) {
                setName = folderNameInput.val();
                if (setName === "") {
                    setName = currentFolderName.text()
                }
                currentFolderName.text(setName);
                $(".imcms-panel-named").remove();
            }
            else {
                setName = folderNameInput.val();
                if (setName === "") {
                    setName = currentFolderName.text("new folder")
                }
                Imcms.Folders.createFolder($btn, setName);
                $(".imcms-panel-named").remove();
            }

            $(".imcms-folder__controls .imcms-control--rename").bind("click", Imcms.Folders.showHideNamePanel);
            $(".imcms-folder__controls .imcms-control--create").bind("click", Imcms.Folders.showHideNamePanel);
        }


    };

    return Imcms.Folders;
})(Imcms);
