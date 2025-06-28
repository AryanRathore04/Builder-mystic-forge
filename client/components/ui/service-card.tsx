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
        "bg-white rounded-lg overflow-hidden sophisticated-shadow hover:card-shadow-hover",
        "transition-all duration-500 cursor-pointer group hover:scale-[1.02] border border-spa-stone/10",
        className,
      )}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant={isOpen ? "default" : "secondary"}
            className={cn(
              "bg-white/90 backdrop-blur-sm text-xs font-light px-2 py-1",
              isOpen ? "text-primary" : "text-spa-charcoal/60",
            )}
          >
            <Clock className="h-3 w-3 mr-1" />
            {isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 backdrop-blur-sm text-spa-charcoal text-xs font-light px-2 py-1">
            {priceRange}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-lg text-spa-charcoal line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-spa-lime/20 px-2 py-1 rounded-full">
            <Star className="h-3 w-3 fill-spa-lime text-spa-lime" />
            <span className="text-xs font-medium text-spa-charcoal">
              {rating}
            </span>
            <span className="text-xs text-spa-charcoal/60">
              ({reviewCount})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-spa-charcoal/60 mb-4">
          <MapPin className="h-3 w-3" />
          <span className="text-sm line-clamp-1 font-light">{location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {services.slice(0, 2).map((service, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs font-light bg-spa-cream text-spa-charcoal/70 border-0"
            >
              {service}
            </Badge>
          ))}
          {services.length > 2 && (
            <Badge
              variant="outline"
              className="text-xs font-light border-spa-stone/30 text-spa-charcoal/60"
            >
              +{services.length - 2} more
            </Badge>
          )}
        </div>

        <Button
          className="w-full bg-primary text-white hover:bg-spa-sage rounded-full font-medium text-sm py-2"
          size="sm"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
