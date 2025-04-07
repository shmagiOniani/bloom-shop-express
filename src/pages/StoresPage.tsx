
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Flower, MapPin, Phone, Search, X, Heart } from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: string;
  specialty: string;
}

const storeData: Store[] = [
  {
    id: 1,
    name: "Bloom Express Downtown",
    address: "123 Main Street",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    phone: "(206) 555-1234",
    hours: "Mon-Sat: 9am-7pm, Sun: 10am-5pm",
    specialty: "Fresh Bouquets"
  },
  {
    id: 2,
    name: "Bloom Express Eastside",
    address: "456 Park Avenue",
    city: "Bellevue",
    state: "WA",
    zipCode: "98004",
    phone: "(425) 555-5678",
    hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
    specialty: "Luxury Arrangements"
  },
  {
    id: 3,
    name: "Bloom Express Northgate",
    address: "789 Lake Street",
    city: "Seattle",
    state: "WA",
    zipCode: "98125",
    phone: "(206) 555-9012",
    hours: "Mon-Sat: 9am-6pm, Sun: 10am-4pm",
    specialty: "Wedding Flowers"
  },
  {
    id: 4,
    name: "Bloom Express Tacoma",
    address: "321 Bay Drive",
    city: "Tacoma",
    state: "WA",
    zipCode: "98402",
    phone: "(253) 555-3456",
    hours: "Mon-Sat: 9am-7pm, Sun: 11am-5pm",
    specialty: "Custom Arrangements"
  },
  {
    id: 5,
    name: "Bloom Express Capitol Hill",
    address: "555 Pine Street",
    city: "Seattle",
    state: "WA",
    zipCode: "98122",
    phone: "(206) 555-7890",
    hours: "Mon-Sat: 8am-8pm, Sun: 9am-6pm",
    specialty: "Single Stems & Bouquets"
  }
];

const StoresPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredStore, setHoveredStore] = useState<number | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [floatingFlowers, setFloatingFlowers] = useState<{id: number, x: number, y: number, size: number, rotation: number, color: string}[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Create floating flower effect
  useEffect(() => {
    const flowers = [];
    for (let i = 0; i < 12; i++) {
      flowers.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 10,
        rotation: Math.random() * 360,
        color: i % 2 === 0 ? '#F8BBCC' : '#A7C497'
      });
    }
    setFloatingFlowers(flowers);
  }, []);
  
  const filteredStores = storeData.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Keyboard shortcut for quick search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setCommandOpen(true);
      } else if (e.key === 'Escape') {
        setCommandOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle quick search selection
  const handleStoreSelect = (storeId: number) => {
    const selected = storeData.find(s => s.id === storeId);
    if (selected) {
      setSearchTerm(selected.city);
      setCommandOpen(false);
      
      // Scroll to the store card with animation
      const storeCard = document.getElementById(`store-${storeId}`);
      if (storeCard) {
        storeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHoveredStore(storeId);
        setTimeout(() => setHoveredStore(null), 2000);
      }
    }
  };
  
  return (
    <div className="py-8 md:py-12 relative overflow-hidden">
      {/* Decorative floating flowers */}
      {floatingFlowers.map(flower => (
        <div
          key={flower.id}
          className="absolute animate-bounce pointer-events-none"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            transform: `rotate(${flower.rotation}deg)`,
            opacity: 0.3,
            animationDuration: `${3 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          <Flower size={flower.size} color={flower.color} />
        </div>
      ))}
      
      <div className="bloom-container">
        <div className="text-center mb-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-bloom-green mb-3 relative inline-block">
            Find Our <span className="text-bloom-pink">Stores</span>
            <div className="absolute w-full h-2 bg-bloom-light-pink -bottom-1 left-0 rounded-full transform -rotate-1"></div>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Visit one of our beautiful flower shops and experience the magic in person!
          </p>
          
          {/* Playful flowers around the title */}
          <Heart 
            className="absolute -top-4 -right-4 text-bloom-pink h-8 w-8 animate-pulse" 
            fill="#FFDEE2" 
            opacity={0.7}
          />
          <Flower 
            className="absolute -bottom-4 -left-8 text-bloom-light-green h-6 w-6 animate-spin-slow" 
          />
        </div>
        
        <div className="max-w-xl mx-auto mb-8 relative">
          {/* Regular search */}
          <div className="relative group">
            <Input 
              ref={searchInputRef}
              type="text"
              placeholder="Search by location, store name, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-6 rounded-full border-bloom-pink border-2 focus:border-bloom-green shadow-sm transition-all duration-300 group-hover:shadow-md"
            />
            <Flower className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bloom-pink h-5 w-5 group-hover:rotate-45 transition-transform" />
            {searchTerm && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bloom-pink hover:text-bloom-green transition-colors"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Quick search button */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <button 
                onClick={() => setCommandOpen(true)}
                className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-bloom-light-pink p-3 rounded-full hover:bg-bloom-pink text-white transition-colors hover:scale-110"
              >
                <Search className="h-5 w-5" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-60 font-quicksand bg-white">
              <div className="flex items-center gap-2">
                <kbd className="text-xs px-2 py-1 bg-gray-100 rounded">⌘</kbd>
                <kbd className="text-xs px-2 py-1 bg-gray-100 rounded">K</kbd>
                <span className="text-sm">or</span>
                <kbd className="text-xs px-2 py-1 bg-gray-100 rounded">/</kbd>
                <span className="text-sm">for quick search</span>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        {/* Command menu for quick search */}
        <Command 
          className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center ${commandOpen ? 'block' : 'hidden'}`} 
          onClick={() => setCommandOpen(false)}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-lg overflow-hidden shadow-xl border-2 border-bloom-light-pink animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <CommandInput 
              placeholder="Search stores by name, location, or specialty..." 
              className="font-quicksand"
              autoFocus
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Stores">
                <ScrollArea className="h-60">
                  {storeData.map((store) => (
                    <CommandItem 
                      key={store.id}
                      value={`${store.name} ${store.city} ${store.specialty}`}
                      onSelect={() => handleStoreSelect(store.id)}
                      className="flex items-start gap-2 p-2 cursor-pointer hover:bg-bloom-light-pink/20"
                    >
                      <Flower className="h-4 w-4 text-bloom-pink shrink-0 mt-1" />
                      <div className="flex flex-col">
                        <span className="font-medium">{store.name}</span>
                        <span className="text-sm text-gray-500">{store.city} - {store.specialty}</span>
                      </div>
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </div>
        </Command>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredStores.map((store) => (
            <Card 
              key={store.id}
              id={`store-${store.id}`}
              className={`overflow-hidden transition-all duration-500 border-2 hover:shadow-lg ${
                hoveredStore === store.id 
                  ? 'border-bloom-pink scale-105 rotate-1'
                  : 'border-gray-100 hover:rotate-1'
              }`}
              onMouseEnter={() => setHoveredStore(store.id)}
              onMouseLeave={() => setHoveredStore(null)}
            >
              <div className="h-4 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-bloom-green group">
                  <Flower className="h-5 w-5 mr-2 text-bloom-pink group-hover:rotate-45 transition-transform" />
                  {store.name}
                </CardTitle>
                <CardDescription className="font-medium">{store.specialty}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 text-bloom-pink shrink-0 mt-1" />
                    <div>
                      <p>{store.address}</p>
                      <p>{store.city}, {store.state} {store.zipCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-bloom-pink shrink-0" />
                    <p>{store.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-700">Hours:</p>
                    <p className="text-sm">{store.hours}</p>
                  </div>
                  
                  {/* Interactive flower decoration */}
                  <div className={`absolute -bottom-4 -right-4 transition-all duration-500 ${
                    hoveredStore === store.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}>
                    <div className="relative">
                      <Heart 
                        fill="#FFDEE2" 
                        className="h-12 w-12 text-bloom-pink" 
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                        Visit!
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-6 rounded-full bg-bloom-light-pink/20 animate-pulse">
              <Flower className="h-12 w-12 text-bloom-pink" />
            </div>
            <p className="text-2xl text-bloom-pink mt-4">No stores match your search.</p>
            <p className="text-gray-600 mt-2">Try a different search term!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresPage;
