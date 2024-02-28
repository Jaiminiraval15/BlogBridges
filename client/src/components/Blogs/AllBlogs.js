import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Typography, Button, Card, CardContent, CardActions, Grid, Container } from '@mui/material';
import { marked } from 'marked';
import { useAuthContext } from '../../hooks/useAuthContext';
export default function AllBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const { user } = useAuthContext();
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("http://localhost:2000/api/blogs/allblogs",{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                        
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }

                const data = await response.json();
                setBlogs(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
        fetchUsers();
    }, []);
    const fetchUsers= async () => {
        try {
            const response = await fetch(`http://localhost:2000/api/user/allusers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();

                setUsername(userData.username);
            
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };
    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        } else {
            return content;
        }
    };
    return (
     
        <section className="section">
        <div className="container">
            <div className="row">
                {loading ? (
                    <CircularProgress />
                ) : (
                    blogs.map(blog => (
                        <div className="col-lg-4 mb-4" key={blog._id}>
                            <div className="post-entry-alt">
                                <div className="excerpt">
                                    <h2><a href="single.html">{blog.title}</a></h2>
                                    <div className="post-meta align-items-center text-left clearfix">
                                        
                                     
                                    </div>
                                    <p>{truncateContent(blog.content, 60)}</p>
                                    <p><Link to={`/blog/${blog._id}`} className="read-more">Continue Reading</Link></p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </section>
    );
};

