import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Grid, Typography, Container } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { marked } from 'marked';
import swal from 'sweetalert';

export default function Blog() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (user) {
            fetchData();
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

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={openMDE}
                        style={{ float: 'right', marginTop: '1em' }}
                    >
                        Create Blog
                    </Button>
                </Grid>
                {Array.isArray(blogs) && blogs.length === 0 && <Typography variant="h4">No blogs</Typography>}
                {blogs.map((blog => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={blog._id}>
                        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                            <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" component="div">
                                    {blog.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" style={{ flex: 1, overflow: 'hidden' }}>
                                    <div dangerouslySetInnerHTML={{ __html: marked(truncateContent(blog.content, 60)) }}></div>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" variant="contained" onClick={handleBlogDetail(blog._id)}>
                                    Read More
                                </Button>
                                <Button size="small" variant="contained" color="error" onClick={() => handleDelete(blog._id)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )))}
            </Grid>
        </Container>
    );
}
