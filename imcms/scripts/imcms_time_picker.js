(function (Imcms) {
    Imcms.TimePicker = {
        init: function () {
            Imcms.TimePicker.currentTime();
            $(".imcms-time-picker .imcms-current-time__input")
                .blur(Imcms.TimePicker.currentTimeValidation)
                .mask("00:00");
            $(".imcms-time-picker .imcms-time-picker__current-time")
                .click(Imcms.TimePicker.openPicker);
            $(document).click(Imcms.TimePicker.closePicker);
            $(".imcms-time-picker .imcms-time-picker__time .imcms-time-picker__button")
                .click(Imcms.TimePicker.chooseTime);
        },
        currentTime: function () {
            var t = new Date(),
                hour = t.getHours(),
                minute = t.getMinutes(),
                timePicker = $(".imcms-time-picker"),
                currentTime = timePicker.find(".imcms-current-time__input")
            ;

            if (hour < 10) hour = "0" + hour;
            if (minute < 10) minute = "0" + minute;

            currentTime.val(hour + ":" + minute);
            return currentTime.val();
        },
        openPicker: function () {
            var curTime = $(this),
                timePicker = curTime.parents(".imcms-time-picker"),
                hour = timePicker.find(".imcms-time-picker__hour"),
                minute = timePicker.find(".imcms-time-picker__minute"),
                picker = timePicker.find(".imcms-time-picker__time"),
                curHour, curMinute,
                currentTimeInput = timePicker.find(".imcms-current-time__input"),
                currentTimeInputVal = currentTimeInput.val().split(":")
            ;

            if (parseInt(currentTimeInputVal[0]) >= 18) {
                curHour = 18;
            } else {
                curHour = parseInt(currentTimeInputVal[0]);
            }

            if (parseInt(currentTimeInputVal[1]) >= 55) {
                curMinute = 55;
            } else {
                curMinute = parseInt(currentTimeInputVal[1]);
            }

            if (!timePicker.hasClass("imcms-time-picker--active") && timePicker.find(".imcms-time-picker__time").length !== 0) {
                timePicker.addClass("imcms-time-picker--active")
            }

            hour.each(function () {
                $(this).click(Imcms.TimePicker.setSelectTime);
                $(this).html(curHour);
                if ($(this).hasClass("imcms-time-picker__hour--choose") && $(this).html() !== currentTimeInputVal[0]) {
                    $(this).removeClass("imcms-time-picker__hour--choose");
                }
                if ($(this).html() === currentTimeInputVal[0]) {
                    $(this).addClass("imcms-time-picker__hour--choose");
                }
                curHour++
            });
            minute.each(function () {
                $(this).click(Imcms.TimePicker.setSelectTime);
                $(this).html(curMinute);
                if ($(this).hasClass("imcms-time-picker__minute--choose") && $(this).html() !== currentTimeInputVal[1]) {
                    $(this).removeClass("imcms-time-picker__minute--choose");
                }
                if ($(this).html() === currentTimeInputVal[1]) {
                    $(this).addClass("imcms-time-picker__minute--choose");
                }
                curMinute++;
            });


        },
        closePicker: function (e) {
            if (
                !$(e.target).closest(".imcms-current-time__input").length
                &&
                (e.target.classList[1] !== "imcms-current-time__input"
                ||
                e.target.classList[1] !== ".imcms-time-picker__current-time")
                &&
                !$(e.target).parents(".imcms-time-picker__time").length
            ) {

                $(".imcms-time-picker").removeClass("imcms-time-picker--active");
                e.stopPropagation();
            }
        },
        chooseTime: function (event) {
            var $btn = $(this),
                hours, hour, minutes, minute, curHour, curMinute,
                timePicker = $btn.parents(".imcms-time-picker"),
                currentTimeInput = timePicker.find(".imcms-current-time__input"),
                currentTimeInputVal = currentTimeInput.val().split(":")
            ;

            curHour = parseInt(currentTimeInputVal[0]);
            curMinute = parseInt(currentTimeInputVal[1]);

            if ($btn.parent(".imcms-time-picker__hours").length !== 0) {
                hours = $btn.parent();
                hour = hours.find(".imcms-time-picker__hour");

                if ($btn.hasClass("imcms-time-picker__prev-hour") && curHour > 0) {
                    curHour -= 1;
                    hour.each(function () {
                        $(this).html(curHour);
                        curHour++;
                    });
                    curHour = parseInt(hour.first().html());
                    if (curHour < 10) curHour = "0" + curHour;
                    if (curMinute < 10) curMinute = "0" + curMinute;
                    currentTimeInput.val(curHour + ":" + curMinute);
                }
                else {
                    event.preventDefault();
                }

                if ($btn.hasClass("imcms-time-picker__next-hour") && parseInt(hour.last().html()) < 23) {
                    curHour += 1;
                    hour.each(function () {
                        $(this).html(curHour);
                        curHour++;
                    });
                    curHour = parseInt(hour.first().html());
                    if (curHour < 10) curHour = "0" + curHour;
                    if (curMinute < 10) curMinute = "0" + curMinute;
                    currentTimeInput.val(curHour + ":" + curMinute);
                }
                else {
                    event.preventDefault();
                }
            }
            if ($btn.parent(".imcms-time-picker__minutes").length !== 0) {
                minutes = $btn.parent();
                minute = minutes.find(".imcms-time-picker__minute");

                if ($btn.hasClass("imcms-time-picker__prev-minute") && curMinute > 0) {
                    curMinute -= 1;
                    minute.each(function () {
                        $(this).html(curMinute);
                        curMinute++;
                    });
                    curMinute = parseInt(minute.first().html());
                    if (curHour < 10) curHour = "0" + curHour;
                    if (curMinute < 10) curMinute = "0" + curMinute;
                    currentTimeInput.val(curHour + ":" + curMinute);
                }
                else {
                    event.preventDefault();
                }

                if ($btn.hasClass("imcms-time-picker__next-minute") && parseInt(minute.last().html()) < 60) {
                    curMinute += 1;
                    minute.each(function () {
                        $(this).html(curMinute);
                        curMinute++;
                    });
                    curMinute = parseInt(minute.first().html());
                    if (curHour < 10) curHour = "0" + curHour;
                    if (curMinute < 10) curMinute = "0" + curMinute;
                    currentTimeInput.val(curHour + ":" + curMinute);
                }
                else {
                    event.preventDefault();
                }
            }
        },
        setSelectTime: function () {
            var $this = $(this),
                hour, minute,
                currentTimeInput = $this.parents(".imcms-time-picker").find(".imcms-current-time__input"),
                currentTimeInputVal = currentTimeInput.val().split(":")
            ;

            hour = currentTimeInputVal[0];
            minute = currentTimeInputVal[1];

            $this.parent().children().each(function () {
                if ($(this).hasClass("imcms-time-picker__hour--choose")) {
                    $(this).removeClass("imcms-time-picker__hour--choose");
                }
                else if ($(this).hasClass("imcms-time-picker__minute--choose")) {
                    $(this).removeClass("imcms-time-picker__minute--choose")
                }
            });

            if ($this.hasClass("imcms-time-picker__hour")) {
                hour = $this.html();
                if (hour < 10) hour = "0" + hour;
                currentTimeInput.val(hour + ":" + currentTimeInputVal[1]);
                $this.addClass("imcms-time-picker__hour--choose");
            }
            if ($this.hasClass("imcms-time-picker__minute")) {
                minute = $this.html();
                if (minute < 10) minute = "0" + minute;
                currentTimeInput.val(currentTimeInputVal[0] + ":" + minute);
                $this.addClass("imcms-time-picker__minute--choose");
            }
        },
        currentTimeValidation: function () {
            var $this = $(this),
                currentTimeInputVal = $this.val().split(":")
            ;
            currentTimeInputVal[0] = parseInt(currentTimeInputVal[0]);
            currentTimeInputVal[1] = parseInt(currentTimeInputVal[1]);
            if (currentTimeInputVal[0] < 0 || currentTimeInputVal[0] > 23) {
                Imcms.TimePicker.currentTime();
            }
            if (currentTimeInputVal[1] < 0 || currentTimeInputVal[1] > 60) {
                Imcms.TimePicker.currentTime();
            }

        }
    };

    return Imcms.TimePicker;
})(Imcms);