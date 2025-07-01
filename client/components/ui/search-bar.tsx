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
      <div className="flex flex-col sm:flex-row gap-0 bg-white/10 backdrop-blur-md rounded-full p-1 sophisticated-shadow border border-white/20 shadow-xl">
        <div className="flex-1 flex items-center gap-3 px-6 py-4">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Your location"
            className="border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 p-0 font-body"
          />
        </div>
        <div className="hidden sm:block w-px bg-border my-2"></div>
        <div className="flex-1 flex items-center gap-3 px-6 py-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Service or treatment"
            className="border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 p-0 font-body"
          />
        </div>
        <div className="flex items-center justify-center p-1">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground rounded-full px-8 py-3 hover:bg-secondary transition-all font-heading text-sm h-12 flex items-center justify-center"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
