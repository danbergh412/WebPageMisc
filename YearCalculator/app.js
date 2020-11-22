function daysInYear(year) {
    leapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    
    return leapYear? 366: 365;
}

function getMonthName(date) {
   const monthNames = ["January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December"
];
   return monthNames[date.getMonth()];
}

function calculate() 
{
    var earthAge = Number($("#earthAge").val());
    var yearsAgo = Number($("#years").val());
    var thisYear = (new Date()).getFullYear();
    var date = new Date("1/1/" + thisYear);
    var startDate = new Date("1/1/" + thisYear);
    var endDate = new Date("1/1/" + (thisYear + 1));

    if ($("#million").prop("checked")){
        earthAge = earthAge * 1000000;
    }
    else if ($("#billion").prop("checked")){
        earthAge = earthAge * 1000000000;
    }


    if ($("#ad").prop("checked")){
        yearsAgo = thisYear - yearsAgo;
    }
    else if ($("#bc").prop("checked")){
        yearsAgo = thisYear + yearsAgo;
    }
    else if ($("#millionAgo").prop("checked")){
        yearsAgo = yearsAgo * 1000000;
    }
    else if ($("#billionAgo").prop("checked")){
        yearsAgo = yearsAgo * 1000000000;
    }

    var yearPercent = (earthAge - yearsAgo)/earthAge;

    var milliInYear = daysInYear(thisYear)*24*60*60*1000;

    var decimalMilli = milliInYear * yearPercent;
    var totalMilli = Math.floor(decimalMilli);

    date.setMilliseconds(date.getMilliseconds() + totalMilli);

    $("#result").html(
        `Range: ${formatDate(startDate)} - ${formatDate(endDate)}<br/>
        Calculated Date: ${formatDate(date, true)}<br/>`
        
    );
 
}

function formatDate(date, includeTime) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    milliseconds = milliseconds.toString().padStart(3, "0");

    var strTime = getMonthName(date) + " " + date.getDate() + ", " + date.getFullYear();

    if (includeTime){
        strTime += " " + hours + ':' + minutes + ':' + seconds + "." + milliseconds + ' ' + ampm;
    }

    return strTime;
}

$("#calculate").click(calculate);