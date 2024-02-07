import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CircularProgress, Typography } from '@mui/material';
import { marked } from 'marked';
export default function BlogDetail() {
    const { blogid } = useParams();
    const { user } = useAuthContext();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("Blog ID:", blogid);
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                if (!user || !user.token || !blogid) {
                    throw new Error('Blog ID is missing');
                }

                const response = await fetch(`http://localhost:2000/api/blogs/${blogid}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch blog: ${response.status}`);
                }

                const data = await response.json();
                setBlog(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [blogid, user]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {blog ? (
                <div>
                    <Typography variant="h4" style={{margin:'0.5em',alignItems:'center',flexDirection:'column'}}>Title: {blog.title}</Typography>
                    <Typography variant="body1" color="text.secondary" style={{ flex: 1, overflow: 'hidden' }}>                                 
                                <div dangerouslySetInnerHTML={{ __html: marked(blog.content)}}></div>
                                </Typography>
                    
                </div>
            ) : (
                <p>No blog found</p>
            )}
        </div>
    );
}
