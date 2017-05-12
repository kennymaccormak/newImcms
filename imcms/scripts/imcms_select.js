(function (Imcms) {
    Imcms.Select = {
        init: function () {
            $(".imcms-drop-down-list__button").click(Imcms.Select.toggleSelect);
            $(".imcms-drop-down-list__select-item__value").click(Imcms.Select.toggleSelect);
        },
        toggleSelect: function () {
            var $this = $(this),
                select = $this.closest(".imcms-select__drop-down-list"),
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
                itemValue = select.find(".imcms-drop-down-list__select-item__value").html(content)
            ;

            select.removeClass("imcms-select__drop-down-list--active");

            return itemValue;
        }
    };




    return Imcms.Select;
})(Imcms);


//todo: add logic for select according to their specifics