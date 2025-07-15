import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  className, 
  onSearch, 
  placeholder = "Search by location, property type, or address...",
  value: initialValue = "",
  showButton = true
}) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
    // Trigger search on every keystroke for real-time filtering
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={cn("relative flex items-center gap-2", className)}
    >
      <div className="relative flex-1">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          className="pl-10 pr-4"
          size="lg"
        />
      </div>
      
      {showButton && (
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="px-6"
        >
          <ApperIcon name="Search" className="w-4 h-4" />
        </Button>
      )}
    </motion.form>
  );
};

export default SearchBar;