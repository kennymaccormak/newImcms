(function (Imcms) {
    Imcms.Button = {
        init: function () {
            $(".imcms-flags__flag").click(Imcms.Button.flagBtn);
        },
        flagBtn: function (event) {
            var $btn = $(this);

            if ($btn.hasClass("imcms-flag")) {
                if ($btn.hasClass("imcms-flag--active")) {
                    event.preventDefault();
                }
                else {
                    $btn.addClass("imcms-flag--active");
                    Imcms.Button.changeNeighborFlag($btn);
                }
            }
        },

        changeNeighborFlag: function ($btn) {
            var neighborFlag = ($btn.next().length !== 0) ? $btn.next() : $btn.prev();

            if (neighborFlag.hasClass("imcms-flag--en")) {
                neighborFlag.toggleClass("imcms-flag--active");
            }
            else if (neighborFlag.hasClass("imcms-flag--sw")) {
                neighborFlag.removeClass("imcms-flag--active");
            }
            else {
                neighborFlag.addClass("imcms-flag--active");
            }
        }
    };

    return Imcms.Button;
})(Imcms);

//todo: add logic for other buttons according to their specifics
