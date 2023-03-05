import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box display={"flex"} justifyContent="center">
      <CircularProgress color="secondary" />
      <Typography>Loading .... </Typography>
    </Box>
  );
};

export default Loader;
