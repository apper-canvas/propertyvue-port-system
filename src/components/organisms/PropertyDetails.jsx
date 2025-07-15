import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ImageGallery from "@/components/molecules/ImageGallery";
import useFavorites from "@/hooks/useFavorites";
import { cn } from "@/utils/cn";

const PropertyDetails = ({ property, className }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isPropertyFavorite = isFavorite(property.Id);

  const handleFavoriteClick = async () => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white rounded-lg shadow-card overflow-hidden", className)}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              {property.title}
            </h1>
            <p className="text-gray-600 flex items-center">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
              {property.address}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-display font-bold gradient-primary bg-clip-text text-transparent">
                {formatPrice(property.price)}
              </div>
              <div className="text-sm text-gray-500">
                Listed {formatDate(property.listedDate)}
              </div>
            </div>
            
            <Button
              onClick={handleFavoriteClick}
              variant={isPropertyFavorite ? "accent" : "outline"}
              size="lg"
              className="flex items-center gap-2"
            >
              <ApperIcon 
                name="Heart" 
                className={cn(
                  "w-4 h-4",
                  isPropertyFavorite && "fill-current"
                )} 
              />
              {isPropertyFavorite ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="p-6 border-b border-gray-200">
        <ImageGallery images={property.images} />
      </div>

      {/* Property Stats */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Bed" className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-display font-bold text-gray-900">
              {property.bedrooms}
            </div>
            <div className="text-sm text-gray-600">
              Bedroom{property.bedrooms !== 1 ? "s" : ""}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Bath" className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-display font-bold text-gray-900">
              {property.bathrooms}
            </div>
            <div className="text-sm text-gray-600">
              Bathroom{property.bathrooms !== 1 ? "s" : ""}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Square" className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-display font-bold text-gray-900">
              {property.squareFeet?.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              Square Feet
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Home" className="w-6 h-6 text-primary" />
            </div>
            <div className="text-lg font-display font-bold text-gray-900">
              {property.propertyType}
            </div>
            <div className="text-sm text-gray-600">
              Property Type
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
          Description
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Features */}
      <div className="p-6">
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
          Features & Amenities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {property.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center space-x-3"
            >
              <ApperIcon name="Check" className="w-5 h-5 text-success" />
              <span className="text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;