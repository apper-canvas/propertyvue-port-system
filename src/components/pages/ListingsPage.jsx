import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import propertyService from "@/services/api/propertyService";
import Header from "@/components/organisms/Header";
import FilterPanel from "@/components/molecules/FilterPanel";
import SortControls from "@/components/organisms/SortControls";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ListingsPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 5000000,
    propertyTypes: [],
    bedroomsMin: null,
    bathroomsMin: null,
    location: ""
  });

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getAll();
      setProperties(data);
      setFilteredProperties(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      const filtered = await propertyService.searchProperties(filters);
      const sorted = await propertyService.sortProperties(filtered, sortBy);
      setFilteredProperties(sorted);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      location: searchTerm
    }));
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      priceMin: 0,
      priceMax: 5000000,
      propertyTypes: [],
      bedroomsMin: null,
      bathroomsMin: null,
      location: ""
    };
    setFilters(clearedFilters);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    if (properties.length > 0) {
      applyFilters();
    }
  }, [filters, sortBy, properties]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClear={handleClearFilters}
            />
          </div>
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="w-full flex items-center justify-center gap-2"
            >
              <ApperIcon name="Filter" className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort Controls */}
            <SortControls
              sortBy={sortBy}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              resultsCount={filteredProperties.length}
            />

            {/* Property Grid */}
            <PropertyGrid
              properties={filteredProperties}
              loading={loading}
              error={error}
              onRetry={loadProperties}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto"
          >
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClear={handleClearFilters}
              isOpen={true}
              onToggle={() => setIsFilterOpen(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ListingsPage;