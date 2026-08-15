./* =========================================
   IMLEK+ LUNAR REMINDER
   By : Tekhim
   ========================================= */


/* ================================
   ELEMENTS
================================ */

const todayDate =
    document.getElementById("todayDate");

const todayLunar =
    document.getElementById("todayLunar");

const lunarYear =
    document.getElementById("lunarYear");

const zodiac =
    document.getElementById("zodiac");

const moonPhase =
    document.getElementById("moonPhase");

const nextFirstText =
    document.getElementById("nextFirstText");

const nextFirstDate =
    document.getElementById("nextFirstDate");

const nextFifteenthText =
    document.getElementById("nextFifteenthText");

const nextFifteenthDate =
    document.getElementById("nextFifteenthDate");

const reminderText =
    document.getElementById("reminderText");


/* ================================
   FORMAT MASEHI
================================ */

function formatDate(date) {

    return date.toLocaleDateString(
        "id-ID",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* ================================
   FORMAT LUNAR
================================ */

function lunarMonthName(month) {

    const months = [
        "",
        "Bulan 1",
        "Bulan 2",
        "Bulan 3",
        "Bulan 4",
        "Bulan 5",
        "Bulan 6",
        "Bulan 7",
        "Bulan 8",
        "Bulan 9",
        "Bulan 10",
        "Bulan 11",
        "Bulan 12"
    ];

    return months[Math.abs(month)] || "";
}


function lunarDayName(day) {

    const days = [
        "",
        "Tanggal 1",
        "Tanggal 2",
        "Tanggal 3",
        "Tanggal 4",
        "Tanggal 5",
        "Tanggal 6",
        "Tanggal 7",
        "Tanggal 8",
        "Tanggal 9",
        "Tanggal 10",
        "Tanggal 11",
        "Tanggal 12",
        "Tanggal 13",
        "Tanggal 14",
        "Tanggal 15",
        "Tanggal 16",
        "Tanggal 17",
        "Tanggal 18",
        "Tanggal 19",
        "Tanggal 20",
        "Tanggal 21",
        "Tanggal 22",
        "Tanggal 23",
        "Tanggal 24",
        "Tanggal 25",
        "Tanggal 26",
        "Tanggal 27",
        "Tanggal 28",
        "Tanggal 29",
        "Tanggal 30"
    ];

    return days[day] || "";
}


/* ================================
   ZODIAC
================================ */

function getZodiac(year) {

    const animals = [
        "Monyet 🐒",
        "Ayam 🐓",
        "Anjing 🐕",
        "Babi 🐖",
        "Tikus 🐀",
        "Kerbau 🐂",
        "Macan 🐅",
        "Kelinci 🐇",
        "Naga 🐉",
        "Ular 🐍",
        "Kuda 🐎",
        "Kambing 🐐"
    ];

    return animals[year % 12];

}


/* ================================
   TODAY LUNAR
================================ */

function getTodayLunar() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        now.getMonth() + 1;

    const day =
        now.getDate();


    /*
       Fungsi Solar berasal dari
       lunar-javascript
    */

    const solar =
        Solar.fromYmd(
            year,
            month,
            day
        );


    const lunar =
        solar.getLunar();


    return lunar;

}


/* ================================
   UPDATE TODAY
================================ */

function updateToday() {

    const now =
        new Date();

    todayDate.textContent =
        formatDate(now);


    try {

        const lunar =
            getTodayLunar();


        const ly =
            lunar.getYear();

        const lm =
            lunar.getMonth();

        const ld =
            lunar.getDay();


        todayLunar.textContent =
            `${lunarMonthName(lm)}
             • ${lunarDayName(ld)}`;


        lunarYear.textContent =
            ly;


        zodiac.textContent =
            getZodiac(ly);


        moonPhase.textContent =
            ld === 1
                ? "🌑 Baru"
                : ld === 15
                    ? "🌕 Purnama"
                    : "🌙 Lunar";


        updateReminder(ld);


    } catch (error) {

        console.error(
            "Lunar error:",
            error
        );

        todayLunar.textContent =
            "Lunar belum tersedia";

    }

}


/* ================================
   REMINDER TEXT
================================ */

function updateReminder(day) {

    if (day === 1) {

        reminderText.textContent =
            "🙏 Hari ini tanggal 1 Imlek. Jangan lupa sembahyang.";

    }

    else if (day === 15) {

        reminderText.textContent =
            "🌕 Hari ini tanggal 15 Imlek. Jangan lupa sembahyang.";

    }

    else {

        reminderText.textContent =
            "Jangan sampai lupa sembahyang.";

    }

}


/* ================================
   FIND NEXT LUNAR DAY
================================ */

function findNextLunarDay(targetDay) {

    const now =
        new Date();

    /*
       Kita mulai mencari dari
       hari ini.

       Maksimum 40 hari karena
       satu bulan Lunar sekitar
       29-30 hari.
    */

    for (
        let i = 0;
        i <= 40;
        i++
    ) {

        const date =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + i
            );


        const solar =
            Solar.fromYmd(
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
            );


        const lunar =
            solar.getLunar();


        if (
            lunar.getDay() === targetDay
        ) {

            return {
                date,
                lunar
            };

        }

    }


    return null;

}


