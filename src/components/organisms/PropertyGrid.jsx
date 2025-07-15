import { motion } from "framer-motion";
import PropertyCard from "@/components/molecules/PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { cn } from "@/utils/cn";

const PropertyGrid = ({ 
  properties, 
  loading, 
  error, 
  onRetry,
  onClearFilters,
  className 
}) => {
  if (loading) {
    return <Loading variant="grid" className={className} />;
  }

  if (error) {
    return (
      <Error
        variant="card"
        message="Failed to Load Properties"
        description={error}
        onRetry={onRetry}
        className={className}
      />
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <Empty
        variant="card"
        icon="Home"
        title="No Properties Found"
        description="We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms."
        actionLabel="Clear Filters"
        onAction={onClearFilters}
        className={className}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}
    >
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PropertyGrid;