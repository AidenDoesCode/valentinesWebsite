

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

async function sendDataToServer() {
    try {
        const response = await fetch('https://click-tracker-server.onrender.com', { // Replace with your Render server URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clickData) // Send the clickData array
        });

        if (!response.ok) {
            const errorData = await response.json(); // Get error details from the server (if any)
            throw new Error(`Server error: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const result = await response.json();
        console.log('Data sent successfully:', result);

        // Optionally, reset the clickData array after successful submission:
        clickData = []; // Clear the array

    } catch (error) {
        console.error('Error sending data:', error);
        // Display the error to the user or handle it appropriately
        alert("There was an error saving your progress. Please try again later.")
    }
}

// Call sendDataToServer() when you want to send the data (e.g., on a button click):
document.getElementById('submitButton').addEventListener('click', sendDataToServer); // Example

// ... rest of your index.js code (including generateText and other functions)