/* ================================
   COUNTDOWN
================================ */

function getCountdown(targetDate) {

    const now =
        new Date();

    const difference =
        targetDate - now;


    if (difference <= 0) {

        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    return {
        days,
        hours,
        minutes,
        seconds
    };

}


/* ================================
   UPDATE COUNTDOWN
================================ */

function updateCountdown() {

    const first =
        findNextLunarDay(1);

    const fifteenth =
        findNextLunarDay(15);


    if (first) {

        const countdown =
            getCountdown(
                first.date
            );


        nextFirstText.textContent =
            `${countdown.days} hari`;


        nextFirstDate.textContent =
            formatDate(
                first.date
            );

    }


    if (fifteenth) {

        const countdown =
            getCountdown(
                fifteenth.date
            );


        nextFifteenthText.textContent =
            `${countdown.days} hari`;


        nextFifteenthDate.textContent =
            formatDate(
                fifteenth.date
            );

    }

}


/* ================================
   ALARM
================================ */

const alarmModal =
    document.getElementById(
        "alarmModal"
    );

const alarmButton =
    document.getElementById(
        "alarmButton"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );

const saveAlarm =
    document.getElementById(
        "saveAlarm"
    );

const alarmTime =
    document.getElementById(
        "alarmTime"
    );


alarmButton.addEventListener(
    "click",
    () => {

        alarmModal.classList.remove(
            "hidden"
        );


        const saved =
            localStorage.getItem(
                "imlekAlarm"
            );


        if (saved) {

            alarmTime.value =
                saved;

        }

    }
);


closeModal.addEventListener(
    "click",
    () => {

        alarmModal.classList.add(
            "hidden"
        );

    }
);


saveAlarm.addEventListener(
    "click",
    () => {

        localStorage.setItem(
            "imlekAlarm",
            alarmTime.value
        );


        alarmModal.classList.add(
            "hidden"
        );


        alert(
            `Pengingat disimpan: ${alarmTime.value}`
        );

    }
);


/* ================================
   EXPORT ICS
================================ */

document
    .getElementById("icsButton")
    .addEventListener(
        "click",
        generateICS
    );


function generateICS() {

    const first =
        findNextLunarDay(1);

    const fifteenth =
        findNextLunarDay(15);


    if (!first || !fifteenth) {

        alert(
            "Tanggal Lunar belum ditemukan."
        );

        return;

    }


    const events = [

        {
            title:
                "🙏 Sembahyang - Tanggal 1 Imlek",

            date:
                first.date
        },

        {
            title:
                "🌕 Sembahyang - Tanggal 15 Imlek",

            date:
                fifteenth.date
        }

    ];


    let ics =
        "BEGIN:VCALENDAR\r\n";

    ics +=
        "VERSION:2.0\r\n";

    ics +=
        "PRODID:-//Tekhim//Imlek Reminder//ID\r\n";

    ics +=
        "CALSCALE:GREGORIAN\r\n";


    events.forEach(
        event => {

            const y =
                event.date.getFullYear();

            const m =
                String(
                    event.date.getMonth() + 1
                ).padStart(2, "0");

            const d =
                String(
                    event.date.getDate()
                ).padStart(2, "0");


            ics +=
                "BEGIN:VEVENT\r\n";

            ics +=
                `DTSTART;VALUE=DATE:${y}${m}${d}\r\n`;

            ics +=
                `SUMMARY:${event.title}\r\n`;

            ics +=
                "END:VEVENT\r\n";

        }
    );


    ics +=
        "END:VCALENDAR\r\n";


    const blob =
        new Blob(
            [ics],
            {
                type:
                    "text/calendar;charset=utf-8"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "Imlek-Reminder.ics";


    link.click();


    URL.revokeObjectURL(url);

}


/* ================================
   THEME BUTTON
================================ */

document
    .getElementById("themeButton")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-preview"
            );

        }
    );


/* ================================
   CALENDAR BUTTON
================================ */

document
    .getElementById("calendarButton")
    .addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


/* ================================
   START
================================ */

updateToday();

updateCountdown();


setInterval(
    () => {

        updateToday();
        updateCountdown();

    },
    1000
);


/* ================================
   BRANDING
================================ */

console.log(
    "🧧 IMLEK+"
);

