import { Typography } from "@mui/material";

export default function Home(){
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <Typography variant="h4" style={{ textAlign: 'center', margin:'1em',marginBottom: '1em' }}>Tech-Powered Blogging: Where Ideas Take Flight!</Typography>
            <div style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
                <video controls={false} autoPlay loop muted style={{ width: '100%', height: 'auto' }}>
                    <source src="static/blog.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}
