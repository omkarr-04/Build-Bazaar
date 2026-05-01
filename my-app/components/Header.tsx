"use client";

import "./Header.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toggleChat } = useChat();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <header className="header">
      <div className="header-container">
        {/* LEFT */}
        <h1 className="logo" onClick={() => router.push("/")}>
          Build Bazaar
        </h1>
        {/* CENTER NAV */}
        <nav className="nav">
          <button onClick={() => router.push("/")}>Home</button>
          <button onClick={() => router.push("/shop")}>Shop</button>
          <button onClick={() => router.push("/about")}>About</button>
          <button onClick={() => router.push("/blogs")}>Blogs</button>
          <button onClick={() => router.push("/build")}>Build</button>
        </nav>
        {/* RIGHT */}
        <div className="header-right">
          <SearchBar />
          {user && (
            <button
              className="chat-btn"
              onClick={toggleChat}
              title="PC Build Assistant"
              aria-label="Open chat"
            >
              <svg
                className="chat-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H8l-4 4V6c0-1.1.9-2 2-2zm2 6h12v-2H6v2zm0 3h8v-2H6v2z" />
              </svg>
            </button>
          )}
          <button
            className="profile-btn"
            onClick={() => router.push(user ? "/profile" : "/login")}
            title={user ? "Profile" : "Login"}
          >
            👤
          </button>
          {user && (
            <button
              className="logout-anim-btn"
              onClick={logout}
              aria-label="Logout"
            >
              <span className="logout-sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
              </span>
              <span className="logout-text">Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