console.log(
    "By : Tekhim"
);


/* =========================================
   LUNAR + SOLAR MONTHLY CALENDAR
   By : Tekhim
========================================= */

let calendarYear;
let calendarMonth;


/* =========================================
   START CALENDAR
========================================= */

function startCalendar() {

    const now = new Date();

    calendarYear =
        now.getFullYear();

    calendarMonth =
        now.getMonth();

    renderCalendar();

}


/* =========================================
   MONTH NAME
========================================= */

function getIndonesianMonth(month) {

    const months = [

        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"

    ];

    return months[month];

}


/* =========================================
   LUNAR DISPLAY NAME
========================================= */

function getLunarDisplay(lunar) {

    const day =
        lunar.getDay();

    const month =
        lunar.getMonth();


    /*
       Tanggal 1
    */

    if (day === 1) {

        return "初一";

    }


    /*
       Tanggal 15
    */

    if (day === 15) {

        return "十五";

    }


    /*
       Tanggal lainnya
    */

    return lunar.getDayInChinese();

}


/* =========================================
   RENDER CALENDAR
========================================= */

function renderCalendar() {

    const grid =
        document.getElementById(
            "calendarGrid"
        );

    const title =
        document.getElementById(
            "calendarMonth"
        );

    const lunarTitle =
        document.getElementById(
            "calendarLunarMonth"
        );


    if (!grid) {

        return;

    }


    grid.innerHTML = "";


    /*
       Nama bulan Masehi
    */

    title.textContent =
        `${getIndonesianMonth(calendarMonth)}
         ${calendarYear}`;


    /*
       Hari pertama bulan
    */

    const firstDay =
        new Date(
            calendarYear,
            calendarMonth,
            1
        );


    /*
       Hari terakhir bulan
    */

    const lastDay =
        new Date(
            calendarYear,
            calendarMonth + 1,
            0
        );


    /*
       Minggu = 0
       Senin = 1
       ...
       Sabtu = 6
    */

    const startDay =
        firstDay.getDay();


    const daysInMonth =
        lastDay.getDate();


    /*
       Ambil Lunar bulan ini
    */

    let lunarMonthText =
        "Kalender Lunar";


    try {

        const solar =
            Solar.fromYmd(
                calendarYear,
                calendarMonth + 1,
                1
            );


        const lunar =
            solar.getLunar();


        lunarMonthText =
            `Lunar ${lunar.getYear()}
             • ${lunar.getMonthInChinese()}月`;

    }

    catch (error) {

        console.error(
            error
        );

    }


    lunarTitle.textContent =
        lunarMonthText;


    /*
       Sel kosong sebelum tanggal 1
    */

    for (
        let i = 0;
        i < startDay;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "calendar-day empty";


        grid.appendChild(
            empty
        );

    }


    /*
       Buat semua tanggal
    */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const cell =
            document.createElement(
                "div"
            );


        cell.className =
            "calendar-day";


        /*
           Tanggal Masehi
        */

        const solarNumber =
            document.createElement(
                "span"
            );


        solarNumber.className =
            "solar-number";


        solarNumber.textContent =
            day;


        /*
           Tanggal Lunar
        */

        const lunarNumber =
            document.createElement(
                "span"
            );


        lunarNumber.className =
            "lunar-number";


        /*
           Konversi Masehi → Lunar
        */

        try {

            const solar =
                Solar.fromYmd(
                    calendarYear,
                    calendarMonth + 1,
                    day
                );


            const lunar =
                solar.getLunar();


            lunarNumber.textContent =
                getLunarDisplay(
                    lunar
                );


            /*
               Tanggal 1 Imlek
            */

            if (
                lunar.getDay() === 1
            ) {

                cell.classList.add(
                    "lunar-first"
                );

            }


            /*
               Tanggal 15 Imlek
            */

            if (
                lunar.getDay() === 15
            ) {

                cell.classList.add(
                    "lunar-fifteenth"
                );

            }

        }

        catch (error) {

            lunarNumber.textContent =
                "--";

            console.error(
                error
            );

        }


        /*
           Tandai hari ini
        */

        const now =
            new Date();


        if (

            day === now.getDate() &&

            calendarMonth ===
                now.getMonth() &&

            calendarYear ===
                now.getFullYear()

        ) {

            cell.classList.add(
                "today"
            );

        }


        /*
           Masukkan ke cell
        */

        cell.appendChild(
            solarNumber
        );


        cell.appendChild(
            lunarNumber
        );


        /*
           Klik tanggal
        */

        cell.addEventListener(
            "click",
            () => {

                showCalendarDay(
                    calendarYear,
                    calendarMonth,
                    day
                );

            }
        );


        grid.appendChild(
            cell
        );

    }

}


