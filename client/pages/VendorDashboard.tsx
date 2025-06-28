import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  DollarSign,
  Users,
  Star,
  Plus,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Leaf,
  Settings,
  Bell,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "342",
    change: "+18%",
    trend: "up",
    icon: Calendar,
    period: "This month",
  },
  {
    title: "Revenue",
    value: "₹85,240",
    change: "+12%",
    trend: "up",
    icon: DollarSign,
    period: "This month",
  },
  {
    title: "New Customers",
    value: "28",
    change: "+5%",
    trend: "up",
    icon: Users,
    period: "This week",
  },
  {
    title: "Rating",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Star,
    period: "Overall",
  },
];

const upcomingBookings = [
  {
    id: "1",
    customerName: "Priya Sharma",
    service: "Deep Tissue Massage",
    time: "10:00 AM",
    duration: "60 mins",
    amount: "₹2,500",
    status: "confirmed",
    phone: "+91 98765 43210",
  },
  {
    id: "2",
    customerName: "Rajesh Kumar",
    service: "Hot Stone Therapy",
    time: "2:30 PM",
    duration: "75 mins",
    amount: "₹3,200",
    status: "pending",
    phone: "+91 87654 32109",
  },
  {
    id: "3",
    customerName: "Anita Patel",
    service: "Aromatherapy Session",
    time: "4:00 PM",
    duration: "45 mins",
    amount: "₹2,000",
    status: "confirmed",
    phone: "+91 76543 21098",
  },
];

const services = [
  {
    id: "1",
    name: "Deep Tissue Massage",
    duration: "60 mins",
    price: "₹2,500",
    description: "Intensive therapeutic massage targeting muscle tension",
    isActive: true,
    bookings: 45,
  },
  {
    id: "2",
    name: "Hot Stone Therapy",
    duration: "75 mins",
    price: "₹3,200",
    description: "Relaxing treatment using heated stones",
    isActive: true,
    bookings: 32,
  },
  {
    id: "3",
    name: "Aromatherapy Session",
    duration: "45 mins",
    price: "₹2,000",
    description: "Holistic therapy using essential oils",
    isActive: false,
    bookings: 18,
  },
];

const timeSlots = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: false, booking: "Priya S." },
  { time: "11:00 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "1:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: false, booking: "Rajesh K." },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: false, booking: "Anita P." },
  { time: "5:00 PM", available: true },
];

