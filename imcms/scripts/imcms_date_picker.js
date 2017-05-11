(function (Imcms) {
    Imcms.DatePicker = {
        init: function () {
            Imcms.DatePicker.currentDate();
            $(".imcms-data-picker .imcms-data-picker__current-data")
                .click(Imcms.DatePicker.openCalendar);
            $(".imcms-data-picker .imcms-current-data__input")
                .on('blur', Imcms.DatePicker.currentDateValidation)
                .on('keyup change', Imcms.DatePicker.currentValidationAndBuild)
                .mask("0000-00-00");
            $(document).click(Imcms.DatePicker.closeCalendar);

            $(".imcms-data-picker .imcms-calendar").find(".imcms-calendar__button").each(function () {
                $(this).click(Imcms.Calendar.chooseMonth);
            });
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
            var carDate = currentDateInput.val().split('-'),
                year, month, date,
                calendar = currentDateInput.parents(".imcms-data-picker").find(".imcms-calendar")
            ;

            carDate[0] = parseInt(carDate[0]);
            carDate[1] = parseInt(carDate[1]) - 1;
            carDate[2] = parseInt(carDate[2]);
            year = carDate[0];
            month = carDate[1];
            date = carDate[2];
            //carDate[1] -= 1;
            var d = new Date(carDate[0], carDate[1], carDate[2]);
            if ((d.getFullYear() === carDate[0]) && (d.getMonth() === carDate[1]) && (d.getDate() === carDate[2])) {
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
                calendar = currentDateInput.parents(".imcms-data-picker").find(".imcms-calendar")
            ;
            Imcms.Calendar.buildCalendar(year, month, date, calendar);
            calendar.find(".imcms-calendar__day").each(function () {
                if($(this).html() === date){
                    $(this).addClass("imcms-day--today");
                }
                else{
                    $(this).removeClass("imcms-day--today");
                }
            });
        }
    };

    return Imcms.DatePicker
})(Imcms);
