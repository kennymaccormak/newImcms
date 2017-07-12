(function (Imcms) {
    Imcms.DatePicker = {
        init: function () {
            var currentDate = Imcms.DatePicker.currentDate(),
                datePicker = $(".imcms-date-picker");

            datePicker.find(".imcms-current-date__input")
                .val(currentDate)
                .end()
                .find(".imcms-date-picker__current-date")
                .click(Imcms.DatePicker.openCalendar)
                .end()
                .find(".imcms-current-date__input")
                .on('blur', Imcms.DatePicker.currentDateValidation)
                .on('keyup change', Imcms.DatePicker.currentValidationAndBuild)
                .mask("0000-00-00");
            $(document).click(Imcms.DatePicker.closeCalendar);

            datePicker.find(".imcms-calendar").find(".imcms-calendar__button").each(function () {
                $(this).click(Imcms.Calendar.chooseMonth);
            });
        },
        openCalendar: function () {
            var curdate = $(this),
                datePicker = curdate.parents(".imcms-date-picker"),
                calendar = datePicker.find(".imcms-calendar")
            ;
            
            Imcms.Calendar.init(datePicker);

            datePicker.css({"border-color": "#d3d8de"})
                .find(".imcms-date-picker__error")
                .css({"display": "none"});
        },
        closeCalendar: function (e) {
            if (
                !$(e.target).closest(".imcms-current-date__input").length
                &&
                (e.target.classList[1] !== "imcms-current-date__input"
                ||
                e.target.classList[1] !== ".imcms-date-picker__current-date")
                &&
                !$(e.target).parents(".imcms-calendar").length
            ) {
                $(".imcms-date-picker").removeClass("imcms-date-picker--active");
                e.stopPropagation();
            }
        },
        currentDate: function () {
            var currentDate = new Date(),
                year = currentDate.getFullYear(),
                month = currentDate.getMonth() + 1,
                date = currentDate.getDate()
            ;

            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;

            return year + "-" + month + "-" + date;
        },
        currentDateValidation: function () {
            var currentDateInput = $(this),
                carDate = currentDateInput.val().split('-'),
                year, month, date,
                calendar = currentDateInput.parents(".imcms-date-picker").find(".imcms-calendar")
            ;

            carDate[0] = parseInt(carDate[0]);
            carDate[1] = parseInt(carDate[1]) - 1;
            carDate[2] = parseInt(carDate[2]);
            year = carDate[0];
            month = carDate[1];
            date = carDate[2];
            //carDate[1] -= 1;
            var currentDate = new Date(carDate[0], carDate[1], carDate[2]);
            if ((currentDate.getFullYear() === carDate[0])
                && (currentDate.getMonth() === carDate[1])
                && (currentDate.getDate() === carDate[2])
            ) {
                Imcms.Calendar.buildCalendar(year, month, date, calendar);
                return true;
            }
            else if (currentDateInput.val() === "") {
                currentDateInput.val("--");
                Imcms.Calendar.buildCalendar(year, month, date, calendar);
                return true;
            }
            else if (currentDateInput.val() === "--") {
                Imcms.Calendar.buildCalendar(year, month, date, calendar);
                return true;
            }
            else {
                var cd = Imcms.DatePicker.currentDate();
                currentDateInput.val(cd);
                return false;
            }
        },
        currentValidationAndBuild: function () {
            var currentDateInput = $(this);
            var carDate = currentDateInput.val().split('-'),
                year = carDate[0],
                month = carDate[1],
                date = carDate[2],
                calendar = currentDateInput.parents(".imcms-date-picker").find(".imcms-calendar")
            ;
            Imcms.Calendar.buildCalendar(year, month, date, calendar);
            calendar.find(".imcms-calendar__day").each(function () {
                if ($(this).html() === date) {
                    $(this).addClass("imcms-day--today");
                }
                else {
                    $(this).removeClass("imcms-day--today");
                }
            });
        }
    };

    return Imcms.DatePicker
})(Imcms);
