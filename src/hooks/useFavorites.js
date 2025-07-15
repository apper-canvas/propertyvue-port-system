import { useState, useEffect } from "react";
import favoriteService from "@/services/api/favoriteService";

const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const ids = await favoriteService.getFavoritePropertyIds();
      setFavoriteIds(ids);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const toggleFavorite = async (propertyId) => {
    try {
      const isFav = favoriteIds.includes(propertyId);
      
      if (isFav) {
        await favoriteService.removeFavorite(propertyId);
        setFavoriteIds(prev => prev.filter(id => id !== propertyId));
      } else {
        await favoriteService.addFavorite(propertyId);
        setFavoriteIds(prev => [...prev, propertyId]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const isFavorite = (propertyId) => {
    return favoriteIds.includes(propertyId);
  };

  return {
    favoriteIds,
    loading,
    error,
    toggleFavorite,
    isFavorite,
    retry: loadFavorites
  };
};

export default useFavorites;