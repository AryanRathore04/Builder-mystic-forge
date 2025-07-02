import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { CategoryButton } from "@/components/ui/category-button";
import { ServiceCard } from "@/components/ui/service-card";
import { Badge } from "@/components/ui/badge";
import { PageLoading } from "@/components/ui/loading";
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
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&crop=center",
    rating: 4.9,
    reviewCount: 186,
    location: "Connaught Place, Delhi",
    services: ["Deep Tissue Massage", "Hot Stone Therapy", "Aromatherapy"],
    priceRange: "���₹₹",
    isOpen: true,
  },
  {
    id: "2",
    name: "Zen Beauty Lounge",
    image:
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop&crop=center",
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
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => (window.location.href = "/")}
            >
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-heading text-foreground tracking-wide">
                BeautyBook
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="/salons"
                className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
              >
                Services
              </a>
              <a
                href="/salons"
                className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
              >
                Find Venues
              </a>
              <a
                href="/membership"
                className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
              >
                Membership
              </a>
              <a
                href="/about"
                className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-body"
                onClick={() => (window.location.href = "/signin")}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-secondary text-sm px-6 rounded-full font-heading"
                onClick={() => (window.location.href = "/signup?type=vendor")}
              >
                Become a Partner
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-olive-900/60 via-olive-800/30 to-olive-900/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center"
            alt="Simple wellness background"
            className="w-full h-full object-cover opacity-70 brightness-75 contrast-125 sepia-[0.3] hue-rotate-[15deg]"
          />
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-20 left-10 w-20 h-20 bg-olive-400/20 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-olive-600/20 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-sage-300/20 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-olive-500/20 rounded-full animate-float-slow"></div>
        </div>

        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-heading text-foreground mb-8 leading-tight animate-slide-up">
            Rejuvenate Your Mind,
            <br />
            <span className="text-secondary animate-gradient-text">
              Body, and Spirit
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto font-body leading-relaxed animate-slide-up-delay">
            Discover exceptional wellness experiences at premium salons and
            spas. Book treatments from certified professionals who care about
            your well-being.
          </p>

          <div className="animate-slide-up-delay-2">
            <SearchBar className="max-w-3xl mx-auto mb-16" />
          </div>

          <div className="flex justify-center mb-8 animate-slide-up-delay-3">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-secondary px-8 py-3 rounded-full text-sm font-heading transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => (window.location.href = "/salons")}
            >
              Explore Treatments
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading text-foreground mb-4">
              Discover Our Services
            </h2>
            <p className="text-muted-foreground font-body">
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
                onClick={() => {
                  setActiveCategory(category.id);
                  // Navigate to salons page with category filter
                  window.location.href = `/salons?category=${category.id}`;
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Elegant Transition */}
      <div className="py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-full px-8 py-4 sophisticated-shadow border border-border">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-body text-muted-foreground">
                Trusted by thousands across India
              </span>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-16 bg-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-card rounded-full sophisticated-shadow">
                    <div className="text-primary">{stat.icon}</div>
                  </div>
                </div>
                <div className="text-2xl font-heading text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Separator */}
      <div className="py-8 bg-gradient-to-r from-background via-muted/30 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary"></div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Venues */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-heading text-foreground mb-2">
                Premium Wellness Venues
              </h2>
              <p className="text-muted-foreground font-body">
                Handpicked locations for the ultimate relaxation experience
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-primary hover:text-secondary font-body"
              onClick={() => (window.location.href = "/salons")}
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div
                key={service.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Wave Separator */}
      <div className="relative py-12 bg-background overflow-hidden">
        <div className="absolute inset-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="wave-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0.1"
                />
                <stop
                  offset="50%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0.1"
                />
              </linearGradient>
            </defs>
            <path
              d="M0,60 Q300,10 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="url(#wave-gradient)"
            />
          </svg>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-body text-muted-foreground">
                Trusted Community
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-body text-muted-foreground">
                Premium Quality
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-body text-muted-foreground">
                Excellence Guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading text-foreground mb-4">
              Client Experiences
            </h2>
            <p className="text-muted-foreground font-body">
              Stories from our wellness community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-card rounded-lg p-8 sophisticated-shadow transform transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-body leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border pt-6">
                  <div className="font-heading text-foreground text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground font-body mt-1">
                    {testimonial.treatment} • {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=600&fit=crop&crop=center"
            alt="Wellness background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>

        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float-medium"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-heading mb-6 animate-slide-up text-primary-foreground">
            Begin Your Wellness Journey
          </h2>
          <p className="text-xl font-body mb-8 text-primary-foreground/90 animate-slide-up-delay">
            Join thousands who trust BeautyBook for their wellness needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full font-heading transition-all duration-300 hover:scale-105"
              onClick={() => (window.location.href = "/salons")}
            >
              Book Your Treatment
            </Button>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full font-heading transition-all duration-300 hover:scale-105"
              onClick={() => (window.location.href = "/signup?type=vendor")}
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-heading tracking-wide">
                  BeautyBook
                </span>
              </div>
              <p className="text-primary-foreground/70 font-body leading-relaxed max-w-md">
                Your trusted companion for discovering exceptional wellness
                experiences. We connect you with premium salons and spas that
                prioritize your well-being.
              </p>
            </div>
            <div>
              <h3 className="font-heading mb-6 text-sm tracking-wide">
                Services
              </h3>
              <ul className="space-y-3 text-primary-foreground/70 font-body text-sm">
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  Spa & Wellness
                </li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  Hair Care
                </li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  Massage Therapy
                </li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  Beauty Treatments
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading mb-6 text-sm tracking-wide">
                Company
              </h3>
              <ul className="space-y-3 text-primary-foreground/70 font-body text-sm">
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  About Us
                </li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  Partner Program
                </li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  Careers
                </li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-8 text-center">
            <p className="text-primary-foreground/60 font-body text-sm">
              © 2024 BeautyBook. All rights reserved. Made with care for your
              wellness journey.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