export default function VendorDashboard() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-primary/10 text-primary";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-spa-stone text-spa-charcoal/60";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Top Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-spa-stone/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-light text-spa-charcoal tracking-wide">
                Serenity Spa Dashboard
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">S</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-spa-charcoal mb-2">
            Welcome back, Serenity Spa
          </h1>
          <p className="text-spa-charcoal/60 font-light">
            Manage your bookings, services, and business performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 sophisticated-shadow border border-spa-stone/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge
                  className={`${
                    stat.trend === "up"
                      ? "bg-primary/10 text-primary"
                      : "bg-red-100 text-red-600"
                  } border-0 font-light`}
                >
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-light text-spa-charcoal mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-spa-charcoal/60 font-light">
                {stat.title}
              </div>
              <div className="text-xs text-spa-charcoal/40 font-light mt-1">
                {stat.period}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="bookings" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/70 backdrop-blur-sm">
                <TabsTrigger value="bookings" className="font-light">
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="services" className="font-light">
                  Services
                </TabsTrigger>
                <TabsTrigger value="analytics" className="font-light">
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <div className="bg-white rounded-lg sophisticated-shadow border border-spa-stone/10">
                  <div className="p-6 border-b border-spa-stone/10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-light text-spa-charcoal">
                        Today's Bookings
                      </h2>
                      <Button
                        size="sm"
                        className="bg-primary text-white hover:bg-spa-sage font-light"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Booking
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="border border-spa-stone/10 rounded-lg p-4 hover:bg-spa-stone/5 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-medium text-spa-charcoal">
                                  {booking.customerName}
                                </h3>
                                <Badge
                                  className={`${getStatusColor(
                                    booking.status,
                                  )} border-0 font-light`}
                                >
                                  {booking.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-spa-charcoal/60">
                                <div>
                                  <span className="font-light">
                                    {booking.service}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span className="font-light">
                                    {booking.time} ({booking.duration})
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="font-medium text-spa-charcoal">
                                  {booking.amount}
                                </div>
                                <div className="text-sm text-spa-charcoal/60 font-light">
                                  {booking.phone}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services">
                <div className="bg-white rounded-lg sophisticated-shadow border border-spa-stone/10">
                  <div className="p-6 border-b border-spa-stone/10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-light text-spa-charcoal">
                        Your Services
                      </h2>
                      <Button
                        size="sm"
                        className="bg-primary text-white hover:bg-spa-sage font-light"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="border border-spa-stone/10 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-medium text-spa-charcoal">
                                  {service.name}
                                </h3>
                                <Badge
                                  className={`${
                                    service.isActive
                                      ? "bg-primary/10 text-primary"
                                      : "bg-spa-stone text-spa-charcoal/60"
                                  } border-0 font-light`}
                                >
                                  {service.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <p className="text-sm text-spa-charcoal/60 font-light mb-3">
                                {service.description}
                              </p>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-spa-charcoal/60 font-light">
                                    Duration:
                                  </span>
                                  <div className="font-medium text-spa-charcoal">
                                    {service.duration}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-spa-charcoal/60 font-light">
                                    Price:
                                  </span>
                                  <div className="font-medium text-spa-charcoal">
                                    {service.price}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-spa-charcoal/60 font-light">
                                    Bookings:
                                  </span>
                                  <div className="font-medium text-spa-charcoal">
                                    {service.bookings}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <div className="bg-white rounded-lg sophisticated-shadow border border-spa-stone/10 p-6">
                  <h2 className="text-xl font-light text-spa-charcoal mb-6">
                    Business Analytics
                  </h2>
                  <div className="text-center py-20">
                    <BarChart3 className="h-16 w-16 text-spa-charcoal/20 mx-auto mb-4" />
                    <p className="text-spa-charcoal/60 font-light">
                      Detailed analytics and reporting features coming soon
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-lg sophisticated-shadow border border-spa-stone/10 p-6">
              <h3 className="font-medium text-spa-charcoal mb-4">
                Time Slots - Today
              </h3>
              <div className="space-y-2">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      slot.available
                        ? "border-spa-stone/20 bg-spa-cream/30"
                        : "border-primary/20 bg-primary/5"
                    }`}
                  >
                    <span className="text-sm font-light text-spa-charcoal">
                      {slot.time}
                    </span>
                    {slot.available ? (
                      <Badge className="bg-spa-lime/20 text-spa-charcoal border-0 font-light">
                        Available
                      </Badge>
                    ) : (
                      <span className="text-sm text-primary font-medium">
                        {slot.booking}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Quick Actions */}
            <div className="bg-white rounded-lg sophisticated-shadow border border-spa-stone/10 p-6">
              <h3 className="font-medium text-spa-charcoal mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-spa-stone/30 text-spa-charcoal font-light"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Profile Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-spa-stone/30 text-spa-charcoal font-light"
                >
                  <TrendingUp className="h-4 w-4 mr-3" />
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-spa-stone/30 text-spa-charcoal font-light"
                >
                  <DollarSign className="h-4 w-4 mr-3" />
                  Payout History
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-spa-stone/30 text-spa-charcoal font-light"
                >
                  <Bell className="h-4 w-4 mr-3" />
                  Notifications
                </Button>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg sophisticated-shadow border border-spa-stone/10 p-6">
              <h3 className="font-medium text-spa-charcoal mb-4">
                Recent Reviews
              </h3>
              <div className="space-y-4">
                <div className="border-b border-spa-stone/10 pb-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-spa-lime text-spa-lime"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-spa-charcoal/80 font-light mb-2">
                    "Exceptional service and very professional staff."
                  </p>
                  <span className="text-xs text-spa-charcoal/60 font-light">
                    - Priya S.
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-spa-lime text-spa-lime"
                      />
                    ))}
                    <Star className="h-3 w-3 text-spa-stone" />
                  </div>
                  <p className="text-sm text-spa-charcoal/80 font-light mb-2">
                    "Great atmosphere and relaxing experience."
                  </p>
                  <span className="text-xs text-spa-charcoal/60 font-light">
                    - Rajesh K.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
