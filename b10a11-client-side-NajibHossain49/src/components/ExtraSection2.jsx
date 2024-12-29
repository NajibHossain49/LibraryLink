import React from "react";
import { Sparkles, BookMarked, GraduationCap, Award } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <div className={`relative overflow-hidden rounded-2xl p-8 ${gradient} group`}>
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    <Icon className="w-8 h-8 text-white mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/80">{description}</p>
  </div>
);

const FeatureSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "New Arrivals Weekly",
      description: "Stay current with our constantly updated collection of latest releases",
      gradient: "bg-gradient-to-br from-purple-600 to-blue-500"
    },
    {
      icon: BookMarked,
      title: "Digital Library Access",
      description: "Access thousands of e-books and audiobooks from anywhere",
      gradient: "bg-gradient-to-br from-pink-600 to-rose-500"
    },
    {
      icon: GraduationCap,
      title: "Learning Resources",
      description: "Exclusive access to premium educational content and courses",
      gradient: "bg-gradient-to-br from-emerald-600 to-teal-500"
    },
    {
      icon: Award,
      title: "Member Benefits",
      description: "Enjoy special perks and early access to new features",
      gradient: "bg-gradient-to-br from-amber-500 to-orange-600"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-600 mb-4">
            Discover Our Features
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;