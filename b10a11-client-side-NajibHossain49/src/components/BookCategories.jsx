import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Skull, History as HistoryIcon, Rocket } from "lucide-react";

const categories = [
  { name: "Novel", icon: BookOpen, color: "bg-emerald-50 hover:bg-emerald-100", iconColor: "text-emerald-600" },
  { name: "Thriller", icon: Skull, color: "bg-red-50 hover:bg-red-100", iconColor: "text-red-600" },
  { name: "History", icon: HistoryIcon, color: "bg-amber-50 hover:bg-amber-100", iconColor: "text-amber-600" },
  { name: "Sci-Fi", icon: Rocket, color: "bg-blue-50 hover:bg-blue-100", iconColor: "text-blue-600" }
];

const BookCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8 text-gray-600">
        Explore Books by Category
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {categories.map(({ name, icon: Icon, color, iconColor }) => (
          <div
            key={name}
            onClick={() => handleCategoryClick(name)}
            className={`
              ${color}
              p-6 rounded-lg shadow-md 
              transform transition-all duration-300 
              hover:scale-105 hover:shadow-lg 
              cursor-pointer
            `}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className={`p-3 rounded-full ${color}`}>
                <Icon className={`w-8 h-8 ${iconColor}`} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
              <p className="text-sm text-gray-600 text-center">
                Explore our collection of {name.toLowerCase()} books
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;