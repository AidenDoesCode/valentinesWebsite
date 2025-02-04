

//function displaying the contents for the first no clicked
function firstYesClick()
{
    let elements = document.getElementsByClassName("firstYesClickedHidden")
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "block";
    }
}

function firstNoClick()
{
    
}

//function displaying the content for secondNoClicked
function secondNoClicked()
{
    let elements = document.getElementsByClassName("secondNoClickedHidden")
    for (let i = 0; i < elements.length; i++)
    {
        elements[i].style.display = "block";
    }
}

//function displaying the content for thirdYesClicked
function thirdYesClicked()
{
    let elements = document.getElementsByClassName("thirdYesClickedHidden")
    for (let i = 0; i < elements.length; i++)
    {
        elements[i].style.display = "block";
    }
}


let clickData = []; //array for the data when clicked

//function for when one of the choices are clicked
function generateText(event)
{
    // Get the clicked button's parent container
    const container = event.target.closest('.container');
    // Find the output paragraph inside this container
    const outputElement = container.querySelector('.output');
    //Get the text from buttons data attribute
    const text = event.target.getAttribute('data-text');
    // Update the output text
    outputElement.innerText = text;

    // Store data in the array
    const timestamp = new Date().toLocaleTimeString();
    clickData.push({ text: text, timestamp: timestamp });


    // Print the data to console
    console.log("Button clicked:", text);
    console.log("Updated clickData array:", clickData);
    clickData.forEach((entry, index) => {
    console.log(`Entry ${index + 1}:`, entry);

    });

    sendDataToServer();

}

function sendDataToServer() {
    fetch('http://localhost:3000/save-clicks', { // Send data to your local server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clickData)
    })
    .then(response => response.json())
    .then(data => console.log("Data saved on server:", data))
    .catch(error => console.error("Error sending data:", error));
}
