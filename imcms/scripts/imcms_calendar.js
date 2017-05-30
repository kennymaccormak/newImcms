(function (Imcms) {
    Imcms.Calendar = {
        init: function (datePicker) {
            var curDateInput = datePicker.find(".imcms-current-date__input"),
                calendar = datePicker.find(".imcms-calendar"),
                curDate = curDateInput.val().split("-"),
                year = parseInt(curDate[0]),
                month = parseInt(curDate[1]),
                date = parseInt(curDate[2])
            ;

            if (curDateInput.val() === "--") {
                var currentDate = new Date();
                year = currentDate.getFullYear();
                month = currentDate.getMonth() + 1;
                date = currentDate.getDate();
            }

            if (!datePicker.hasClass("imcms-date-picker--active") && datePicker.find(".imcms-calendar").length !== 0) {
                datePicker.addClass("imcms-date-picker--active");
                Imcms.Calendar.buildCalendar(year, month, date, calendar);
            }
        },
        buildCalendar: function (year, month, day, $calendar) {
            if (!$calendar || !$calendar.length) {
                return;
            }

            var calendarTitle = $calendar.find(".imcms-calendar__title"),
                calendarTitleVal = calendarTitle.val().split(" "),
                calendarWeek = $calendar.find(".imcms-calendar__week"),
                firstDay = new Date(year, month - 1),
                firstDate = parseInt(firstDay.getDate()),
                firstDayNumber = parseInt(firstDay.getDay()),
                lastD = new Date(year, month, 0),
                lastDay = parseInt(lastD.getDate()),
                prevMonthD = new Date(year, month - 1, 0),
                prevMonthDay = parseInt(prevMonthD.getDate()),
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
            var previousMonthDayNumber = firstDayNumber - 1;
            var nextMonthDayNumber = 1;
            calendarWeek.each(function () {
                $(this).find(".imcms-calendar__day").each(function () {
                    var $calendarDay = $(this);
                    if (count < firstDayNumber) {
                        $calendarDay.removeClass("imcms-day--outer-next imcms-day--today")
                            .addClass("imcms-day--outer-prev")
                            .attr("data-month", prevMonthD.getMonth() + 1)
                            .text(prevMonthDay - previousMonthDayNumber);
                        previousMonthDayNumber--
                    }
                    else if ((count - firstDayNumber + 1) > lastDay) {
                        $calendarDay.removeClass("imcms-day--outer-prev imcms-day--today")
                            .addClass("imcms-day--outer-next")
                            .attr("data-month", firstDay.getMonth() + 2)
                            .text(nextMonthDayNumber++);
                    }
                    else {
                        $calendarDay.removeClass("imcms-day--outer-prev imcms-day--outer-next imcms-day--today")
                            .removeAttr("data-month")
                            .text(firstDate);
                        firstDate++;
                        if ((count - firstDayNumber + 1) === day) {
                            $calendarDay.addClass("imcms-day--today");
                        }
                    }
                    $calendarDay.click(Imcms.Calendar.setSelectDate);
                    count++;
                });
            });

            var lastCalendarWeekCss = ((firstDayNumber + lastDay) <= 35)
                ? {"display": "none"}
                : {"display": "block"};

            calendarWeek.last().css(lastCalendarWeekCss);
        },
        setSelectDate: function () {
            var $thisDay = $(this),
                curDateInput = $thisDay.parents(".imcms-date-picker").find(".imcms-current-date__input"),
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

            if ($thisDay.hasClass("imcms-day--outer-prev")) {
                month = $thisDay.attr("data-month");
                if (month < 10) month = "0" + month;
            }
            else if ($thisDay.hasClass("imcms-day--outer-next")) {
                month = $thisDay.attr("data-month");
                if (month < 10) month = "0" + month;
            }
            else {
                year = curDateInputVal[0];
                month = curDateInputVal[1];
                date = $thisDay.text();
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
                curDate = $btn.parents(".imcms-date-picker")
                    .find(".imcms-current-date__input")
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
                    $btn.parents(".imcms-date-picker")
                        .find(".imcms-current-date__input")
                        .val(curDate.join("-"))
                }
                else if (parseInt(curDate[1]) === 1) {
                    curDate[1] = "12";
                    curDate[0] = year - 1;
                    $btn.parents(".imcms-date-picker")
                        .find(".imcms-current-date__input")
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
                    $btn.parents(".imcms-date-picker")
                        .find(".imcms-current-date__input")
                        .val(curDate.join("-"))
                }
                else if (parseInt(curDate[1]) === 12) {
                    curDate[1] = "01";
                    curDate[0] = year + 1;
                    $btn.parents(".imcms-date-picker")
                        .find(".imcms-current-date__input")
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
