

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

// Frontend
let clickData = [];

function generateText(event) {
    const button = event.target;
    const container = button.closest('.container');
    const outputElement = container.querySelector('.output');
    const text = button.getAttribute('data-text');
    outputElement.innerText = text;

    const timestamp = new Date().toLocaleTimeString();

    clickData.push({ text: text, timestamp: timestamp }); // Add to clickData *before* sending
    sendDataToServer();
}

async function sendDataToServer() {
    try {
        const response = await fetch('https://click-tracker-server.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clickData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Server error: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const result = await response.json();
        console.log('Data sent successfully:', result);
        clickData = result.allData || []; // Update frontend clickData
        console.log("Frontend clickData after server update:", clickData);

    } catch (error) {
        console.error('Error sending data:', error);
        alert("There was an error saving your progress. Please try again later.");
    }
}

const choiceButtons = document.querySelectorAll('.choice-button');
choiceButtons.forEach(button => {
    button.addEventListener('click', generateText);
});

const submitButton = document.getElementById('submitButton'); // If you have a submit button
if (submitButton) {
    submitButton.addEventListener('click', sendDataToServer);
}