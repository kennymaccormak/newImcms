(function (Imcms) {
    var viewModel;

    function getFoldersUrl() {
        return [
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2031",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/cars",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/cars/bmw",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/holiday",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/holiday",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/family",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/family/porno",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/img",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2015",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2015/bad-foto"
        ];
    }

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
            return  b.level - a.level;
        });
    }

    function getFolders() {
        var foldersArray = getFoldersObject(),
            pathToFolder = {}
        ;

        foldersArray.forEach(function (folderFromArray) {
            if (!pathToFolder[folderFromArray.parent]) {
                pathToFolder[folderFromArray.parent] = [folderFromArray];
            }

            Object.keys(pathToFolder).forEach(function (path) {
                var shouldBeAdded = pathToFolder[path].some(function (elem) {
                    return (elem.parent === folderFromArray.parent && elem.path !== folderFromArray.path);
                });

                if (shouldBeAdded) {
                    pathToFolder[path].push(folderFromArray);
                }
            });
        });


/*
        for (var keyPath in pathToFolder) {

        }*/

        console.log(pathToFolder);
        console.log(foldersArray);

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
        },
        /*showHideSubfolders: function () {
         var $btn = $(this);

         $btn.parents(".imcms-folder").next().slideToggle();
         $btn.toggleClass("imcms-folder-btn--open");
         },*/
        createNewFolder: function () {

        },
        renameFolder: function () {

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
        moveFolder: function () {

        }

    };

    return Imcms.Folders;
})(Imcms);