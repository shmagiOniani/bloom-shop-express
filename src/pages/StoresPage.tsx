
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Flower, MapPin, Phone } from "lucide-react";

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
  
  const filteredStores = storeData.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredStores.map((store) => (
            <Card 
              key={store.id} 
              className={`overflow-hidden transition-all duration-300 border-2 hover:shadow-lg ${
                hoveredStore === store.id ? 'border-bloom-pink scale-105' : 'border-gray-100'
              }`}
              onMouseEnter={() => setHoveredStore(store.id)}
              onMouseLeave={() => setHoveredStore(null)}
            >
              <div className="h-4 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-bloom-green">
                  <Flower className="h-5 w-5 mr-2 text-bloom-pink" />
                  {store.name}
                </CardTitle>
                <CardDescription>{store.specialty}</CardDescription>
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