/* =========================================
   DAY INFORMATION
========================================= */

function showCalendarDay(
    year,
    month,
    day
) {

    try {

        /* =========================
           ELEMENTS
        ========================= */

        const detail =
            document.getElementById(
                "lunarDetail"
            );

        const detailSolar =
            document.getElementById(
                "detailSolar"
            );

        const detailChinese =
            document.getElementById(
                "detailChinese"
            );

        const detailLunar =
            document.getElementById(
                "detailLunar"
            );

        const detailSpecial =
            document.getElementById(
                "detailSpecial"
            );

        const detailSpecialTitle =
            document.getElementById(
                "detailSpecialTitle"
            );

        const detailSpecialText =
            document.getElementById(
                "detailSpecialText"
            );

        const detailYear =
            document.getElementById(
                "detailYear"
            );

        const detailZodiac =
            document.getElementById(
                "detailZodiac"
            );

        const detailMonth =
            document.getElementById(
                "detailMonth"
            );

        const detailDay =
            document.getElementById(
                "detailDay"
            );


        /* =========================
           SOLAR
        ========================= */

        const solar =
            Solar.fromYmd(
                year,
                month + 1,
                day
            );


        /* =========================
           LUNAR
        ========================= */

        const lunar =
            solar.getLunar();


        /* =========================
           DATE OBJECT
        ========================= */

        const date =
            new Date(
                year,
                month,
                day
            );


        /* =========================
           MASEHI
        ========================= */

        detailSolar.textContent =
            date.toLocaleDateString(
                "id-ID",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        /* =========================
           LUNAR CHINESE
        ========================= */

        detailChinese.textContent =
            lunar.getDayInChinese();


        /* =========================
           LUNAR TEXT
        ========================= */

        detailLunar.textContent =
            `${lunar.getYear()}年 ` +
            `${lunar.getMonthInChinese()}月` +
            `${lunar.getDayInChinese()}`;


        /* =========================
           YEAR
        ========================= */

        detailYear.textContent =
            lunar.getYear();


        /* =========================
           ZODIAC
        ========================= */

        detailZodiac.textContent =
            getZodiac(
                lunar.getYear()
            );


        /* =========================
           MONTH
        ========================= */

        detailMonth.textContent =
            `${lunar.getMonth()} ` +
            `(${lunar.getMonthInChinese()}月)`;


        /* =========================
           DAY
        ========================= */

        detailDay.textContent =
            lunar.getDay();


        /* =========================
           SPECIAL DAY
        ========================= */

        detailSpecial.classList.remove(
            "gold"
        );


        if (
            lunar.getDay() === 1
        ) {

            detailSpecialTitle.textContent =
                "🧧 Tanggal 1 Imlek";


            detailSpecialText.textContent =
                "Hari sembahyang • Awal bulan Lunar";


            detailSpecial.classList.remove(
                "gold"
            );

        }

        else if (
            lunar.getDay() === 15
        ) {

            detailSpecialTitle.textContent =
                "🌕 Tanggal 15 Imlek";


            detailSpecialText.textContent =
                "Hari sembahyang • Pertengahan bulan Lunar";


            detailSpecial.classList.add(
                "gold"
            );

        }

        else {

            detailSpecialTitle.textContent =
                "🌙 Hari Lunar";


            detailSpecialText.textContent =
                "Tidak ada peringatan khusus";


            detailSpecial.classList.remove(
                "gold"
            );

        }


        /* =========================
           OPEN PANEL
        ========================= */

        detail.classList.add(
            "show"
        );


        /*
           Mencegah body ikut scroll
           ketika panel terbuka
        */

        document.body.style.overflow =
            "hidden";


    }

    catch (error) {

        console.error(
            "Lunar detail error:",
            error
        );

    }

}
            

/* =========================================
   PREVIOUS MONTH
========================================= */

document
    .getElementById("prevMonth")
    .addEventListener(
        "click",
        () => {

            calendarMonth--;

            if (
                calendarMonth < 0
            ) {

                calendarMonth = 11;

                calendarYear--;

            }


            renderCalendar();

        }
    );


/* =========================================
   NEXT MONTH
========================================= */

document
    .getElementById("nextMonth")
    .addEventListener(
        "click",
        () => {

            calendarMonth++;

            if (
                calendarMonth > 11
            ) {

                calendarMonth = 0;

                calendarYear++;

            }


            renderCalendar();

        }
    );


/* =========================================
   TODAY
========================================= */

document
    .getElementById("todayButton")
    .addEventListener(
        "click",
        () => {

            const now =
                new Date();


            calendarYear =
                now.getFullYear();


            calendarMonth =
                now.getMonth();


            renderCalendar();

        }
    );


/* =========================================
   RUN CALENDAR
========================================= */

startCalendar();
