"use client";


import { Typography } from "@mui/material";


export default function HomePage() {
  return (
    <div style={{ display: "flex"}}>
    
     
      <main style={{ flex: 1, padding: 20 }}>
        <Typography variant="h3">Dashboard</Typography>
        <Typography variant="body1" className="mt-4">
          Welcome to the Admin Panel Home Page!
        </Typography>
      </main>
    </div>
  );
}
