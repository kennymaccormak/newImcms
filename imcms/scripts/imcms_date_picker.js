(function (Imcms) {
    Imcms.DatePicker = {
        init: function () {
            Imcms.DatePicker.currentDate();
            $(".imcms-data-picker .imcms-data-picker__current-data")
                .click(Imcms.DatePicker.openCalendar);
            $(document).click(Imcms.DatePicker.closeCalendar);
        },
        openCalendar: function () {
            var curdate = $(this),
                datePicker = curdate.parents(".imcms-data-picker"),
                calendar = datePicker.find(".imcms-calendar")
            ;

            if (!datePicker.hasClass("imcms-data-picker--active")) {
                datePicker.addClass("imcms-data-picker--active");
                Imcms.Calendar.buildCalendar(calendar);
            }
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

            var currentDateVal = Imcms.DatePicker.currentDate();

            Imcms.DatePicker.currentDateValidation(currentDateVal);

        },
        currentDate: function () {
            var d = new Date(),
                year = d.getFullYear(),
                month = d.getMonth() + 1,
                date = d.getDate(),
                datePicker = $(".imcms-data-picker"),
                currentDate = datePicker.find(".imcms-current-data__input"),
                currentDateVal = currentDate.val()
            ;

            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;

            currentDate.val(year + "-" + month + "-" + date);

            return currentDateVal;
        },
        currentDateValidation: function (currentDateVal) {
            var carDate = currentDateVal.split('-')
            ;

            console.log(carDate);
            carDate[0] = parseInt(carDate[0]);
            carDate[1] = parseInt(carDate[1]) - 1;
            carDate[2] = parseInt(carDate[2]);
            //carDate[1] -= 1;
            var d = new Date(carDate[0], carDate[1], carDate[2]);
            console.log(carDate[0]);
            if ((d.getFullYear() === carDate[0]) && (d.getMonth() === carDate[1]) && (d.getDate() === carDate[2])) {
                return true;
            } else {
                console.log("Введена некорректная дата!");
                return false;
            }


        }
    };

    return Imcms.DatePicker
})(Imcms);
