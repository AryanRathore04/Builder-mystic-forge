import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { CategoryButton } from "@/components/ui/category-button";
import { ServiceCard } from "@/components/ui/service-card";
import { Badge } from "@/components/ui/badge";
import {
  Scissors,
  Flower2,
  Hand,
  Palette,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  MapPin,
  Users,
  Award,
  Clock,
} from "lucide-react";

const categories = [
  { id: "hair", icon: <Scissors className="h-6 w-6" />, label: "Hair" },
  { id: "spa", icon: <Flower2 className="h-6 w-6" />, label: "Spa" },
  { id: "massage", icon: <Hand className="h-6 w-6" />, label: "Massage" },
  { id: "makeup", icon: <Palette className="h-6 w-6" />, label: "Makeup" },
];

const trendingSalons = [
  {
    id: "1",
    name: "Bliss Beauty Lounge",
    image: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 245,
    location: "Connaught Place, Delhi",
    services: ["Hair Spa", "Facial", "Manicure", "Pedicure"],
    priceRange: "₹₹₹",
    isOpen: true,
  },
  {
    id: "2",
    name: "Serenity Spa & Wellness",
    image: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 189,
    location: "Bandra West, Mumbai",
    services: ["Full Body Massage", "Thai Spa", "Aromatherapy"],
    priceRange: "₹₹₹₹",
    isOpen: true,
  },
  {
    id: "3",
    name: "Glamour Studio",
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 312,
    location: "Koramangala, Bangalore",
    services: ["Bridal Makeup", "Hair Styling", "Nail Art"],
    priceRange: "₹₹",
    isOpen: false,
  },
];

const reviews = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 5,
    text: "Amazing experience! The staff was so professional and the facial left my skin glowing.",
    service: "Facial Treatment",
    salon: "Bliss Beauty Lounge",
  },
  {
    id: "2",
    name: "Rohit Kumar",
    rating: 5,
    text: "Best massage I've ever had. The ambiance was perfect and very relaxing.",
    service: "Deep Tissue Massage",
    salon: "Serenity Spa",
  },
  {
    id: "3",
    name: "Anita Patel",
    rating: 4,
    text: "Great makeup artist! My bridal look was exactly what I wanted.",
    service: "Bridal Makeup",
    salon: "Glamour Studio",
  },
];

const stats = [
  {
    icon: <Users className="h-6 w-6" />,
    label: "Happy Customers",
    value: "50K+",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    label: "Partner Salons",
    value: "2000+",
  },
  { icon: <Award className="h-6 w-6" />, label: "Cities", value: "25+" },
  {
    icon: <Clock className="h-6 w-6" />,
    label: "Bookings/Month",
    value: "10K+",
  },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("hair");

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Flower2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                BeautyBook
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="/salons" className="text-gray-700 hover:text-primary">
                Find Salons
              </a>
              <a href="/services" className="text-gray-700 hover:text-primary">
                Services
              </a>
              <a href="/about" className="text-gray-700 hover:text-primary">
                About
              </a>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-primary text-white">
                Join as Vendor
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Perfect Salons
            </span>
            <br />
            Near You
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Book appointments at top-rated salons and spas. Experience luxury
            treatments from certified professionals.
          </p>

          <SearchBar className="max-w-4xl mx-auto mb-16" />

          {/* Top Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                icon={category.icon}
                label={category.label}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-primary rounded-xl text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Salons */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Trending Salons
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingSalons.map((salon) => (
              <ServiceCard key={salon.id} {...salon} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              size="lg"
              variant="outline"
              className="px-8 rounded-xl border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All Salons
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-gray-300 mb-4" />
                <p className="text-gray-700 mb-4">{review.text}</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">
                    {review.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {review.service} at {review.salon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers who trust us for their beauty
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-primary text-white px-8 py-3 rounded-xl hover:opacity-90"
            >
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 rounded-xl border-primary text-primary hover:bg-primary hover:text-white"
            >
              Join as Vendor
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Flower2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">BeautyBook</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for beauty and wellness services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Hair Care</li>
                <li>Spa & Wellness</li>
                <li>Massage Therapy</li>
                <li>Makeup & Beauty</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Business</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Partner with Us</li>
                <li>Vendor Dashboard</li>
                <li>Business Solutions</li>
                <li>API Access</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BeautyBook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
