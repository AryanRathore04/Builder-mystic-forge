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
  ChevronRight,
  Quote,
  MapPin,
  Users,
  Award,
  Clock,
  ArrowRight,
  Leaf,
} from "lucide-react";

const categories = [
  { id: "hair", icon: <Scissors className="h-5 w-5" />, label: "Hair Care" },
  { id: "spa", icon: <Flower2 className="h-5 w-5" />, label: "Spa & Wellness" },
  { id: "massage", icon: <Hand className="h-5 w-5" />, label: "Massage" },
  { id: "makeup", icon: <Palette className="h-5 w-5" />, label: "Beauty" },
];

const featuredServices = [
  {
    id: "1",
    name: "Serenity Wellness Spa",
    image: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 186,
    location: "Connaught Place, Delhi",
    services: ["Deep Tissue Massage", "Hot Stone Therapy", "Aromatherapy"],
    priceRange: "₹₹₹",
    isOpen: true,
  },
  {
    id: "2",
    name: "Zen Beauty Lounge",
    image: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 234,
    location: "Bandra West, Mumbai",
    services: ["Facial Treatment", "Hair Spa", "Manicure & Pedicure"],
    priceRange: "₹₹₹₹",
    isOpen: true,
  },
  {
    id: "3",
    name: "Natural Glow Studio",
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 156,
    location: "Koramangala, Bangalore",
    services: ["Organic Facial", "Natural Hair Care", "Wellness Therapy"],
    priceRange: "₹₹",
    isOpen: true,
  },
];

const testimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 5,
    text: "The most relaxing spa experience I've ever had. The therapists are incredibly skilled and the atmosphere is so peaceful.",
    treatment: "Deep Tissue Massage",
    location: "Mumbai",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    rating: 5,
    text: "Professional service and excellent facilities. I feel completely rejuvenated after every visit.",
    treatment: "Wellness Package",
    location: "Delhi",
  },
  {
    id: "3",
    name: "Anita Patel",
    rating: 5,
    text: "BeautyBook helped me find the perfect salon. The booking process was seamless and the service was outstanding.",
    treatment: "Hair & Beauty",
    location: "Bangalore",
  },
];

const stats = [
  {
    icon: <Users className="h-5 w-5" />,
    label: "Satisfied Clients",
    value: "25K+",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Partner Venues",
    value: "500+",
  },
  {
    icon: <Award className="h-5 w-5" />,
    label: "Cities Covered",
    value: "15+",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "Treatments/Month",
    value: "5K+",
  },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("spa");

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-spa-stone/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-light text-spa-charcoal tracking-wide">
                BeautyBook
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="/services"
                className="text-sm text-spa-charcoal/70 hover:text-primary transition-colors"
              >
                Services
              </a>
              <a
                href="/salons"
                className="text-sm text-spa-charcoal/70 hover:text-primary transition-colors"
              >
                Find Venues
              </a>
              <a
                href="/membership"
                className="text-sm text-spa-charcoal/70 hover:text-primary transition-colors"
              >
                Membership
              </a>
              <a
                href="/about"
                className="text-sm text-spa-charcoal/70 hover:text-primary transition-colors"
              >
                About
              </a>
              <Button variant="ghost" size="sm" className="text-sm">
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-primary text-white hover:bg-spa-sage text-sm px-6 rounded-full"
              >
                Become a Partner
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-spa-charcoal mb-8 leading-tight">
            Rejuvenate Your Mind,
            <br />
            <span className="text-spa-sage">Body, and Spirit</span>
          </h1>
          <p className="text-lg text-spa-charcoal/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Discover exceptional wellness experiences at premium salons and
            spas. Book treatments from certified professionals who care about
            your well-being.
          </p>

          <SearchBar className="max-w-3xl mx-auto mb-16" />

          <div className="flex justify-center mb-8">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-spa-sage px-8 py-3 rounded-full text-sm font-medium"
            >
              Explore Treatments
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-spa-charcoal mb-4">
              Discover Our Services
            </h2>
            <p className="text-spa-charcoal/60 font-light">
              Choose from our curated selection of wellness treatments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
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

      {/* Stats */}
      <section className="py-16 bg-spa-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white rounded-full sophisticated-shadow">
                    <div className="text-primary">{stat.icon}</div>
                  </div>
                </div>
                <div className="text-2xl font-light text-spa-charcoal mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-spa-charcoal/60 font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-light text-spa-charcoal mb-2">
                Premium Wellness Venues
              </h2>
              <p className="text-spa-charcoal/60 font-light">
                Handpicked locations for the ultimate relaxation experience
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-primary hover:text-spa-sage"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-spa-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-spa-charcoal mb-4">
              Client Experiences
            </h2>
            <p className="text-spa-charcoal/60 font-light">
              Stories from our wellness community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg p-8 sophisticated-shadow"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-spa-lime text-spa-lime"
                    />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-spa-stone mb-4" />
                <p className="text-spa-charcoal/80 font-light leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-spa-stone pt-6">
                  <div className="font-medium text-spa-charcoal text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-spa-charcoal/60 font-light mt-1">
                    {testimonial.treatment} • {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Begin Your Wellness Journey
          </h2>
          <p className="text-xl font-light mb-8 text-white/90">
            Join thousands who trust BeautyBook for their wellness needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-full font-medium"
            >
              Book Your Treatment
            </Button>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full font-medium"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-spa-charcoal text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-light tracking-wide">
                  BeautyBook
                </span>
              </div>
              <p className="text-white/70 font-light leading-relaxed max-w-md">
                Your trusted companion for discovering exceptional wellness
                experiences. We connect you with premium salons and spas that
                prioritize your well-being.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-6 text-sm tracking-wide">
                Services
              </h3>
              <ul className="space-y-3 text-white/70 font-light text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Spa & Wellness
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Hair Care
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Massage Therapy
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Beauty Treatments
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-6 text-sm tracking-wide">
                Company
              </h3>
              <ul className="space-y-3 text-white/70 font-light text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Partner Program
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Careers
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/60 font-light text-sm">
              © 2024 BeautyBook. All rights reserved. Made with care for your
              wellness journey.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
