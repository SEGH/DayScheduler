// Assignments
var today = moment().format("dddd, MMMM Do");
var now = moment().startOf('hour');
var todayTime = moment().format("YYYY-MM-DD");
var textArea = $(".description");
var textArray = [];

// Set currentDay to a moment representing today
$("#currentDay").text(today);

// Function to dynamically change description background color based on time
function timeColor() {
    for (var i = 0; i < textArea.length; i++) {

        var time = todayTime + textArea[i].name;

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
    var date = todayTime + hour;
    var text = $(this).siblings(".description")[0].value;
    var textObject = { date: date, hour: hour, description: text };
    textArray.push(textObject);
    localStorage.setItem("tasks", JSON.stringify(textArray));
});

// Function to display saved description text
function renderText() {
    var tempText = JSON.parse(localStorage.getItem("tasks"));
    if (tempText !== null) {
        textArray = tempText;
        textArray.forEach(function(obj) {
            for (var i = 0; i < textArea.length; i++) {
                if (textArea[i].name == obj.hour) {
                    textArea[i].value = obj.description;
                }
            }
        });
    }
}
renderText();