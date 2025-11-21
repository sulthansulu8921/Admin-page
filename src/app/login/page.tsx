"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin" && password === "1234") {
      localStorage.setItem("logged_in", "true");
      window.dispatchEvent(new Event("login_status_changed"));
      router.push("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Paper
        elevation={6}
        style={{
          width: 360,
          padding: "40px 30px",
          borderRadius: 12,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" style={{ marginBottom: 20 }}>
          Admin Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="admin"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="1234"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              marginTop: 20,
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
