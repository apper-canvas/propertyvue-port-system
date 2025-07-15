import favoritesData from "@/services/mockData/favorites.json";

class FavoriteService {
  constructor() {
    this.favorites = [...favoritesData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.favorites]);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const favorite = this.favorites.find(f => f.Id === parseInt(id));
        if (favorite) {
          resolve({ ...favorite });
        } else {
          reject(new Error("Favorite not found"));
        }
      }, 200);
    });
  }

  async addFavorite(propertyId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = this.favorites.find(f => f.propertyId === parseInt(propertyId));
        if (exists) {
          reject(new Error("Property already in favorites"));
          return;
        }

        const newFavorite = {
          Id: Math.max(...this.favorites.map(f => f.Id), 0) + 1,
          propertyId: parseInt(propertyId),
          savedDate: new Date().toISOString()
        };
        this.favorites.push(newFavorite);
        resolve({ ...newFavorite });
      }, 300);
    });
  }

  async removeFavorite(propertyId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.favorites.findIndex(f => f.propertyId === parseInt(propertyId));
        if (index !== -1) {
          this.favorites.splice(index, 1);
          resolve();
        } else {
          reject(new Error("Favorite not found"));
        }
      }, 300);
    });
  }

  async isFavorite(propertyId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const exists = this.favorites.some(f => f.propertyId === parseInt(propertyId));
        resolve(exists);
      }, 100);
    });
  }

  async getFavoritePropertyIds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const propertyIds = this.favorites.map(f => f.propertyId);
        resolve(propertyIds);
      }, 100);
    });
  }

  create(favorite) {
    return this.addFavorite(favorite.propertyId);
  }

  update(id, favoriteData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.favorites.findIndex(f => f.Id === parseInt(id));
        if (index !== -1) {
          this.favorites[index] = { ...this.favorites[index], ...favoriteData };
          resolve({ ...this.favorites[index] });
        } else {
          reject(new Error("Favorite not found"));
        }
      }, 300);
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.favorites.findIndex(f => f.Id === parseInt(id));
        if (index !== -1) {
          this.favorites.splice(index, 1);
          resolve();
        } else {
          reject(new Error("Favorite not found"));
        }
      }, 300);
    });
  }
}

export default new FavoriteService();