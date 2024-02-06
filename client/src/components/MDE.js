import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Typography } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import {marked} from 'marked';
export default function MDE({ addNewBlog }) {
    const { user } = useAuthContext();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
  

    const handleCreateBlog = async () => {
        try {
            fetch('http://localhost:2000/api/routes/blog/addblog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({  title:title, content:content})
            })
            
            
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Blog Title"
                value={title}
                name="newTitle"
                onChange={(e) => setTitle(e.target.value)}
                style={{  padding: '1em',margin: '1em'}}
            />
           <div style={{ marginTop: '1em', display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <SimpleMDE
                        value={content}
                        onChange={(value) => setContent(value)}      
                    />
                </div>
                <div style={{ flex: 1, marginLeft: '1em' }}>
                    <Typography variant="h6">Preview:</Typography>
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                </div>
            </div>
            <Button onClick={handleCreateBlog} variant="contained" color="primary">Create</Button>
        </div>
          
    );
}
