import { useState } from "react"
import React from "react"

export default function DataPoster(){
   const [title, settitle] = useState('');
   const [body, setbody] = useState('');
   const [responseMessage, setresponseMessage] = useState('');
    //response message to display after submitting data.


    async function handleSubmit(event){

        event.preventDefault();//Prevents the default form submission behavior, which would otherwise refresh the page.

        // Make a POST request to the API
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',

            },

            body:JSON.stringify({title,body}),

        });

        const data = await response.json();

            setresponseMessage('Data posted successfully!'); // Update response message
            settitle(''); // Clear the title input field
            setbody(''); // Clear the body input field
        }


        catch (error) {
            setresponseMessage(`Error: ${error.message}`);
          }
        }

    return(
        <div>
            <h2>Post New Data</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                    Title:
                    <input type="text" value={title} onChange={function(e){settitle(e.target.value);}}></input>
                    </label>
                </div>


                <div>
          <label>
            Body:
            <textarea
              value={body} // Bind the textarea value to the body state
              onChange={function(e) { setbody(e.target.value); }} // Update the body state on input change
            />
          </label>
        </div>
        <button type="submit">Submit</button> {/* Button to submit the form */}
    

            </form>


            {responseMessage && <p>{responseMessage}</p>} {/* Display the response message if it exists */}

        </div>
    );


}