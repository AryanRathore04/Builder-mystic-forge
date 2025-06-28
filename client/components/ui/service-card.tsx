import { Star, MapPin, Clock } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  services: string[];
  priceRange: string;
  isOpen?: boolean;
  className?: string;
  onClick?: () => void;
}

export function ServiceCard({
  id,
  name,
  image,
  rating,
  reviewCount,
  location,
  services,
  priceRange,
  isOpen = true,
  className,
  onClick,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover",
        "transition-all duration-300 cursor-pointer group hover:scale-[1.02]",
        className,
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant={isOpen ? "default" : "secondary"}
            className="bg-white/90 text-gray-700"
          >
            <Clock className="h-3 w-3 mr-1" />
            {isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-gray-700">{priceRange}</Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-beauty-mint/20 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {services.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{services.length - 3} more
            </Badge>
          )}
        </div>

        <Button
          className="w-full bg-gradient-primary text-white hover:opacity-90 rounded-xl"
          size="sm"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
