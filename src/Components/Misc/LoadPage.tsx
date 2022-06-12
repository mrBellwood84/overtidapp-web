import { Box, CircularProgress, Typography } from "@mui/material"
import { display } from "@mui/system"

/** full page for loading for suspence or other situations */
export const LoadPage = () => {

    
    return <Box sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: "#ddd",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"

    }}>

        <Typography variant="h4" component="div">
            App loading...
        </Typography>

        <CircularProgress 
            size={100} 
            thickness={3}
            sx={{
                mt:3, mb: 3,
                color: "#555",
            }} />

        <Typography variant="h5" component="div">
            Please wait a few seconds
        </Typography>
    </Box>


}