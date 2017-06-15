(function (Imcms) {
    var viewModel;

    function getFolders() {
        return [
            {
                id: "folder_1",
                name: "all image",
                level: 1,
                parentFolder: false,
                subfolder: "folder_2"
            },
            {
                id: "folder_2",
                name: "general",
                level: 2,
                parentFolder: "folder_1",
                subfolder: "folder_3"
            },
            {
                id: "folder_3",
                name: "lorem",
                level: 3,
                parentFolder: "folder_2",
                subfolder: false
            },
            {
                id: "folder_4",
                name: "Fucking image",
                level: 1,
                parentFolder: false,
                subfolder: false
            },
            {
                id: "folder_5",
                name: "Fucking fucking image",
                level: 1,
                parentFolder: false,
                subfolder: false
            }
        ]
            ;
    }

    function createSubFolder(level) {
        var subFolderClass;
        subFolderClass = (level === 1)
            ? "imcms-left-side__folders imcms-folders"
            : "imcms-folders imcms-subfolders--close";
        return $("<div>", {
            "class": subFolderClass,
            "data-folders-lvl": level
        })
    }

    function createFolderShowHideButton() {
        return $("<div>", {
            "class": "imcms-folder__btn",
            click: Imcms.Folders.showHideSubfolders
        })
    }

    function createFolderTitle(name) {
        return $("<div>", {
            "class": "imcms-folder__name imcms-title",
            text: name
        })
    }

    function createFolderControls() {
        var controls = $("<div>", {
            "class": "imcms-folder__controls"
        });

        viewModel.controls.forEach(function (control) {
            $("<div>", {
                "class": "imcms-controls__control imcms-control imcms-control--" + control.name,
                click: control.click
            }).prependTo(controls)
        });

        return controls;
    }

    function createFolder(folder) {
        var newFolder = $("<div>", {
            "class": "imcms-folders__folder imcms-folder"
        });
        if(folder.subfolder){
            createFolderShowHideButton().appendTo(newFolder);
        }
        createFolderTitle(folder.name).appendTo(newFolder);
        createFolderControls().appendTo(newFolder);

        return newFolder;
    }

    function folderBuilder(folders) {
        folders.forEach(function (folder) {
            if (folder.level === 1) {
                viewModel.foldersArea
                    .append(createSubFolder(folder.level))
                    .append(createFolder(folder));
            }
        })
    }

    Imcms.Folders = {
        init: function () {

            viewModel = {
                folders: getFolders(),
                foldersArea: $(document).find(".imcms-content-manager__left-side"),
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
        showHideSubfolders: function () {
            var $btn = $(this);
            $btn.parents(".imcms-folder").next().slideToggle();
            $btn.toggleClass("imcms-folder-btn--open");
        },
        createNewFolder: function () {

        },
        renameFolder: function () {

        },
        removeFolder: function () {

        },
        moveFolder: function () {

        }

    };

    return Imcms.Folders;
})(Imcms);