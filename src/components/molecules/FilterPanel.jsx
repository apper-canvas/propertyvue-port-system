import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import PriceRange from "@/components/molecules/PriceRange";
import { cn } from "@/utils/cn";

const FilterPanel = ({ 
  className, 
  filters, 
  onFiltersChange, 
  isOpen = true, 
  onToggle,
  onClear
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handlePriceChange = (priceRange) => {
    const newFilters = {
      ...localFilters,
      priceMin: priceRange[0],
      priceMax: priceRange[1]
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePropertyTypeChange = (type) => {
    const currentTypes = localFilters.propertyTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    const newFilters = {
      ...localFilters,
      propertyTypes: newTypes
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleBedroomsChange = (value) => {
    const newFilters = {
      ...localFilters,
      bedroomsMin: value === "any" ? null : parseInt(value)
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleBathroomsChange = (value) => {
    const newFilters = {
      ...localFilters,
      bathroomsMin: value === "any" ? null : parseInt(value)
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const propertyTypes = ["House", "Condo", "Townhouse", "Apartment"];
  const bedroomOptions = ["any", "1", "2", "3", "4", "5+"];
  const bathroomOptions = ["any", "1", "2", "3", "4+"];

  const activeFiltersCount = () => {
    let count = 0;
    if (localFilters.priceMin > 0 || localFilters.priceMax < 5000000) count++;
    if (localFilters.propertyTypes?.length > 0) count++;
    if (localFilters.bedroomsMin) count++;
    if (localFilters.bathroomsMin) count++;
    return count;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "bg-white rounded-lg shadow-card",
        className
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-display font-semibold text-gray-900">
              Filters
            </h2>
            {activeFiltersCount() > 0 && (
              <Badge variant="primary" size="sm">
                {activeFiltersCount()}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {activeFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear All
              </Button>
            )}
            
            {onToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden"
              >
                <ApperIcon name={isOpen ? "X" : "Filter"} className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 space-y-6"
          >
            {/* Price Range */}
            <PriceRange
              value={[localFilters.priceMin || 0, localFilters.priceMax || 5000000]}
              onChange={handlePriceChange}
            />

            {/* Property Type */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Property Type</h3>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <Button
                    key={type}
                    variant={localFilters.propertyTypes?.includes(type) ? "primary" : "outline"}
                    size="sm"
                    onClick={() => handlePropertyTypeChange(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Bedrooms
              </label>
              <Select
                value={localFilters.bedroomsMin || "any"}
                onChange={(e) => handleBedroomsChange(e.target.value)}
              >
                {bedroomOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "any" ? "Any" : `${option} bedroom${option !== "1" ? "s" : ""}`}
                  </option>
                ))}
              </Select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Bathrooms
              </label>
              <Select
                value={localFilters.bathroomsMin || "any"}
                onChange={(e) => handleBathroomsChange(e.target.value)}
              >
                {bathroomOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "any" ? "Any" : `${option} bathroom${option !== "1" ? "s" : ""}`}
                  </option>
                ))}
              </Select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterPanel;