import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
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
  const [openSections, setOpenSections] = useState({
    basic: true,
    details: false,
    amenities: false
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  const handleAmenityChange = (amenity) => {
    const currentAmenities = localFilters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    const newFilters = {
      ...localFilters,
      amenities: newAmenities
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSquareFootageChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      [field]: value === "" ? null : parseInt(value)
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleYearBuiltChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      [field]: value === "" ? null : parseInt(value)
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleLotSizeChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      [field]: value === "" ? null : parseFloat(value)
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const propertyTypes = ["House", "Condo", "Townhouse", "Apartment"];
  const bedroomOptions = ["any", "1", "2", "3", "4", "5+"];
  const bathroomOptions = ["any", "1", "2", "3", "4+"];
  const amenityOptions = [
    "Parking", "Pool", "Gym", "Balcony", "Fireplace", "Laundry", 
    "Garden", "Security", "Storage", "Elevator", "Terrace", "Spa"
  ];

  const activeFiltersCount = () => {
    let count = 0;
    if (localFilters.priceMin > 0 || localFilters.priceMax < 5000000) count++;
    if (localFilters.propertyTypes?.length > 0) count++;
    if (localFilters.bedroomsMin) count++;
    if (localFilters.bathroomsMin) count++;
    if (localFilters.amenities?.length > 0) count++;
    if (localFilters.squareFeetMin || localFilters.squareFeetMax) count++;
    if (localFilters.yearBuiltMin || localFilters.yearBuiltMax) count++;
    if (localFilters.lotSizeMin || localFilters.lotSizeMax) count++;
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
className="divide-y divide-gray-200"
          >
            {/* Basic Filters Section */}
            <div className="p-6">
              <button
                onClick={() => toggleSection('basic')}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-sm font-medium text-gray-700">Basic Filters</h3>
                <ApperIcon 
                  name={openSections.basic ? "ChevronUp" : "ChevronDown"} 
                  className="w-4 h-4 text-gray-500" 
                />
              </button>
              
              <AnimatePresence>
                {openSections.basic && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-6"
                  >
                    {/* Price Range */}
                    <PriceRange
                      value={[localFilters.priceMin || 0, localFilters.priceMax || 5000000]}
                      onChange={handlePriceChange}
                    />

                    {/* Property Type */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Property Type</h4>
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
            </div>

            {/* Property Details Section */}
            <div className="p-6">
              <button
                onClick={() => toggleSection('details')}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-sm font-medium text-gray-700">Property Details</h3>
                <ApperIcon 
                  name={openSections.details ? "ChevronUp" : "ChevronDown"} 
                  className="w-4 h-4 text-gray-500" 
                />
              </button>
              
              <AnimatePresence>
                {openSections.details && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-6"
                  >
                    {/* Square Footage */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Square Footage</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Min</label>
                          <Input
                            type="number"
                            placeholder="Min sq ft"
                            value={localFilters.squareFeetMin || ""}
                            onChange={(e) => handleSquareFootageChange("squareFeetMin", e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Max</label>
                          <Input
                            type="number"
                            placeholder="Max sq ft"
                            value={localFilters.squareFeetMax || ""}
                            onChange={(e) => handleSquareFootageChange("squareFeetMax", e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Year Built */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Year Built</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">From</label>
                          <Input
                            type="number"
                            placeholder="From year"
                            value={localFilters.yearBuiltMin || ""}
                            onChange={(e) => handleYearBuiltChange("yearBuiltMin", e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">To</label>
                          <Input
                            type="number"
                            placeholder="To year"
                            value={localFilters.yearBuiltMax || ""}
                            onChange={(e) => handleYearBuiltChange("yearBuiltMax", e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Lot Size */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Lot Size (acres)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Min</label>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="Min acres"
                            value={localFilters.lotSizeMin || ""}
                            onChange={(e) => handleLotSizeChange("lotSizeMin", e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Max</label>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="Max acres"
                            value={localFilters.lotSizeMax || ""}
                            onChange={(e) => handleLotSizeChange("lotSizeMax", e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Amenities Section */}
            <div className="p-6">
              <button
                onClick={() => toggleSection('amenities')}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-sm font-medium text-gray-700">Amenities</h3>
                <ApperIcon 
                  name={openSections.amenities ? "ChevronUp" : "ChevronDown"} 
                  className="w-4 h-4 text-gray-500" 
                />
              </button>
              
              <AnimatePresence>
                {openSections.amenities && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {amenityOptions.map((amenity) => (
                        <Button
                          key={amenity}
                          variant={localFilters.amenities?.includes(amenity) ? "primary" : "outline"}
                          size="sm"
                          onClick={() => handleAmenityChange(amenity)}
                          className="text-xs"
                        >
                          {amenity}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterPanel;