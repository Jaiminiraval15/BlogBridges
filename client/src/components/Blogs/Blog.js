import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Grid, Typography, Container,Link } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { marked } from 'marked';
import swal from 'sweetalert';
import CircularProgress from '@mui/material/CircularProgress';
export default function Blog() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    useEffect(() => {
        if (user) {
            fetchData();
            fetchUserData();
        } else {
            navigate('/login');
        }
    }, [user]);

    const fetchData = async () => {
        try {
            if (user && user.token) {
                const response = await fetch("http://localhost:2000/api/blogs/", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                        'User-Id': user.id
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }

                const data = await response.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };
    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        } else {
            return content;
        }
    };

    const handleDelete = async (blogid) => {
        try {
            const result = await swal({
                title: 'Are you sure?',
                text: 'Once deleted, you will not be able to recover this blog!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            });

            if (result) {
                const response = await fetch(`http://localhost:2000/api/blogs/deleteblog/${blogid}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete blog');
                }

                setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogid));
                swal("Blog Deleted", "Your blog has been deleted successfully", "success");
            } 
        } catch (error) {
            swal("Error", "Failed to delete blog", "error");
            console.error('Error deleting blog:', error);
        }
    };

    const openMDE = () => {
        navigate('/mde');
    };

    const handleBlogDetail = (id) => () => {
        navigate(`/blog/${id}`);
    };
    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:2000/api/user/`, {
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

    return (
        <>
        <Button
           
            variant="outlined"
            onClick={openMDE}
            style={{ position: 'absolute', top: '6em', right: '2em' }}
        >
            Create Blog
        </Button>
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
                                        <h2><a href={`/blog/${blog._id}`}>{blog.title}</a></h2>
                                        <div className="post-meta align-items-center text-left clearfix">
                                            <span className="d-inline-block mt-1">By {username} </span>
                                            
                                        </div>
                                        <p>{truncateContent(blog.content, 60)}</p>
                                        <p><Button onClick={handleBlogDetail(blog._id)}>Continue Reading</Button></p>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(blog._id)}>Delete</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    </>
    );
}
