
import { Link } from "react-router-dom";
import { Store, storeData } from "../pages/StoresPage";
import { Flower } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StoreCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {storeData.map((store) => (
          <CarouselItem key={store.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <Link to={`/stores/${store.id}`}>
              <Card className="h-full border-2 border-gray-100 hover:border-bloom-pink hover:shadow-md transition-all duration-300">
                <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-bloom-green text-xl">
                    <Flower className="h-5 w-5 mr-2 text-bloom-pink" />
                    {store.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm text-gray-600 mb-2">{store.specialty}</p>
                  <p className="text-sm text-gray-500">{store.city}, {store.state}</p>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
};

export default StoreCarousel;
