(function (Imcms) {
    Imcms.Calendar = {
        init: function (datePicker) {
            var curDateInput = datePicker.find(".imcms-current-data__input"),
                calendar = datePicker.find(".imcms-calendar"),
                curDate = curDateInput.val().split("-"),
                year = parseInt(curDate[0]),
                month = parseInt(curDate[1]),
                date = parseInt(curDate[2])
            ;

            if (curDateInput.val() === "--") {
                var d = new Date();
                year = d.getFullYear();
                month = d.getMonth() + 1;
                date = d.getDate();
            }

            if (!datePicker.hasClass("imcms-data-picker--active")) {
                datePicker.addClass("imcms-data-picker--active");
                Imcms.Calendar.buildCalendar(year, month, date, calendar);
            }

            calendar.find(".imcms-calendar__button").each(function () {
                $(this).click(Imcms.Calendar.chooseMonth);
            });
        },
        buildCalendar: function (y, m, d, calendar) {
            var $thisCalendar = calendar,
                year = y,
                month = m,
                date = d,
                calendarTitle = $thisCalendar.find(".imcms-calendar__title"),
                calendarTitleVal = calendarTitle.val().split(""),
                calendarWeek = $thisCalendar.find(".imcms-calendar__week"),
                firstDay = new Date(year, month - 1),
                firstDate = firstDay.getDate(),
                firstDayNumber = firstDay.getDay(),
                lastD = new Date(year, month, 0),
                lastDay = lastD.getDate(),

                count = 0,
                monthList = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
            ;

            calendarTitleVal[0] = monthList[month - 1];
            calendarTitleVal[1] = year;
            calendarTitle.html(calendarTitleVal.join(" "));
            count = 0;
            calendarWeek.each(function () {
                $(this).find(".imcms-calendar__day").each(function () {
                    if (count < firstDayNumber) {
                        $(this).text("-");
                        $(this).addClass("imcms-day--outer");
                    }
                    else if ((count - firstDayNumber + 1) > lastDay) {
                        $(this).text("-");
                        $(this).addClass("imcms-day--outer");
                    }
                    else {
                        $(this).text(firstDate);
                        $(this).removeClass("imcms-day--outer");
                        $(this).removeClass("imcms-day--today");
                        firstDate++;
                        if ((count - firstDayNumber + 1) === date) {
                            $(this).addClass("imcms-day--today");
                        }
                        $(this).click(Imcms.Calendar.setSelectDate)
                    }
                    count++;
                });
            });

            if ((firstDayNumber + lastDay) <= 35) {
                calendarWeek.last().css({"display": "none"});
            }
            else {
                calendarWeek.last().css({"display": "block"});
            }

        },
        setSelectDate: function () {
            var $thisDay = $(this),
                curDateInput = $thisDay.parents(".imcms-data-picker").find(".imcms-current-data__input"),
                curDateInputVal = curDateInput.val().split('-'),
                year = curDateInputVal[0],
                month = curDateInputVal[1],
                date = $thisDay.text()
            ;

            if (curDateInput.val() === "--") {
                var d = new Date();
                year = d.getFullYear();
                month = d.getMonth() + 1;
                if (month < 10) month = "0" + month;
            }


            $thisDay.parents(".imcms-calendar__body")
                .find(".imcms-day--today")
                .removeClass("imcms-day--today");

            if (date < 10) date = "0" + date;
            curDateInput.val(year + "-" + month + "-" + date);
            $thisDay.addClass("imcms-day--today");
        },
        chooseMonth: function () {
            var $btn = $(this),
                calendar = $btn.parents(".imcms-calendar"),
                curDate = $btn.parents(".imcms-data-picker")
                    .find(".imcms-current-data__input")
                    .val()
                    .split("-"),
                year = parseInt(curDate[0]),
                month = parseInt(curDate[1]),
                date = parseInt(curDate[2])
            ;

            if ($btn.hasClass("imcms-calendar__prev-month")) {
                if (parseInt(curDate[1]) > 1) {
                    curDate[1] = parseInt(curDate[1]) - 1;
                    curDate[1] = (curDate[1] < 10) ? "0" + curDate[1] : curDate[1];
                    $btn.parents(".imcms-data-picker")
                        .find(".imcms-current-data__input")
                        .val(curDate.join("-"))
                }
                else if (parseInt(curDate[1]) === 1) {
                    curDate[1] = "12";
                    curDate[0] = year - 1;
                    $btn.parents(".imcms-data-picker")
                        .find(".imcms-current-data__input")
                        .val(curDate.join("-"))
                }
                month = curDate[1];
                year = curDate[0];
                Imcms.Calendar.buildCalendar(year, month, date, calendar);
            }
            else {
                if (parseInt(curDate[1]) < 12) {
                    curDate[1] = parseInt(curDate[1]) + 1;
                    curDate[1] = (curDate[1] < 10) ? "0" + curDate[1] : curDate[1];
                    $btn.parents(".imcms-data-picker")
                        .find(".imcms-current-data__input")
                        .val(curDate.join("-"))
                }
                else if (parseInt(curDate[1]) === 12) {
                    curDate[1] = "01";
                    curDate[0] = year + 1;
                    $btn.parents(".imcms-data-picker")
                        .find(".imcms-current-data__input")
                        .val(curDate.join("-"))
                }
                month = curDate[1];
                year = curDate[0];
                Imcms.Calendar.buildCalendar(year, month, date, calendar);
            }
        }
    };

    return Imcms.Calendar;
})(Imcms);













