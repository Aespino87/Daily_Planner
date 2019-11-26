
/**
 * Generate rows for time
 * Each row has a time slot input field and save button
 * add event listener on save button
 * Locally store user input values
 * When button clicked save input to local storage
 * Coloring for business hours, present time, past time
 * 
 */



let currentDateTime = document.getElementById("currentDay");
let currentDay = moment().format('MMMM Do YYYY');
currentDateTime.innerHTML = currentDay;

console.log(moment());

let container = $("#container");

let timeOfDay = [
    {hourOfDay: "9 a.m.", numericHour:"09"},
    {hourOfDay:"10 a.m.", numericHour:"10"},
    {hourOfDay:"11 a.m.", numericHour:"11"},
    {hourOfDay:"12 a.m.", numericHour:"12"},
    {hourOfDay:"1 p.m.", numericHour:"13"},
    {hourOfDay:"2 p.m.", numericHour:"14"},
    {hourOfDay:"3 p.m.", numericHour:"15"},
    {hourOfDay:"4 p.m.", numericHour:"16"},
    {hourOfDay:"5 p.m.", numericHour:"17"}
];

function scheduleItems () {

    /// Removes locally stored user inputs

    let storedDate = localStorage.getItem('storedDate');
    if (storedDate == null || storedDate != currentDay) {
        localStorage.setItem('storedDate', currentDay);

        for (let i=0; i<timeOfDay.length; i++) {
            localStorage.removeItem(`saveText${i}`);
        }
    }

    for ( let i=0; i<timeOfDay.length; i++) {
        
        //Creating row
        let row = $("<div></div>")//.attr("id", i);
        row.addClass("row");

        //Creating Time
    
        let timeBox = $("<div></div>");
        timeBox.addClass("hour col-xs-2 col-sm-1 px-0 text-right p-3");
        timeBox.text(timeOfDay[i].hourOfDay);

        // Creating Save button

        let saveButton = $('<button><i class="fas fa-save"></i></button>');
        saveButton.addClass("saveBtn col-xs-2 col-sm-1 px-0 text-center pt-3 align-middle");

        //Creating User input field

        let userInputDiv = $('<div></div>');
        userInputDiv.addClass ('col-xs-8 col-sm-10 px-0 text-dark');

        let userInput = $('<textarea></textarea>');
        userInput.addClass('saveText'); 

       userInput.val(localStorage.getItem(`saveText${i}`));

       // Adds id text area for (present,future,past)
        userInput.attr('id',`saveText${i}`);

        userInputDiv.append(userInput);
        
        //Add columns to page
        
        row.append(timeBox);
        row.append(userInputDiv);
        row.append(saveButton);
        
        //Add rows to page
        container.append(row);


        //Adds new classes accoring to time
        let presentHour = moment().format("HH");

     if (timeOfDay[i].numericHour === presentHour) {
         userInputDiv.addClass('present');
     }

     else if (timeOfDay[i].numericHour > presentHour) {
         userInputDiv.addClass('future');
     }

      else if (timeOfDay[i].numericHour < presentHour) {
         userInputDiv.addClass('past');
     };

        
    }
     

    $(".saveBtn").on( "click", function() {
        console.log( $( this ) );
        $('.saveText').each(function(){
            console.log('hello');
            let id =  $(this).attr('id');
            let value = $(this).val();
            localStorage.setItem(id, value);
        });

        


      });
};


scheduleItems();







