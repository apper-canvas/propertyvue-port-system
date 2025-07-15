import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const SortControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  resultsCount,
  className 
}) => {
  const sortOptions = [
    { value: "newest", label: "Newest First", icon: "Clock" },
    { value: "oldest", label: "Oldest First", icon: "Clock" },
    { value: "price-low", label: "Price: Low to High", icon: "TrendingUp" },
    { value: "price-high", label: "Price: High to Low", icon: "TrendingDown" },
    { value: "bedrooms", label: "Most Bedrooms", icon: "Bed" },
    { value: "size", label: "Largest First", icon: "Square" },
  ];

  const viewModes = [
    { value: "grid", icon: "Grid3x3" },
    { value: "list", icon: "List" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-card",
        className
      )}
    >
      {/* Results Count */}
      <div className="flex items-center space-x-2">
        <ApperIcon name="Search" className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">
          {resultsCount} {resultsCount === 1 ? "property" : "properties"} found
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ApperIcon name="ArrowUpDown" className="w-4 h-4 text-gray-500" />
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="min-w-[160px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          {viewModes.map((mode) => (
            <Button
              key={mode.value}
              variant={viewMode === mode.value ? "primary" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode.value)}
              className="px-3 py-1.5"
            >
              <ApperIcon name={mode.icon} className="w-4 h-4" />
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SortControls;