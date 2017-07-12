(function (Imcms) {
    Imcms.ModalWindow = {
        init: function (question, callback) {
            Imcms.ModalWindow.showModalWindow(question, callback);
        },
        createModalWindow: function (question, callback) {
            var modal, head, body,
                footer, btnYes, btnNo,
                layout = $("<div>", {
                    "class": "imcms-modal-layout"
                })
            ;

            modal = $("<div>", {
                "id": "imcmsModalWindow",
                "class": "imcms-modal-window"
            });

            head = $("<div>", {
                "class": "imcms-modal-window__modal-head imcms-head",
                html: $("<div>", {
                    "class": "imcms-modal-head__title imcms-title",
                    text: "Modal Window"
                })
            }).appendTo(modal);

            body = $("<div>", {
                "class": "imcms-modal-window__modal-body",
                html: $("<div>", {
                    "class": "imcms-modal-body__text imcms-info-msg",
                    text: question
                })
            }).appendTo(modal);

            footer = $("<div>", {
                "class": "imcms-modal-window__modal-footer"
            }).appendTo(modal);

            btnYes = $("<button>", {
                "type": "button",
                "id": "imcmsButtonTrue",
                "class": "imcms-modal-footer__button imcms-button imcms-button--positive",
                text: "Yes"
            }).appendTo(footer);

            btnNo = $("<button>", {
                "type": "button",
                "id": "imcmsButtonFalse",
                "class": "imcms-modal-footer__button imcms-button imcms-button--negative",
                text: "No"
            }).appendTo(footer);

            return [modal, layout];
        },
        showModalWindow: function (question, callback) {
            var modalWindow = Imcms.ModalWindow.createModalWindow(question, callback)[0];
            var modalLayout = Imcms.ModalWindow.createModalWindow(question, callback)[1];
            var body = $("body");

            body.append(modalLayout);
            body.append(modalWindow);

            modalWindow.find("#imcmsButtonTrue").click(function () {
                callback(true);
                modalWindow.remove();
                modalLayout.remove();
            });

            modalWindow.find("#imcmsButtonFalse").click(function () {
                callback(false);
                modalWindow.remove();
                modalLayout.remove();
            });

        }
    };

    return Imcms.ModalWindow;
})(Imcms);