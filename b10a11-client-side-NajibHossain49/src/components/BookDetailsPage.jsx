import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RatingStars from "react-rating-stars-component";
import BorrowModal from "../components/BookBorrowModal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";

const BookDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axiosSecure.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Image */}
          <div className="md:w-2/5 relative group">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-full object-cover min-h-[500px]"
            />
          </div>

          {/* Right Section - Content */}
          <div className="md:w-3/5 p-8 md:p-12">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  {book.name}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">
                    {book.category}
                  </span>
                  <span className="flex items-center">
                    <RatingStars
                      count={5}
                      value={book.rating}
                      edit={false}
                      size={20}
                      activeColor="#ffd700"
                    />
                  </span>
                </div>
              </div>

              {/* Author and Details */}
              <div className="space-y-6 flex-grow">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">By</span>
                  <span className="font-semibold text-indigo-600">{book.authorName}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {book.shortDescription}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Available:</span>
                    <span className={`font-bold ${book.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {book.quantity} copies
                    </span>
                  </div>
                </div>
              </div>

              {/* Borrow Button */}
              <div className="mt-8">
                <button
                  onClick={() => setModalOpen(true)}
                  disabled={book.quantity <= 0}
                  className={`w-full py-4 rounded-lg text-center font-semibold transition-all duration-300 ${
                    book.quantity <= 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 transform hover:-translate-y-1 hover:shadow-lg"
                  }`}
                >
                  {book.quantity > 0 ? "Borrow Now" : "Currently Unavailable"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      <BorrowModal
        book={book}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default BookDetailsPage;