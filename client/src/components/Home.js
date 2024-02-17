import { Typography } from "@mui/material";
import { useRef, useEffect } from "react";
export default function Home(){

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <Typography variant="h4" style={{ textAlign: 'center', margin:'1em',marginBottom: '1em' }}>Tech-Powered Blogging: Where Ideas Take Flight!</Typography>
            <div style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
               <img src="static/blog.png"></img>
            </div>
        </div>
    )
}
