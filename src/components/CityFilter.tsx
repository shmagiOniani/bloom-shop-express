
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface CityFilterProps {
  cities: string[];
  selectedCities: string[];
  onChange: (city: string, isChecked: boolean) => void;
}

const CityFilter = ({ cities, selectedCities, onChange }: CityFilterProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Cities</Label>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {cities.map((city) => (
          <div key={city} className="flex items-center space-x-2">
            <Checkbox 
              id={`city-${city}`}
              checked={selectedCities.includes(city)}
              onCheckedChange={(checked) => onChange(city, checked === true)}
            />
            <Label 
              htmlFor={`city-${city}`} 
              className="text-sm cursor-pointer"
            >
              {city}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityFilter;
