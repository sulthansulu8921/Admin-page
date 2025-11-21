"use client";

import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [logged, setLogged] = useState(false);

  const checkLogin = () => {
    const isLogged = localStorage.getItem("logged_in") === "true";
    setLogged(isLogged);
  };

  useEffect(() => {
    checkLogin();

    // Listen for login/logout changes
    window.addEventListener("login_status_changed", checkLogin);

    return () => {
      window.removeEventListener("login_status_changed", checkLogin);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("logged_in");

    // notify sidebar to update
    window.dispatchEvent(new Event("login_status_changed"));

    router.push("/login");
  };

  return (
    <aside
      style={{
        width: 240,
        height: "100vh",
        background: "#222",
        color: "white",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <Typography variant="h5">Admin Panel</Typography>

      {/* AFTER LOGIN */}
      {logged && (
        <>
          <Link href="/home">
            <Button variant="contained" fullWidth>Home</Button>
          </Link>

          <Link href="/products">
            <Button variant="contained" fullWidth>Products</Button>
          </Link>

          <Link href="/categories">
            <Button variant="contained" fullWidth>Categories</Button>
          </Link>

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={logout}
          >
            Logout
          </Button>
        </>
      )}

      {/* BEFORE LOGIN */}
      {!logged && (
        <Link href="/login">
          <Button variant="contained" color="info" fullWidth>Login</Button>
        </Link>
      )}
    </aside>
  );
}
