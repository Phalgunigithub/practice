import { useEffect, useState } from "react";
import React from "react";


export default function AsyncDataFetcher(){

    const [data, setdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(function(){

        async function fetchData(){

            try{
                // Start the fetch operation and wait for the response
                const response=await fetch('https://jsonplaceholder.typicode.com/posts');

                if(!response.ok){
                    throw new Error('network ')
                }
  // Parse the response data as JSON and wait for it to finish
                const data=await response.json();

                setdata(data);
                setLoading(false);


            }
            catch(error){
                setError(error);
                setLoading(false);
            }
        }

        fetchData(); // Call the async function
    },[]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h2>Fetched Data with Async/Await</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  