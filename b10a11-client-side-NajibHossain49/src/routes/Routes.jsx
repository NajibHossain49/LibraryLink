import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import BorrowedBooks from "../pages/BorrowedBooks";
import PrivateRoute from "./PrivateRoute";
import UpdateBookPage from "../pages/UpdateBookPage";
import BookCategories from "../components/BookCategories";
import CategoryBooksPage from "../components/CategoryBooksPage";
import BookDetailsPage from "../components/BookDetailsPage";

// Create a router object
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/All-Books",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBookPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/Add-Book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/Borrowed-Books",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/book-details/:id",
        element: (
          <PrivateRoute>
            <BookDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
      // Add Book Categories route
      {
        path: "/categories",
        element: <BookCategories />,
      },
      // Add Category Books page route (dynamically based on the category)
      {
        path: "/categories/:category", // Dynamic route for category
        element: <CategoryBooksPage />,
      },
    ],
  },
  // Catch-all route for unmatched paths
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
