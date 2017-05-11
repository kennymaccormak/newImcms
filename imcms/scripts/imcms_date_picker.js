(function (Imcms) {
    Imcms.DatePicker = {
        init: function () {
            Imcms.DatePicker.currentDate();
            $(".imcms-data-picker .imcms-data-picker__current-data")
                .click(Imcms.DatePicker.openCalendar);
            $(".imcms-data-picker .imcms-current-data__input").blur(Imcms.DatePicker.currentDateValidation);
            $(document).click(Imcms.DatePicker.closeCalendar);
        },
        openCalendar: function () {
            var curdate = $(this),
                datePicker = curdate.parents(".imcms-data-picker"),
                calendar = datePicker.find(".imcms-calendar")
            ;

            // if (!datePicker.hasClass("imcms-data-picker--active")) {
            //     datePicker.addClass("imcms-data-picker--active");
            // }
            Imcms.Calendar.init(datePicker);

            datePicker.find(".imcms-data-picker__error")
                .css({"display": "none"});
            datePicker.css({"border-color": "#d3d8de"});
        },
        closeCalendar: function (e) {
            if (
                !$(e.target).closest(".imcms-current-data__input").length
                &&
                (e.target.classList[1] !== "imcms-current-data__input"
                ||
                e.target.classList[1] !== ".imcms-data-picker__current-data")
                &&
                !$(e.target).parents(".imcms-calendar").length
            ) {

                $(".imcms-data-picker").removeClass("imcms-data-picker--active");
                e.stopPropagation();
            }

        },
        currentDate: function () {
            var d = new Date(),
                year = d.getFullYear(),
                month = d.getMonth() + 1,
                date = d.getDate(),
                datePicker = $(".imcms-data-picker"),
                currentDate = datePicker.find(".imcms-current-data__input")
            ;

            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;

            currentDate.val(year + "-" + month + "-" + date);
            return currentDate.val();
        },
        currentDateValidation: function () {
            var currentDateInput = $(this);
            var carDate = currentDateInput.val().split('-')
            ;

            carDate[0] = parseInt(carDate[0]);
            carDate[1] = parseInt(carDate[1]) - 1;
            carDate[2] = parseInt(carDate[2]);
            //carDate[1] -= 1;
            var d = new Date(carDate[0], carDate[1], carDate[2]);
            if ((d.getFullYear() === carDate[0]) && (d.getMonth() === carDate[1]) && (d.getDate() === carDate[2])) {
                return true;
            }
            else if (currentDateInput.val() === "") {
                currentDateInput.val("--");
                return true;
            }
            else if (currentDateInput.val() === "--") {
                return true;
            }
            else {
                var cd = Imcms.DatePicker.currentDate();
                currentDateInput.val(cd);
                return false;
            }


        }
    };

    return Imcms.DatePicker
})(Imcms);
