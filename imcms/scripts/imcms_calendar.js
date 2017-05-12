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

            if (!datePicker.hasClass("imcms-data-picker--active") && datePicker.find(".imcms-calendar").length !== 0) {
                datePicker.addClass("imcms-data-picker--active");
                Imcms.Calendar.buildCalendar(year, month, date, calendar);
            }


        },
        buildCalendar: function (y, m, d, calendar) {
            var $thisCalendar = calendar,
                year = y,
                month = m,
                date = d,
                calendarTitle = $thisCalendar.find(".imcms-calendar__title"),
                calendarTitleVal = calendarTitle.val().split(" "),
                calendarWeek = $thisCalendar.find(".imcms-calendar__week"),
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
            var a = firstDayNumber - 1;
            var b = 1;
            calendarWeek.each(function () {
                $(this).find(".imcms-calendar__day").each(function () {
                    if (count < firstDayNumber) {
                        $(this).text(prevMonthDay - a);
                        $(this).removeClass("imcms-day--outer-prev");
                        $(this).removeClass("imcms-day--outer-next");
                        $(this).removeClass("imcms-day--today");
                        $(this).addClass("imcms-day--outer-prev");
                        $(this).attr("data-month", prevMonthD.getMonth() + 1);
                        a--
                    }
                    else if ((count - firstDayNumber + 1) > lastDay) {
                        $(this).text(b++);
                        $(this).removeClass("imcms-day--outer-prev");
                        $(this).removeClass("imcms-day--outer-next");
                        $(this).removeClass("imcms-day--today");
                        $(this).addClass("imcms-day--outer-next");
                        $(this).attr("data-month", firstDay.getMonth() + 2);
                    }
                    else {
                        $(this).text(firstDate);
                        $(this).removeClass("imcms-day--outer-prev");
                        $(this).removeClass("imcms-day--outer-next");
                        $(this).removeClass("imcms-day--today");
                        $(this).removeAttr("data-month");
                        firstDate++;
                        if ((count - firstDayNumber + 1) === date) {
                            $(this).addClass("imcms-day--today");
                        }
                    }
                    $(this).click(Imcms.Calendar.setSelectDate);
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













