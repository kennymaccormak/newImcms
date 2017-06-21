(function (Imcms) {
    var viewModel;

    /*response from server*/
    function getFoldersUrl() {
        return Imcms.REST.read();
    }

    /*create foldersObject function*/
    function findFoldersRootUrl(urlsArray) {
        var length = urlsArray[0].length, index = 0;
        urlsArray.forEach(function (url) {
            if (url.length < length) {
                length = url.length;
                index = urlsArray.indexOf(url)
            }
        });

        return urlsArray[index];
    }

    function getRelativeFoldersUrl(foldersUrlArray, root) {
        var relativeFoldersUrlArray = [];

        foldersUrlArray.forEach(function (url) {
            relativeFoldersUrlArray.push(url.substring(root.length));
        });

        relativeFoldersUrlArray.forEach(function (relativeUrl) {
            if (relativeUrl.length === 0) {
                relativeFoldersUrlArray.splice(relativeFoldersUrlArray.indexOf(relativeUrl), 1);
            }
        });

        return relativeFoldersUrlArray;
    }

    function parseFoldersUrl() {
        var foldersUrlArray = getFoldersUrl(),
            root = findFoldersRootUrl(foldersUrlArray),
            foldersRelativeUrlsArray = []
        ;

        foldersRelativeUrlsArray = getRelativeFoldersUrl(foldersUrlArray, root);

        return foldersRelativeUrlsArray.map(function (relUrl) {
            relUrl = relUrl.split("/");
            relUrl.splice(0, 1);
            return relUrl;
        });

    }

    function getFoldersObject() {
        return parseFoldersUrl().map(function (url) {
            return {
                name: url[url.length - 1],
                parent: url.slice(0, url.length - 1).join("/"),
                path: url.join("/"),
                level: url.length,
                subfolder: []
            }
        }).sort(function (a, b) {
            return b.level - a.level;
        });
    }

    function getFolders() {
        var foldersArray = getFoldersObject(),
            pathToFolder = {}
        ;

        foldersArray.forEach(function (folder) {
            /*if (!folder.parent) {
             return;
             }*/

            if (pathToFolder[folder.parent]) {
                pathToFolder[folder.parent].push(folder);
            } else {
                pathToFolder[folder.parent] = [folder];
            }

            if (pathToFolder[folder.path]) {
                folder.subfolder = pathToFolder[folder.path];
                delete pathToFolder[folder.path];
            }
        });

        // var recurs = function () {
        //     foldersArray.forEach(function (folder) {
        //         foldersArray.forEach(function (parent) {
        //             if (folder.parent === parent.path) {
        //                 parent.subfolder.push(folder);
        //                 foldersArray.splice(foldersArray.indexOf(folder), 1);
        //                 recurs();
        //             }
        //         });
        //     });
        //
        // };
        //
        // recurs();

        pathToFolder = pathToFolder[""];

        return pathToFolder;
    }

    /*builderFolder functions*/
    function createFolderWrap(level) {
        return $("<div>", {
            "class": (level === 1) ? "imcms-left-side__folders imcms-folders" : "imcms-folders imcms-subfolders--close",
            "data-folders-lvl": level
        })
    }

    function createControl(controls) {
        viewModel.controls.forEach(function (control) {
            $("<div>", {
                "class": "imcms-controls__control imcms-control imcms-control--" + control.name,
                click: control.click
            }).prependTo(controls);
        });

        return controls;
    }

    function createControls() {
        var controls = $("<div>", {
            "class": "imcms-folder__controls"
        });

        return createControl(controls);
    }

    function createFolderName(name) {
        return $("<div>", {
            "class": "imcms-folder__name imcms-title",
            text: name,
            click: Imcms.Folders.active
        })
    }

    function createShowHideBtn(isSubfolder) {
        if (isSubfolder.length !== 0) {
            return $("<div>", {
                "class": "imcms-folder__btn",
                click: Imcms.Folders.showHideSubfolders
            })
        }
    }

    function createFolder(folder) {
        var newFolder = null;

        newFolder = $("<div>", {
            "class": "imcms-folders__folder imcms-folder",
            "data-folder-path": folder.path
        }).prepend(createControls());
        newFolder.prepend(createFolderName(folder.name));
        if (folder.subfolder.length !== 0) {
            newFolder.prepend(createShowHideBtn(folder.subfolder));
        }

        return newFolder;
    }

    function buildSubfolder(subfolders, wrap) {
        subfolders.forEach(function (subfolder) {
            wrap.prepend(buildFolderWrap(subfolder));
        })
    }

    function buildFolder(folder, wrap) {
        if (folder.subfolder.length !== 0) {
            return createFolder(folder).prepend(buildSubfolder(folder.subfolder, wrap))
        } else {
            return createFolder(folder);
        }
    }

    function buildFolderWrap(folder) {
        var wrap = createFolderWrap(folder.level);
        return wrap.prepend(buildFolder(folder, wrap));
    }

    function folderBuilder(folders) {
        folders.forEach(function (folder) {
            $(document).find(".imcms-content-manager__left-side").append(buildFolderWrap(folder));
        })
    }

    /*find and delete element in viewModel.folders array */
    function findAndDeleteFolderInArray(elementPath, arrayOfFolders) {

        arrayOfFolders.forEach(function (folder) {
            if (folder.path === elementPath) {
                arrayOfFolders.splice(arrayOfFolders.indexOf(folder), 1);
            }
            if (folder.subfolder.length !== 0) {
                findAndDeleteFolderInArray(elementPath, folder.subfolder);
            }
        });
    }

    /*action function (remove, rename, move, create)*/
    function removeFolderFromServer(folderId) {
        var urlsArray = getFoldersUrl(),
            folderFullPath = findFoldersRootUrl(urlsArray) + "/" + folderId
        ;

        findAndDeleteFolderInArray(folderId, viewModel.folders);
        Imcms.REST.remove(folderFullPath);
    }

    function renameFolderOnServer(folder) {
        var folderPathArray = folder.attr("data-folder-path").split("/"),
            newFolderRelativePath = "",
            urlsArray = getFoldersUrl(),
            folderFullPath = findFoldersRootUrl(urlsArray)
        ;

        folderPathArray[folderPathArray.length - 1] = folder.find(".imcms-folder__name").text();
        newFolderRelativePath = folderPathArray.join("/");
        folderFullPath = folderFullPath + "/" + newFolderRelativePath;
        folder.attr("data-folder-path", newFolderRelativePath);

        Imcms.REST.update(folderFullPath);
    }

    function createFolderOnServer(folder) {
        var urlsArray = getFoldersUrl(),
            folderFullPath = findFoldersRootUrl(urlsArray) + "/" + folder.path
        ;

        Imcms.REST.create(folderFullPath);
    }


    Imcms.Folders = {
        init: function () {

            viewModel = {
                foldersArea: $(document).find(".imcms-content-manager__left-side"),
                folders: getFolders(),
                controls: [
                    {
                        name: "create",
                        click: Imcms.Folders.createNewFolder
                    },
                    {
                        name: "rename",
                        click: Imcms.Folders.renameFolder
                    },
                    {
                        name: "remove",
                        click: Imcms.Folders.removeFolder
                    },
                    {
                        name: "move",
                        click: Imcms.Folders.moveFolder
                    }
                ]
            };

            folderBuilder(viewModel.folders);
        },
        active: function () {
            var allFolders = $(this).parents(".imcms-content-manager__left-side").find(".imcms-folder");

            allFolders.each(function () {
                $(this).removeClass("imcms-folder--active");
            });

            $(this).parents(".imcms-folder").addClass("imcms-folder--active");
        },
        showHideSubfolders: function () {
            var $btn = $(this),
                level = $btn.parents(".imcms-folders").attr("data-folders-lvl")
            ;

            level = parseInt(level) + 1;
            $btn.parents(".imcms-folders").find(".imcms-folders[data-folders-lvl=" + level + "]").each(function () {
                $(this).slideToggle()
            });
            $btn.toggleClass("imcms-folder-btn--open");
        },
        createNameInputPanel: function (folder) {
            var panel, nameInput, submitBtn, currentFolderName;

            currentFolderName = folder.find(".imcms-folder__name");

            panel = $("<div>", {"class": "imcms-panel-named"});
            nameInput = $("<input>", {
                "class": "imcms-panel-named__input imcms-text-box__input imcms-input",
                "value": currentFolderName.text()
            });
            submitBtn = $("<button>", {
                "class": "imcms-panel-named__button imcms-button--neutral imcms-button",
                text: "add+"
            });
            panel.append(nameInput);
            panel.append(submitBtn);

            return panel;

        },
        submitRename: function () {
            var $btn = $(this),
                panel = $btn.closest(".imcms-panel-named"),
                currentFolder = panel.prev(),
                currentFolderName = currentFolder.find(".imcms-folder__name");

            currentFolderName.text(panel.find("input").val());
            panel.remove();

            $(".imcms-folder__controls .imcms-control--rename").click(Imcms.Folders.renameFolder);
            $(".imcms-folder__controls .imcms-control--create").click(Imcms.Folders.createNewFolder);
            renameFolderOnServer(currentFolder);
        },
        submitCreate: function () {
            var $btn = $(this),
                panel = $btn.closest(".imcms-panel-named"),
                currentFolder = panel.prev(),
                newFolder = {
                    level: parseInt(currentFolder.parent().attr("data-folders-lvl")) + 1,
                    name: panel.find("input").val(),
                    parent: currentFolder.attr("data-folder-path"),
                    path: currentFolder.attr("data-folder-path") + "/" + panel.find("input").val(),
                    subfolder: []
                }
            ;

            if(currentFolder.find(".imcms-folder__btn").length === 0){
                currentFolder.prepend($("<div>", {
                    "class": "imcms-folder__btn",
                    click: Imcms.Folders.showHideSubfolders
                }));
            }


            currentFolder.after(createFolderWrap(newFolder.level).append(createFolder(newFolder)));

            panel.remove();

            $(".imcms-folder__controls .imcms-control--rename").click(Imcms.Folders.renameFolder);
            $(".imcms-folder__controls .imcms-control--create").click(Imcms.Folders.createNewFolder);
            createFolderOnServer(newFolder);

        },
        renameFolder: function () {
            var $ctrl = $(this),
                currentFolder = $ctrl.closest(".imcms-folder"),
                panel = Imcms.Folders.createNameInputPanel(currentFolder)
            ;

            panel.css({
                "padding-left": 0,
                "padding-top": 0,
                "position": "absolute",
                "top": "16px",
                "left": "70px",
                "width": "80%"
            });

            panel.find("button").click(Imcms.Folders.submitRename);

            currentFolder.after(panel);

            $(".imcms-folder__controls .imcms-control--rename").unbind("click");
            $(".imcms-folder__controls .imcms-control--create").unbind("click");

        },
        removeFolder: function () {
            var $ctrl = $(this),
                currentFolder = $ctrl.closest(".imcms-folder"),
                subFolders = currentFolder.parent().find(".imcms-folders"),
                parentFolder = currentFolder.closest(".imcms-folders"),
                currentFolderWrap = parentFolder.parent(),
                currentFolderId = currentFolder.attr("data-folder-path")
            ;

            subFolders.remove();
            currentFolder.remove();
            parentFolder.remove();

            if (currentFolderWrap.children().length === 1) {
                currentFolderWrap.find(".imcms-folder__btn").remove();
            }

            removeFolderFromServer(currentFolderId);
        },
        moveFolder: function () {

        },
        createNewFolder: function () {
            var $ctrl = $(this),
                currentFolder = $ctrl.closest(".imcms-folder"),
                panel = Imcms.Folders.createNameInputPanel(currentFolder)
            ;

            panel.find("button").click(Imcms.Folders.submitCreate);

            currentFolder.after(panel);

            $(".imcms-folder__controls .imcms-control--rename").unbind("click");
            $(".imcms-folder__controls .imcms-control--create").unbind("click");
        }

    };

    return Imcms.Folders;
})(Imcms);