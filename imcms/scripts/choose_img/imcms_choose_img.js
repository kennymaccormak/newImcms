(function (Imcms) {
    Imcms.ChooseImg = {
        init: function () {
            $(".imcms-choose-img-wrap").click(Imcms.ChooseImg.active);
            $(".imcms-choose-img-description__button").click(Imcms.ChooseImg.removeImg);
        },
        active: function () {
            var $img = $(this);

            $img.toggleClass("imcms-choose-img-wrap--active");
        },
        removeImg: function () {
            var $btn = $(this);
            $btn.parents(".imcms-choose-img-wrap").remove();
        }
    };

    return Imcms.ChooseImg;
})(Imcms);