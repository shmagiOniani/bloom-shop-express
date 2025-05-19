
import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Flower, MapPin, Phone, ArrowLeft } from "lucide-react";
import { storeData } from "./StoresPage";
import { getFeaturedProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const StoreDetailPage = () => {
  const { id } = useParams();
  const storeId = id || "1";
  const store = storeData.find((s) => s._id === storeId);
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  
  // Using a proper lookup function to get coordinates as a tuple
  const getStoreCoordinates = (id: string): [number, number] => {
    const coordinates: Record<string, [number, number]> = {
      1: [-122.3321, 47.6062], // Seattle Downtown
      2: [-122.2006, 47.6101], // Bellevue
      3: [-122.3215, 47.7041], // Northgate
      4: [-122.4400, 47.2529], // Tacoma
      5: [-122.3132, 47.6205]  // Capitol Hill
    };
    return coordinates[id] || [-122.3321, 47.6062]; // Default to Seattle Downtown if ID not found
  };
  
  const storeCoordinates = getStoreCoordinates(storeId);
  
  useEffect(() => {
    if (!mapContainer.current || !store) return;
    
    mapboxgl.accessToken = 'pk.eyJ1IjoicGxhY2Vob2xkZXIiLCJhIjoiY2xvYWRpbmciOiJtYXAifQ.123456789';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: storeCoordinates,
      zoom: 13,
    });
    
    map.current.on('load', () => {
      setMapLoaded(true);
      
      if (map.current) {
        new mapboxgl.Marker({ color: '#ff75a0' }) // bloom-pink color
          .setLngLat(storeCoordinates)
          .addTo(map.current);
      }
    });
    
    return () => {
      map.current?.remove();
    };
  }, [storeId]);
  
  if (!store) {
    return (
      <div className="bloom-container py-12 text-center">
        <h2 className="text-2xl font-bold text-bloom-pink">Store not found</h2>
        <Link to="/stores" className="mt-4 inline-block text-bloom-green hover:underline">
          <ArrowLeft className="inline mr-1" size={16} />
          Back to all stores
        </Link>
      </div>
    );
  }
  
  return (
    <div className="py-8 md:py-12 overflow-hidden">
      <div className="bloom-container">
        <Link to="/stores" className="inline-flex items-center text-bloom-green hover:text-bloom-pink transition-colors mb-6">
          <ArrowLeft className="mr-1" size={18} />
          <span>All Stores</span>
        </Link>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-bloom-green mb-3 relative inline-block">
            {store.name}
            <div className="absolute w-full h-2 bg-bloom-light-pink -bottom-1 left-0 rounded-full transform -rotate-1"></div>
          </h1>
        
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 overflow-hidden border-2 border-gray-100 hover:border-bloom-pink transition-all duration-300">
            <div className="h-4 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-bloom-green">
                <Flower className="h-5 w-5 mr-2 text-bloom-pink" />
                Store Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 text-bloom-pink shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-sm text-gray-700">Hours:</p>
                    <p className="text-sm">{store.hours}</p>
                  </div>
                </div>
                
                
                <div className="pt-2">
                  <Button className="w-full bg-bloom-green hover:bg-bloom-green/90 text-white">
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-2 border-gray-100 h-[300px] md:h-[400px]">
              {!mapLoaded && (
                <div className="flex items-center justify-center h-full bg-gray-50">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bloom-pink"></div>
                </div>
              )}
              <div ref={mapContainer} className="w-full h-full" />
            </Card>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-bloom-green mb-6 text-center">
            <span className="relative inline-block">
              Featured Products at {store.name}
              <div className="absolute w-full h-1.5 bg-bloom-light-pink -bottom-1 left-0 rounded-full transform -rotate-1"></div>
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild className="bg-bloom-pink hover:bg-bloom-pink/90 text-white px-8">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-bloom-light-pink opacity-10 animate-pulse"></div>
        <div className="absolute top-32 -left-24 w-32 h-32 rounded-full bg-bloom-light-green opacity-10"></div>
      </div>
    </div>
  );
};

export default StoreDetailPage;
