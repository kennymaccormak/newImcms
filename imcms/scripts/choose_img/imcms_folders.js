(function (Imcms) {
    var viewModel, folders = [];

    function getFoldersUrl() {
        return [
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/cars",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/cars/bmw",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2017/holiday",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/holiday",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/family",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/family/porno",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images",
            "/srv/www/tomcat/instance/182/virt/webapp/WEB-INF/images/images_2016/summer/img"
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
            foldersRelativeUrlsArray = [],
            parseFoldersUrl = []
        ;

        foldersRelativeUrlsArray = getRelativeFoldersUrl(foldersUrlArray, root);

        foldersRelativeUrlsArray.forEach(function (relUrl) {
            relUrl = relUrl.split("/");
            relUrl.splice(0, 1);
            parseFoldersUrl.push(relUrl);
        });

        return parseFoldersUrl;
    }

    function getFoldersObject() {
        var foldersUrl = parseFoldersUrl()
        ;

        foldersUrl.forEach(function (url) {
            folders.push({
                name: url[url.length - 1],
                parent: url[url.length - 2],
                level: url.length
            })

        });
    }

    function getFolders() {
        return getFoldersObject();
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