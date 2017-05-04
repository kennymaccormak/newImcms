$(function () {

    function Select() {
        var $this = $(this),
            select = $this.closest(".imcms-select__drop-down-list"),
            dropDownItems = select.children(".imcms-drop-down-list__items"),
            dropDownItem = dropDownItems.find(".imcms-drop-down-list__item"),
            selectedItem = select.find(".imcms-drop-down-list__select-item__value")
        ;

        if (select.hasClass("imcms-select__drop-down-list--active")) {
            select.removeClass("imcms-select__drop-down-list--active")
        }
        else {
            select.addClass("imcms-select__drop-down-list--active")
        }

        dropDownItem.click(Select.prototype.selectItem);

    }

    Select.prototype = {
        selectItem: function () {
            var content = $(this).text();

            $(this).closest(".imcms-select__drop-down-list")
                .find(".imcms-drop-down-list__select-item__value")
                .html(content);
        }


    };


    $(".imcms-drop-down-list__button").click(Select);
});