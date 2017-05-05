(function (Imcms) {
    Imcms.Button = {
        init: function () {
            $(".imcms-button__flag").click(Imcms.Button.flagBtn);
        },
        flagBtn: function () {
            var $btn = $(this);

            if ($btn.hasClass("imcms-button__flag__en")) {
                if ($btn.hasClass("imcms-button__flag__en--active")) {
                    $btn.removeClass("imcms-button__flag__en--active");
                    Imcms.Button.changeNeighborFlag($btn);
                }
                else {
                    $btn.addClass("imcms-button__flag__en--active");
                    Imcms.Button.changeNeighborFlag($btn);
                }
            }
            else {
                if ($btn.hasClass("imcms-button__flag__sw--active")) {
                    $btn.removeClass("imcms-button__flag__sw--active");
                    Imcms.Button.changeNeighborFlag($btn);
                }
                else {
                    $btn.addClass("imcms-button__flag__sw--active");
                    Imcms.Button.changeNeighborFlag($btn);
                }
            }

        },

        changeNeighborFlag: function ($btn) {
            var neighborFlag = ($btn.next().length !== 0)? $btn.next(): $btn.prev();

            if (neighborFlag.hasClass("imcms-button__flag__en")) {
                if (neighborFlag.hasClass("imcms-button__flag__en--active")) {
                    neighborFlag.removeClass("imcms-button__flag__en--active");
                }
                else {
                    neighborFlag.addClass("imcms-button__flag__en--active");
                }
            }
            else {
                if (neighborFlag.hasClass("imcms-button__flag__sw--active")) {
                    neighborFlag.removeClass("imcms-button__flag__sw--active");
                }
                else {
                    neighborFlag.addClass("imcms-button__flag__sw--active");
                }
            }
        }
    };

    return Imcms.Button;
})(Imcms);

//todo: add logic for other buttons according to their specifics