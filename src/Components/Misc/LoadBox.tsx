import { Box, CircularProgress } from "@mui/material";

export const LoadBox = () => {
    
    return (
      <Box
        sx={{
          p: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  };