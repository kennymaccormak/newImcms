(function (Imcms) {
    Imcms.DatePicker = {
        init: function () {
            Imcms.DatePicker.currentDate();
            $(".imcms-data-picker .imcms-data-picker__current-data")
                .click(Imcms.DatePicker.openCalendar);
        },
        openCalendar: function () {
            var curdate = $(this),
                datePicker = curdate.parent(),
                calendar = datePicker.find(".imcms-calendar")
            ;

            if (datePicker.hasClass("imcms-data-picker--active")) {
                datePicker.removeClass("imcms-data-picker--active")
            }
            else {
                datePicker.addClass("imcms-data-picker--active");
                Imcms.Calendar.buildCalendar(calendar);
            }
        },
        currentDate: function () {
            var d = new Date(),
                year = d.getFullYear(),
                month = d.getMonth() + 1,
                date = d.getDate()
            ;

            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;

            $(".imcms-data-picker__current-data").each(function () {
                var currDate = year + "-" + month + "-" + date;
                $(this).html(currDate);
            })
        }
    };

    return Imcms.DatePicker
})(Imcms);
