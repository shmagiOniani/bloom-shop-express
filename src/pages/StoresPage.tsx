import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Flower, MapPin, Phone, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { 
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

export interface Store {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: Array<{
    day: string;
    open: string;
    close: string;
    breakStart: string;
    breakEnd: string;
    isWorkingDay: boolean;
  }>;
}

export const storeData: Store[] = [
  {
    _id: "1",
    name: "Bloom Express Downtown",
    address: "123 Main Street",
    city: "Seattle",
    phone: "(206) 555-1234",
    hours: [
      { day: "Monday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Tuesday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Wednesday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Thursday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Friday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Saturday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Sunday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: false }
    ]
  },
  {
    _id: "2",
    name: "Bloom Express Eastside",
    address: "456 Park Avenue",
    city: "Bellevue",
    phone: "(425) 555-5678",
    hours: [
      { day: "Monday", open: "10:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Tuesday", open: "10:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Wednesday", open: "10:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Thursday", open: "10:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Friday", open: "10:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Saturday", open: "10:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Sunday", open: "10:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: false }
    ]
  },
  {
    _id: "3",
    name: "Bloom Express Northgate",
    address: "789 Lake Street",
    city: "Seattle",
    phone: "(206) 555-9012",
    hours: [
      { day: "Monday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Tuesday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Wednesday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Thursday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Friday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Saturday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Sunday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: false }
    ]
  },
  {
    _id: "4",
    name: "Bloom Express Tacoma",
    address: "321 Bay Drive",
    city: "Tacoma",
    phone: "(253) 555-3456",
    hours: [
      { day: "Monday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Tuesday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Wednesday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Thursday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Friday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Saturday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Sunday", open: "09:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: false }
    ]
  },
  {
    _id: "5",
    name: "Bloom Express Capitol Hill",
    address: "555 Pine Street",
    city: "Seattle",
    phone: "(206) 555-7890",
    hours: [
      { day: "Monday", open: "08:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Tuesday", open: "08:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Wednesday", open: "08:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Thursday", open: "08:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Friday", open: "08:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Saturday", open: "08:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: true },
      { day: "Sunday", open: "08:00", close: "18:00", breakStart: "13:00", breakEnd: "14:00", isWorkingDay: false }
    ]
  }
];

const StoresPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredStore, setHoveredStore] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const filteredStores = storeData.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  
  return (
    <div className="py-8 md:py-12">
      <div className="bloom-container">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-bloom-green mb-3 relative inline-block">
            Find Our <span className="text-bloom-pink">Stores</span>
            <div className="absolute w-full h-2 bg-bloom-light-pink -bottom-1 left-0 rounded-full transform -rotate-1"></div>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Visit one of our beautiful flower shops and experience the magic in person!
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Input 
              type="text"
              placeholder="Search by location, store name, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 rounded-full border-bloom-pink border-2 focus:border-bloom-green shadow-sm"
            />
            <Flower className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bloom-pink h-5 w-5" />
            <button 
              onClick={() => setOpen(true)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-bloom-pink transition-colors bg-white/80 rounded-full p-1"
            >
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
        </div>
        
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search for stores..." />
          <CommandList>
            <CommandEmpty>No stores found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {storeData.map(store => (
                <CommandItem
                  key={store._id}
                  onSelect={() => {
                    navigate(`/stores/${store._id}`);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-bloom-pink" />
                    <span>{store.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {store.city}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredStores.map((store) => (
            <Card 
              key={store._id} 
              className={`overflow-hidden transition-all duration-300 border-2 hover:shadow-lg ${
                hoveredStore === store._id ? 'border-bloom-pink scale-105' : 'border-gray-100'
              }`}
              onMouseEnter={() => setHoveredStore(store._id)}
              onMouseLeave={() => setHoveredStore(null)}
            >
              <div className="h-4 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-bloom-green">
                  <Flower className="h-5 w-5 mr-2 text-bloom-pink" />
                  {store.name}
                </CardTitle>
                <CardDescription>{store.city}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 text-bloom-pink shrink-0 mt-1" />
                    <div>
                      <p>{store.address}</p>
                      <p>{store.city} </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-bloom-pink shrink-0" />
                    <p>{store.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-700">Hours:</p>
                    <p className="text-sm">{store.hours.map(hour => `${hour.day}: ${hour.open} - ${hour.close}`).join(', ')}</p>
                  </div>
                  <div className="pt-2">
                    <Link to={`/stores/${store._id}`}>
                      <Button 
                        className="w-full bg-bloom-green hover:bg-bloom-green/90 text-white"
                        variant="default"
                      >
                        View Store Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-bloom-pink">No stores match your search.</p>
            <p className="text-gray-600 mt-2">Try a different search term!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresPage;
