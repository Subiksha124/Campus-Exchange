import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  });

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  useEffect(() => {
    const syncUser = () => {
      try {
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      } catch {
        setCurrentUser(null);
      }
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, [pathname]);

  const handleLogout = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      setOpen(false);
      queryClient.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Logout failed. Please try again.";
      setLogoutError(typeof msg === "string" ? msg : "Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">CampusExchange</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Campus Community</span>
          <span>Explore</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={
                  currentUser?.img ||
                  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                }
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options" onClick={(e) => e.stopPropagation()}>
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs" onClick={() => setOpen(false)}>
                        Gigs
                      </Link>
                      <Link className="link" to="/add" onClick={() => setOpen(false)}>
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders" onClick={() => setOpen(false)}>
                    Orders
                  </Link>
                  <Link className="link" to="/messages" onClick={() => setOpen(false)}>
                    Messages
                  </Link>
                  {logoutError && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {logoutError}
                    </span>
                  )}
                  <span
                    className="link"
                    onClick={handleLogout}
                    style={{
                      cursor: isLoggingOut ? "not-allowed" : "pointer",
                      color: isLoggingOut ? "#aaa" : "inherit",
                    }}
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link className="link" to="/login">
                <span>Sign in</span>
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;