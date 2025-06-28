import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/service-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  Search,
  MapPin,
  SlidersHorizontal,
  Flower2,
  ChevronDown,
  Star,
} from "lucide-react";

const salons = [
  {
    id: "1",
    name: "Bliss Beauty Lounge",
    image: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 245,
    location: "Connaught Place, Delhi",
    services: ["Hair Spa", "Facial", "Manicure", "Pedicure", "Threading"],
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
    services: ["Full Body Massage", "Thai Spa", "Aromatherapy", "Hot Stone"],
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
    services: ["Bridal Makeup", "Hair Styling", "Nail Art", "Extensions"],
    priceRange: "₹₹",
    isOpen: false,
  },
  {
    id: "4",
    name: "Zen Massage Center",
    image: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 156,
    location: "Cyber City, Gurgaon",
    services: ["Deep Tissue", "Swedish", "Reflexology", "Couples Massage"],
    priceRange: "₹₹₹",
    isOpen: true,
  },
  {
    id: "5",
    name: "Elite Hair Studio",
    image: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 278,
    location: "Jubilee Hills, Hyderabad",
    services: ["Hair Cut", "Coloring", "Keratin", "Hair Spa"],
    priceRange: "₹₹₹₹",
    isOpen: true,
  },
  {
    id: "6",
    name: "Royal Beauty Palace",
    image: "/placeholder.svg",
    rating: 4.5,
    reviewCount: 203,
    location: "Park Street, Kolkata",
    services: ["Facial", "Cleanup", "Bleach", "Waxing"],
    priceRange: "₹₹",
    isOpen: true,
  },
];

const filters = {
  location: [
    "All Locations",
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Gurgaon",
    "Hyderabad",
    "Kolkata",
  ],
  serviceType: [
    "All Services",
    "Hair Care",
    "Spa & Massage",
    "Facial & Skincare",
    "Makeup & Beauty",
    "Nail Care",
  ],
  priceRange: ["All Prices", "₹", "₹₹", "₹₹₹", "₹₹₹₹"],
  rating: ["All Ratings", "4.5+ Stars", "4.0+ Stars", "3.5+ Stars"],
};

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "rating", label: "Rating" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "distance", label: "Distance" },
];

export default function VendorListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-beauty-pink/20 to-beauty-lavender/20">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
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
              <a href="/" className="text-gray-700 hover:text-primary">
                Home
              </a>
              <a href="/salons" className="text-primary font-medium">
                Find Salons
              </a>
              <a href="/services" className="text-gray-700 hover:text-primary">
                Services
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Find Salons & Spas
          </h1>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search salons, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl bg-white/80 backdrop-blur-sm border-gray-200"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
              <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 card-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Select
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filters.location.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type
                  </label>
                  <Select
                    value={selectedService}
                    onValueChange={setSelectedService}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filters.serviceType.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <Select
                    value={selectedPrice}
                    onValueChange={setSelectedPrice}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filters.priceRange.map((price) => (
                        <SelectItem key={price} value={price}>
                          {price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <Select
                    value={selectedRating}
                    onValueChange={setSelectedRating}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filters.rating.map((rating) => (
                        <SelectItem key={rating} value={rating}>
                          {rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Sort and Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-medium">{salons.length}</span>{" "}
              salons
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedLocation !== "All Locations" && (
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-primary/10 text-primary"
            >
              <MapPin className="h-3 w-3 mr-1" />
              {selectedLocation}
            </Badge>
          )}
          {selectedService !== "All Services" && (
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-primary/10 text-primary"
            >
              {selectedService}
            </Badge>
          )}
          {selectedPrice !== "All Prices" && (
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-primary/10 text-primary"
            >
              {selectedPrice}
            </Badge>
          )}
          {selectedRating !== "All Ratings" && (
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-primary/10 text-primary"
            >
              <Star className="h-3 w-3 mr-1" />
              {selectedRating}
            </Badge>
          )}
        </div>

        {/* Salon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salons.map((salon) => (
            <ServiceCard key={salon.id} {...salon} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="px-8 rounded-xl border-primary text-primary hover:bg-primary hover:text-white"
          >
            Load More Salons
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 md:hidden">
        <div className="flex justify-around py-2">
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
            <div className="h-6 w-6 mb-1 bg-gray-300 rounded"></div>
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
            <div className="h-6 w-6 mb-1 bg-primary rounded"></div>
            <span className="text-xs text-primary">Explore</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
            <div className="h-6 w-6 mb-1 bg-gray-300 rounded"></div>
            <span className="text-xs">Bookings</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
            <div className="h-6 w-6 mb-1 bg-gray-300 rounded"></div>
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
