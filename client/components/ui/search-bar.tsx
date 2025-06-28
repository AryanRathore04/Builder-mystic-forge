import { Search, MapPin } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

interface SearchBarProps {
  className?: string;
  onSearch?: (location: string, service: string) => void;
}

export function SearchBar({ className = "", onSearch }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col sm:flex-row gap-0 bg-white/95 backdrop-blur-sm rounded-full p-1 sophisticated-shadow border border-spa-stone/10">
        <div className="flex-1 flex items-center gap-3 px-6 py-4">
          <MapPin className="h-4 w-4 text-spa-charcoal/40" />
          <Input
            placeholder="Your location"
            className="border-0 bg-transparent placeholder:text-spa-charcoal/40 focus-visible:ring-0 p-0 font-light"
          />
        </div>
        <div className="hidden sm:block w-px bg-spa-stone/20 my-2"></div>
        <div className="flex-1 flex items-center gap-3 px-6 py-4">
          <Search className="h-4 w-4 text-spa-charcoal/40" />
          <Input
            placeholder="Service or treatment"
            className="border-0 bg-transparent placeholder:text-spa-charcoal/40 focus-visible:ring-0 p-0 font-light"
          />
        </div>
        <Button
          size="lg"
          className="bg-primary text-white rounded-full px-8 py-4 hover:bg-spa-sage transition-all font-medium text-sm m-1"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
