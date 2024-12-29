import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import RatingStars from "react-rating-stars-component";
import LoadingSpinner from "./LoadingSpinner";
import { Book, Library } from "lucide-react";

const CategoryBooksPage = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/category/${category}`
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="relative mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Library className="relative w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 capitalize text-center">
            {category} Books
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg">
                  <Book className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {book.name}
                  </h2>
                </div>

                <div className="space-y-3">
                  <p className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                      {book.authorName}
                    </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                      {book.category}
                    </span>
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-green-50 text-green-700">
                      {book.quantity} in stock
                    </span>
                    <div className="flex items-center">
                      <RatingStars
                        count={5}
                        value={book.rating}
                        edit={false}
                        size={20}
                        activeColor="#fbbf24"
                      />
                    </div>
                  </div>
                </div>

                <Link
                  to={`/book-details/${book._id}`}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBooksPage;