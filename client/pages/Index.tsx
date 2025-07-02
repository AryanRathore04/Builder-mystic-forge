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
  CheckCircle,
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-olive-900/80 via-olive-800/60 to-sage-900/80 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&h=1080&fit=crop&crop=center"
            alt="Luxury spa wellness experience"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-olive-600/20 to-transparent animate-pulse z-15"></div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-1/4 left-[10%] w-32 h-32 bg-gradient-to-br from-sage-300/30 to-olive-400/20 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-1/3 right-[15%] w-24 h-24 bg-gradient-to-br from-olive-300/25 to-sage-400/15 rounded-full blur-lg animate-float-medium"></div>
          <div className="absolute bottom-1/3 left-[20%] w-20 h-20 bg-gradient-to-br from-olive-500/20 to-sage-300/25 rounded-full blur-md animate-float-fast"></div>
          <div className="absolute bottom-1/4 right-[10%] w-28 h-28 bg-gradient-to-br from-sage-400/20 to-olive-500/15 rounded-full blur-lg animate-float-slow"></div>

          {/* Decorative Lines */}
          <div className="absolute top-1/2 left-0 w-40 h-px bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-40 h-px bg-gradient-to-l from-transparent to-white/20 animate-pulse"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 animate-slide-up">
                <div className="w-2 h-2 bg-cta rounded-full animate-pulse"></div>
                <span className="text-white/90 font-body text-sm">
                  Trusted by 25,000+ customers
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6 animate-slide-up">
                <h1 className="text-6xl md:text-8xl font-heading text-white leading-none">
                  Your
                  <span className="block text-transparent bg-gradient-to-r from-sage-200 to-olive-200 bg-clip-text animate-gradient-text">
                    Wellness
                  </span>
                  <span className="block">Journey</span>
                  <span className="block text-cta">Begins Here</span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-xl text-white/80 font-body leading-relaxed max-w-lg animate-slide-up-delay">
                Discover premium wellness experiences at handpicked salons and
                spas. Book treatments from certified professionals who
                prioritize your well-being.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-delay-2">
                <Button
                  size="lg"
                  className="bg-cta hover:bg-cta/90 text-white px-8 py-4 rounded-full font-heading text-lg shadow-2xl hover:shadow-cta/25 transition-all duration-300 hover:scale-105"
                  onClick={() => (window.location.href = "/salons")}
                >
                  <span>Explore Treatments</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-heading text-lg transition-all duration-300 hover:scale-105"
                  onClick={() => (window.location.href = "/about")}
                >
                  Learn More
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 animate-slide-up-delay-3">
                <div className="text-center">
                  <div className="text-2xl font-heading text-white">500+</div>
                  <div className="text-sm text-white/70 font-body">
                    Premium Venues
                  </div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-heading text-white">4.9★</div>
                  <div className="text-sm text-white/70 font-body">
                    Customer Rating
                  </div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-heading text-white">15+</div>
                  <div className="text-sm text-white/70 font-body">Cities</div>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Cards */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main Feature Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl animate-slide-up">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cta/20 rounded-2xl flex items-center justify-center">
                        <Star className="h-6 w-6 text-cta" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading text-white">
                          Premium Experience
                        </h3>
                        <p className="text-white/70 font-body">
                          Handpicked wellness providers
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 font-body">
                          Spa & Wellness
                        </span>
                        <span className="text-white font-heading">
                          150+ venues
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 font-body">
                          Hair & Beauty
                        </span>
                        <span className="text-white font-heading">
                          200+ salons
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 font-body">
                          Massage Therapy
                        </span>
                        <span className="text-white font-heading">
                          120+ centers
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <Button
                        className="w-full bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl font-body"
                        onClick={() => (window.location.href = "/salons")}
                      >
                        View All Categories
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Floating Mini Cards */}
                <div className="absolute -top-4 -right-4 bg-cta/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float-slow">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white font-body text-sm">
                      Instant Booking
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-sage-600/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float-medium">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-white" />
                    <span className="text-white font-body text-sm">
                      25K+ Happy Customers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar Section */}
          <div className="mt-16 animate-slide-up-delay-3">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-white mb-2">
                Find Your Perfect Wellness Experience
              </h2>
              <p className="text-white/70 font-body">
                Search by location and service type
              </p>
            </div>
            <SearchBar className="max-w-4xl mx-auto" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
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
          <h2 className="text-4xl md:text-5xl font-heading mb-6 animate-slide-up text-white">
            Begin Your Wellness Journey
          </h2>
          <p className="text-xl font-body mb-8 text-white/90 animate-slide-up-delay">
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
                <span className="text-xl font-heading tracking-wide text-white">
                  BeautyBook
                </span>
              </div>
              <p className="text-white/70 font-body leading-relaxed max-w-md">
                Your trusted companion for discovering exceptional wellness
                experiences. We connect you with premium salons and spas that
                prioritize your well-being.
              </p>
            </div>
            <div>
              <h3 className="font-heading mb-6 text-sm tracking-wide text-white">
                Services
              </h3>
              <ul className="space-y-3 text-white/70 font-body text-sm">
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
              <h3 className="font-heading mb-6 text-sm tracking-wide text-white">
                Company
              </h3>
              <ul className="space-y-3 text-white/70 font-body text-sm">
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
            <p className="text-white/60 font-body text-sm">
              © 2024 BeautyBook. All rights reserved. Made with care for your
              wellness journey.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
