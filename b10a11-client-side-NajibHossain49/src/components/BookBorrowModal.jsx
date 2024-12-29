import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const BookBorrowModal = ({ book, isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [returnDate, setReturnDate] = useState("");

  const handleBorrow = async () => {
    if (!returnDate) {
      toast.error("Return date is required!");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/books/borrow/${book._id}`,
        {
          userName: user.displayName,
          userEmail: user.email,
          returnDate,
        }
      );

      if (response.data.alreadyBorrowed) {
        toast.info("You have borrowed this book before!");
      } else {
        toast.success(response.data.message || "Book borrowed successfully.");
        console.log(response.data.message);
        // Delay closing the modal to allow the toast to display
        setTimeout(() => {
          onClose();
          navigate("/All-Books");
        }, 2000);
        
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error(error.response?.data?.error || "Failed to borrow book.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full max-w-md">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Borrow Book</h2>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Book and User Info Card */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 w-32">Book Name:</span>
                  <span className="font-medium text-gray-900">
                    {book?.name}
                  </span>
                </div>
                <div className="flex items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 w-32">User:</span>
                  <span className="font-medium text-gray-900">
                    {user?.displayName}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-32">Email:</span>
                  <span className="font-medium text-gray-900">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Return Date Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleBorrow}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-colors duration-200"
              >
                Borrow Book
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />
    </div>
  );
};

export default BookBorrowModal;
