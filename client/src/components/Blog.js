import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Grid } from "@mui/material"

export default function Blog() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
  
    useEffect(() => {
        if (user) {
            fetchData();
        }
        else {
            navigate('/login')
        }
    }, [user])
    const fetchData = async () => {
        try {
            if (user && user.token) {
                const res = fetch('http://localhost:2000/api/routes/blog', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                })
                const data = await res.json();
                setBlogs(data);

                if (!res.ok) {
                    throw new Error("Error fetching blogs");

                }
            }

        } catch (error) {
            console.log(error);
        }
    }
    const openMDE = () => {
        navigate('/mde')
    }
    
   
    return (<>
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                
                    <Button variant="contained" color="primary" onClick={openMDE}
                    style={{ float: 'right', marginTop: '1em' }}>Create Blog</Button>
                </Grid>
                {Array.isArray(blogs) && blogs.length === 0 && <h1>No blogs </h1>}
                {blogs.map((blog =>
                (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={blogs._id}>
                        <Card >
                            <Card.Body>
                                <Card.Title>{blog.title}</Card.Title>
                                <Card.Text>
                                    {blog.content}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Grid>
                )

                )

                )
                }
            </Grid>
         
        </Container>
    </>)
}