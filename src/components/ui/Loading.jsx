import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Loading = ({ className, variant = "grid" }) => {
  if (variant === "grid") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-card overflow-hidden"
          >
            {/* Image skeleton */}
            <div className="aspect-[16/10] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer" />
            
            {/* Content skeleton */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-2/3" />
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-8" />
              </div>
              
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-3/4 mb-3" />
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-12" />
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-12" />
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-16" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div className={cn("max-w-6xl mx-auto", className)}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-card overflow-hidden"
        >
          {/* Header skeleton */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start mb-4">
              <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-1/2" />
              <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-8" />
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-2/3" />
          </div>
          
          {/* Image gallery skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="aspect-[16/10] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer" />
              ))}
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-full" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-3/4" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-5/6" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;