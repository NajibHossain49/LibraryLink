import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Define route-to-title mapping
    const routeTitles = {
      "/": "Home - Book Library",
      "/All-Books": "All Books - Book Library",
      "/Add-Book": "Add a New Book - Book Library",
      "/Borrowed-Books": "Borrowed Books - Book Library",
      "/login": "Login - Book Library",
      "/registration": "Register - Book Library",
      "/categories": "Categories - Book Library",
    };

    // Dynamic title for routes with parameters
    if (location.pathname.startsWith("/book-details")) {
      document.title = "Book Details - Book Library";
    } else if (location.pathname.startsWith("/categories/")) {
      const category = location.pathname.split("/").pop();
      document.title = `${decodeURIComponent(category)} Books - Book Library`;
    } else if (location.pathname.startsWith("/update-book")) {
      document.title = "Update Book - Book Library";
    } else {
      // Default title or match specific routes
      document.title = routeTitles[location.pathname] || "Book Library";
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet /> {/* Dynamic content will be rendered here */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
