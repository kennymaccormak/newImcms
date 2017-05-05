(function (Imcms) {
    Imcms.NumberBox = {
        init: function () {
            $(".imcms-number-box__input").click(Imcms.NumberBox.activateNumberBox)
                .on('change keyup input click', Imcms.NumberBox.validation);
            $(".imcms-number__button").click(Imcms.NumberBox.changeValue);
            $(document).click(Imcms.NumberBox.deactivateNumberBox);
        },
        activateNumberBox: function () {
            var $this = $(this),
                numberBox = $this.closest(".imcms-number-box"),
                numberBoxInput = numberBox.find(".imcms-number-box__input")
            ;
            numberBox.addClass("imcms-number-box--active");

            if(numberBoxInput.val() === ""){
                numberBoxInput.val(0)
            }

        },
        deactivateNumberBox: function (e) {
            if (!$(e.target).closest(".imcms-number-box__input").length && e.target.classList[1] !== "imcms-number__button"){
                $(".imcms-number-box__input").closest(".imcms-number-box")
                    .removeClass("imcms-number-box--active");
                e.stopPropagation();
            }
        },
        validation: function () {
            var $this = $(this),
                value = $this.val(),
                len = value.length
            ;

            if (value.match(/[^0-9,-]/g)) {
                $this.val(value.replace(/[^0-9,-]/g, ''));
            }
            if (len > 10)
                $this.val(value.substring(0, 10))
        },
        changeValue: function () {
            var $this = $(this),
                numberBox = $this.closest(".imcms-number-box"),
                numberBoxInput = numberBox.find(".imcms-number-box__input"),
                value = parseInt(numberBoxInput.val())
            ;


            if ($this.hasClass("imcms-button--increment")) {
                value += 1;
            }
            else if ($this.hasClass("imcms-button--decrement")) {
                value -= 1;
            }

            return numberBoxInput.val(value);
        }

    };


    return Imcms.Number;
})(Imcms);