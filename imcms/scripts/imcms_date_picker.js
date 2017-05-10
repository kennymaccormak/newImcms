(function (Imcms) {
    Imcms.DatePicker = {
        init: function () {
            Imcms.DatePicker.currentDate();
            Imcms.DatePicker.currentDateValidation();
            $(".imcms-data-picker .imcms-data-picker__current-data")
                .click(Imcms.DatePicker.openCalendar);
            $(document).click(Imcms.DatePicker.closeCalendar);
        },
        openCalendar: function () {
            var curdate = $(this),
                datePicker = curdate.parent(),
                calendar = datePicker.find(".imcms-calendar")
            ;

            if (!datePicker.hasClass("imcms-data-picker--active")) {
                datePicker.addClass("imcms-data-picker--active");
                Imcms.Calendar.buildCalendar(calendar);
            }
        },
        closeCalendar: function (e) {
            if (
                !$(e.target).closest(".imcms-data-picker__current").length
                &&
                (e.target.classList[1] !== "imcms-data-picker__current"
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
                currentYear = datePicker.find(".imcms-data-picker__current-year"),
                currentMonth = datePicker.find(".imcms-data-picker__current-month"),
                currentDay = datePicker.find(".imcms-data-picker__current-day")
            ;

            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;

            currentYear.val(year);
            currentMonth.val(month);
            currentDay.val(date);
        },
        currentDateValidation: function () {
            var current = $(".imcms-data-picker__current")

            ;

            current.each(function () {
                if ($(this).hasClass("imcms-data-picker__current-year")) {
                    $(this).on('change keyup input click', function () {
                        var $this = $(this),
                            value = $this.val(),
                            len = value.length
                        ;

                        if (value.match(/[^0-9]/g))
                            $this.val(value.replace(/[^0-9]/g, ''));
                        if (len > 4)
                            $this.val(value.substring(0, 4))
                    });
                }
                if ($(this).hasClass("imcms-data-picker__current-month")) {
                    $(this).on('change keyup input click', function () {
                        var $this = $(this),
                            value = $this.val(),
                            len = value.length
                        ;
                        if (value.match(/[^0-9]/g))
                            $this.val(value.replace(/[^0-9]/g, ''));
                        if (parseInt(value) > 12)
                            $this.val("");
                        if (len > 2)
                            $this.val(value.substring(0, 2))
                    });
                }
                if ($(this).hasClass("imcms-data-picker__current-day")) {
                    $(this).change();
                }
            });


        }
    };


    //[0][0-9]|[1][0-2]

    return Imcms.DatePicker
})(Imcms);
