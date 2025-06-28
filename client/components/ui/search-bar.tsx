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
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 bg-white/90 backdrop-blur-sm rounded-2xl p-2 card-shadow">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 border-r border-gray-200">
          <MapPin className="h-5 w-5 text-gray-400" />
          <Input
            placeholder="Enter your location"
            className="border-0 bg-transparent placeholder:text-gray-500 focus-visible:ring-0 p-0"
          />
        </div>
        <div className="flex-1 flex items-center gap-3 px-4 py-3">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search for salons, spas..."
            className="border-0 bg-transparent placeholder:text-gray-500 focus-visible:ring-0 p-0"
          />
        </div>
        <Button
          size="lg"
          className="bg-gradient-primary text-white rounded-xl px-8 hover:opacity-90 transition-opacity"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
