
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RangePicker } from './ui/range-picker';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onChange: (minPrice: number, maxPrice: number) => void;
}

const PriceRangeFilter = ({ minPrice, maxPrice, onChange }: PriceRangeFilterProps) => {
  const [localRange, setLocalRange] = useState<[number, number]>([minPrice, maxPrice]);
  
  useEffect(() => {
    setLocalRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleChange = (values: number[]) => {
    const [min, max] = values as [number, number];
    setLocalRange([min, max]);
    onChange(min, max);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="text-sm">
          ${localRange[0].toFixed(0)} - ${localRange[1].toFixed(0)}
        </div>
      </div>
      <RangePicker
        defaultValue={[minPrice, maxPrice]}
        value={localRange}
        min={minPrice}
        max={maxPrice}
        step={1}
        onValueChange={handleChange}
        className="w-full"
      />
      {/* <Slider 
        defaultValue={[minPrice, maxPrice]}
        value={localRange}
        min={minPrice} 
        max={maxPrice} 
        step={1}
        onValueChange={handleChange}
        className="w-full"
      /> */}
    </div>
  );
};

export default PriceRangeFilter;
