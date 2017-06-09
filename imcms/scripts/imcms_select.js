(function (Imcms) {
    Imcms.Select = {
        init: function () {
            $(".imcms-drop-down-list__select-item").click(Imcms.Select.toggleSelect);
            $(".imcms-select__label").click(Imcms.Select.toggleSelect);
            $(document).click(Imcms.Select.closeSelect);
        },
        toggleSelect: function () {
            var $this = $(this),
                select = $this.closest(".imcms-select").find(".imcms-drop-down-list"),
                dropDownItem = select.children(".imcms-drop-down-list__items")
                    .find(".imcms-drop-down-list__item")
            ;

            if (select.hasClass("imcms-select__drop-down-list--active")) {
                select.removeClass("imcms-select__drop-down-list--active")
            }
            else {
                select.addClass("imcms-select__drop-down-list--active")
            }

            dropDownItem.click(Imcms.Select.selectItem);
        },
        selectItem: function () {
            var $this = $(this),
                content = $this.text(),
                select = $this.closest(".imcms-select__drop-down-list"),
                itemValue = select.find(".imcms-drop-down-list__select-item-value").html(content),
                selectInput = select.find("input")
            ;

            select.removeClass("imcms-select__drop-down-list--active");
            selectInput.val(content);

            return itemValue;
        },
        closeSelect: function (e) {
            if (!$(e.target).parents(".imcms-select").length) {
                $(".imcms-select__drop-down-list").removeClass("imcms-select__drop-down-list--active");
                e.stopPropagation();
            }
        }
    };


    return Imcms.Select;
})(Imcms);


//todo: add logic for select according to their specifics