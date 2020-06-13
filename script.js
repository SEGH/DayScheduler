// Assignments
var today = moment().format("dddd, MMMM Do");
var now = moment().startOf('hour');
var todayTime = moment().format("YYYY-MM-DD");
var tomorrow = moment().add(1, 'days').format("dddd, MMMM Do");
var tomorrowTime = moment().add(1, 'days').format("YYYY-MM-DD");
var displayDay = "today";
var textArea = $(".description");
var textArray = [];

// Set currentDay to a moment representing today or tomorrow
function setPage() {
    if (displayDay === "today") {
        $("#currentDay").text(today);
    } else if (displayDay === "tomorrow") {
        $("#currentDay").text(tomorrow);
    }
}
setPage();

// Event Listeners for page turners
$(".next").on("click", function() {
    displayDay = "tomorrow";
    setPage();
    renderText();
    timeColor();
});

$(".prev").on("click", function() {
    displayDay = "today";
    setPage();
    timeColor();
    renderText();
})

// Function to dynamically change description background color based on time
function timeColor() {
    for (var i = 0; i < textArea.length; i++) {
        $(textArea[i]).removeClass("past present future");
        var time;
        if (displayDay === "today") {
            time = todayTime + textArea[i].name;
        } else if (displayDay === "tomorrow") {
            time = tomorrowTime + textArea[i].name;
        }
        console.log(displayDay);
        console.log(time);
        if (moment(time).isBefore(now)) {
            $(textArea[i]).addClass("past");
        } else if (moment(time).isSame(now)) {
            $(textArea[i]).addClass("present");
        } else if (moment(time).isAfter(now)) {
            $(textArea[i]).addClass("future");
        }
    }
}
timeColor();

// Event listener for Save buttons with anon function to save descriptions to local storage
$(".saveBtn").on("click", function() {
    var hour = $(this).siblings(".description")[0].name;
    var date;
    if (displayDay === "today") {
        date = todayTime + hour;
    } else if (displayDay === "tomorrow") {
        date = tomorrowTime + hour;
    }

    var text = $(this).siblings(".description")[0].value;
    var textObject = { date: date, hour: hour, description: text };
    textArray.push(textObject);
    localStorage.setItem("tasks", JSON.stringify(textArray));
});

// Function to display saved description text
function renderText() {
    textArea.val("");
    var tempText = JSON.parse(localStorage.getItem("tasks"));
    if (tempText !== null) {
        textArray = tempText;
        textArray.forEach(function(obj) {
            for (var i = 0; i < textArea.length; i++) {
                var date;
                if (displayDay === "today") {
                    date = todayTime + obj.hour;
                } else if (displayDay === "tomorrow") {
                    date = tomorrowTime + obj.hour;
                }

                if ((textArea[i].name == obj.hour) && (date === obj.date)) {
                    textArea[i].value = obj.description;
                }
            }
        });
    }
}
renderText();