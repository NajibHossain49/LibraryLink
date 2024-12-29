import React from "react";
import { BookOpen, Clock, Users, Library } from "lucide-react";

const Feature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-transform hover:scale-105">
    <div className="p-3 bg-indigo-100 rounded-full mb-4">
      <Icon className="w-6 h-6 text-indigo-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const ExtraSection1 = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Vast Collection",
      description: "Access to over 100,000 books across multiple genres"
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Browse and manage your books anytime, anywhere"
    },
    {
      icon: Users,
      title: "Community",
      description: "Join reading groups and share recommendations"
    },
    {
      icon: Library,
      title: "Modern Facilities",
      description: "State-of-the-art reading spaces and resources"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-600">
          Why Choose Our Library?
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Experience the perfect blend of traditional library values and modern technology.
          Our commitment to excellence makes reading and learning accessible to everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtraSection1;