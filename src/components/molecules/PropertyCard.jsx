import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import useFavorites from "@/hooks/useFavorites";
import { cn } from "@/utils/cn";

const PropertyCard = ({ property, className }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isPropertyFavorite = isFavorite(property.Id);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await toggleFavorite(property.Id);
      toast.success(
        isPropertyFavorite ? "Removed from favorites" : "Added to favorites",
        { position: "top-right" }
      );
    } catch (error) {
      toast.error("Failed to update favorites", { position: "top-right" });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn("group", className)}
    >
      <Link to={`/property/${property.Id}`}>
        <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Image Overlay */}
            <div className="absolute inset-0 image-overlay" />
            
            {/* Price Badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="accent" size="lg" className="font-bold">
                {formatPrice(property.price)}
              </Badge>
            </div>
            
            {/* Favorite Button */}
            <motion.button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon
                name={isPropertyFavorite ? "Heart" : "Heart"}
                className={cn(
                  "w-5 h-5 transition-colors",
                  isPropertyFavorite ? "text-accent fill-current" : "text-gray-600"
                )}
              />
            </motion.button>
            
            {/* Property Type Badge */}
            <div className="absolute bottom-4 left-4">
              <Badge variant="primary" size="sm">
                {property.propertyType}
              </Badge>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 line-clamp-1">
              {property.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-1 flex items-center">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-1 text-gray-400" />
              {property.address}
            </p>
            
            {/* Property Details */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
                  {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
                  {property.bathrooms} bath{property.bathrooms !== 1 ? "s" : ""}
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Square" className="w-4 h-4 mr-1" />
                  {property.squareFeet?.toLocaleString()} sq ft
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;