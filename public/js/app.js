console.log('client side javascript file has loaded')

//const to store javascript representation of the form tag in html 
const weatherForm = document.querySelector('form')

//const to store the input received from the search form 
const search = document.querySelector('input')

//targeting paragraph with id=message-1 in index.hbs 
const messageOne = document.querySelector('#message-1')

//targeting paragraph with id=message-2 in index.hbs
const messageTwo = document.querySelector('#message-2')

//adding an event listener to gather info submitted via the search form from the webpage
weatherForm.addEventListener('submit', (e) => {
    messageTwo.textContent = ''
    e.preventDefault()

    //setting the text of paragraph with id=message-1 to loading while pulling data with fetch
    messageOne.textContent = 'Loading.....'
    
    const location = search.value

    //using fetch to add location to url and fetch json data  
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    
    //if statement to catch if a user does not enter a location in the search form 
    if(location == undefined) {

        //setting the text of paragraph with id=message-1 to an error message to search for a location
        messageOne.textContent = 'Please search for a location'

    }
    else {
    
            response.json().then((data) => {
                
                //if statement to catch if the user enters an invalid location 
                if (data.error ) {

                    //setting the text of paragraph with id=message-1 to the error message pull from fetch 
                    messageOne.textContent = data.error
                    
                    }
                else {

                    //setting the text both paragraphs with id=message-1 and id=message-2 to the location and forecast 
                    messageOne.textContent = data.location
                    messageTwo.textContent= data.forecast
                }
            })
        }
    })
})