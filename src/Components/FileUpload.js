import { useState } from "react";
import React from "react";

export default function FileUpload(){

    const [selectFile, setselectFile] = useState(null);

    const [fileList, setfileList] = useState([]);

    function handleFileChange(event){//called when the user selects a file from their file system.
        setselectFile(event.target.files[0]);//etrieves the first file from the list of files selected by the user (since input can allow multiple files to be selected, but we only handle the first one here).


    }


    async function handleUpload(){

        if(!selectFile)
            return;

        var formData= new FormData();
        formData.append('file',selectFile);

        try{
            const response= await fetch('http://localhost:3000/upload',{
                method: 'POST',
                body: formData,
            });

            if(response.ok){

                const uploadedFile=await response.json();

                
                setfileList(function(prevList){
                    return prevList.concat(uploadedFile);
                });

                setselectFile(null);
                
            }
            else {
                console.error('Upload failed');
            }
        }
            catch (error) {
                console.error('Error uploading file:', error);
            }


           
        
    }


    return (
        <div>
            <h2>file upload</h2>
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleUpload}>Upload</button>

            <h3>uploaded files</h3>
            <ul>
                {fileList.map(function(file,index){
                    return <li key={index}>{file.name}</li>
                })}
            </ul>
        </div>
    )


}