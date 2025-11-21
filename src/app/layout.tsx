
"use client";

import "./globals.css";
import Sidebar from "./components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>

        <div style={{ display: "flex" }}>
      <Sidebar/>
          <main style={{ marginLeft: 10, padding: 20, width: "100%" }}>
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
