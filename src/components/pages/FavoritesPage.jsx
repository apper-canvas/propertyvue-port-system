import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import propertyService from "@/services/api/propertyService";
import favoriteService from "@/services/api/favoriteService";
import Header from "@/components/organisms/Header";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const FavoritesPage = () => {
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFavoriteProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get all favorites
      const favorites = await favoriteService.getAll();
      
      if (favorites.length === 0) {
        setFavoriteProperties([]);
        return;
      }

      // Get properties for each favorite
      const properties = await Promise.all(
        favorites.map(async (favorite) => {
          try {
            return await propertyService.getById(favorite.propertyId);
          } catch (err) {
            console.warn(`Failed to load property ${favorite.propertyId}:`, err);
            return null;
          }
        })
      );

      // Filter out any null properties
      const validProperties = properties.filter(Boolean);
      setFavoriteProperties(validProperties);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavoriteProperties();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading variant="grid" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error
            variant="card"
            message="Failed to Load Favorites"
            description={error}
            onRetry={loadFavoriteProperties}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Favorite Properties
          </h1>
          <p className="text-gray-600">
            Properties you've saved for later viewing
          </p>
        </motion.div>

        {/* Favorites Grid */}
        {favoriteProperties.length === 0 ? (
          <Empty
            variant="card"
            icon="Heart"
            title="No Favorites Yet"
            description="Start browsing properties and save your favorites to see them here. Use the heart icon on any property to add it to your favorites."
            actionLabel="Browse Properties"
            onAction={() => window.location.href = '/'}
          />
        ) : (
          <PropertyGrid
            properties={favoriteProperties}
            loading={false}
            error={null}
            onRetry={loadFavoriteProperties}
          />
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;