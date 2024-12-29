import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      setError("");
      setLoading(true);
      setBorrowedBooks([]);

      if (!user?.email) {
        setError("User email not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosSecure.get(`/books/borrowed/${user.email}`);
        const data = response.data;

        if (data.error) {
          setError(data.error);
        } else {
          const filteredBooks = data
            .map((book) => {
              const filteredBorrowedBy = book.borrowedBy.filter(
                (borrower) => borrower.userEmail === user.email
              );
              if (filteredBorrowedBy.length > 0) {
                return { ...book, borrowedBy: filteredBorrowedBy };
              }
              return null;
            })
            .filter(Boolean);

          if (filteredBooks.length === 0) {
            setError("You have not borrowed any books.");
          } else {
            setBorrowedBooks(filteredBooks);
          }
        }
      } catch (err) {
        // setError("You have not borrowed any books yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, [user]);

  const returnBook = async (bookId, borrower) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/books/return/${bookId}`,
        { userEmail: borrower.userEmail }
      );

      if (response.status === 200) {
        setBorrowedBooks((prevBooks) =>
          prevBooks
            .map((book) => {
              if (book._id === bookId) {
                const updatedBorrowedBy = book.borrowedBy.filter(
                  (b) => b.userEmail !== borrower.userEmail
                );
                if (updatedBorrowedBy.length === 0) {
                  return null;
                }
                return { ...book, borrowedBy: updatedBorrowedBy };
              }
              return book;
            })
            .filter(Boolean)
        );
        toast.success('Book returned successfully!');
      } else {
        setError(response.data.error || "Failed to return the book.");
        toast.error('Failed to return the book');
      }
    } catch (err) {
      setError("Error returning the book. Please try again.");
      toast.error('Error returning the book');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8 text-center">
          My Library Collection
        </h1>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {borrowedBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-64">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {book.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    <span className="font-medium">Author:</span> {book.authorName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Category:</span> {book.category}
                  </p>
                </div>

                {book.borrowedBy.map((borrower, index) => (
                  <div key={index} className="border-t pt-4 mt-4">
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Borrowed:</span>{" "}
                        {borrower.borrowedAt}
                      </p>
                      <p>
                        <span className="font-medium">Return by:</span>{" "}
                        {borrower.returnDate}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => returnBook(book._id, borrower)}
                      className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium transform transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Return Book
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!loading && borrowedBooks.length === 0 && !error && (
          <div className="text-center text-gray-600 py-12">
            <p className="text-xl">You have not borrowed any books yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;