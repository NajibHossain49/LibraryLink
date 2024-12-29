import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const axiosSecure = useAxiosSecure();

  const categories = ["Novel", "Thriller", "History", "Sci-Fi"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      image: e.target.image.value,
      name: e.target.name.value,
      quantity: e.target.quantity.value,
      authorName: e.target.authorName.value,
      category: e.target.category.value,
      shortDescription: e.target.shortDescription.value,
      rating: e.target.rating.value,
    };

    try {
      const response = await axiosSecure.post(`/add-book`, formData);
      if (response.data.message === "Book Added") {
        toast.success("Book added successfully!");
        e.target.reset();
      }
    } catch (error) {
      toast.error("Error adding book. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Add New Book to Library
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Fill in the details below to add a new book to the collection
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left Column */}
            <div className="space-y-6">
              {/* Image URL */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Book Cover Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="https://example.com/book-cover.jpg"
                  required
                />
              </div>

              {/* Book Name */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="The Great Adventure"
                  required
                />
              </div>

              {/* Author Name */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  name="authorName"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Category */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quantity */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Quantity Available
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="1"
                  required
                  min="1" 
                />
              </div>

              {/* Rating */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="4"
                  min="1"
                  max="5"
                  required
                />
              </div>

              {/* Short Description */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Book Description
                </label>
                <textarea
                  name="shortDescription"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-32 resize-none"
                  placeholder="Enter a compelling description of the book..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button - Full Width */}
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                Add Book to Library
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-800">Preview Guide</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Your book will be added to the library catalog once you submit the
            form above. Make sure all details are accurate and the image URL is
            valid. The description should be concise yet informative to help
            readers discover your book.
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AddBook;
