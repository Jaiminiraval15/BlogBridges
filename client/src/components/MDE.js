import  { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {marked} from 'marked';
import { Button, Typography } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

export default function MDE() {
    const { user } = useAuthContext();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [blogs, setBlogs] = useState([]);
    const handleCreateBlog = async () => {
        try {
            const response = await fetch('http://localhost:2000/api/blogs/addblog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ title: title, content: content })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("New blog added:", data);
           setBlogs(prevBlogs => [...prevBlogs, data]);
            setTitle("");
            setContent("");
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
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: '1em', margin: '1em' }}
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
            <Button onClick={handleCreateBlog} variant="contained" color="primary">Add</Button>
        </div>
    );
}
