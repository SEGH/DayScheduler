// Assignments
var today = moment().format("dddd, MMMM Do");
var todayString = moment();
var now = moment().startOf('hour');
var todayTime = moment().format("YYYY-MM-DD");
var textArea = $(".description");

// Set currentDay to a moment representing today
$("#currentDay").text(today);

// Function to dynamically change description background color based on time
function timeColor() {
    for (var i = 0; i < textArea.length; i++) {

        var time = todayTime + textArea[i].name;

        if (moment(time).isBefore(now)) {
            $(textArea[i]).addClass("past");
        }
        if (moment(time).isSame(now)) {
            $(textArea[i]).addClass("present");
        } 
        if (moment(time).isAfter(now)) {
            $(textArea[i]).addClass("future");
        }
    }
}
timeColor();

// Event listener for Save buttons

// Function to save descriptions to local storage