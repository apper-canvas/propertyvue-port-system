import propertiesData from "@/services/mockData/properties.json";

class PropertyService {
  constructor() {
    this.properties = [...propertiesData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.properties]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const property = this.properties.find(p => p.Id === parseInt(id));
        if (property) {
          resolve({ ...property });
        } else {
          reject(new Error("Property not found"));
        }
      }, 200);
    });
  }

  async searchProperties(filters) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProperties = [...this.properties];

        // Filter by price range
        if (filters.priceMin) {
          filteredProperties = filteredProperties.filter(p => p.price >= filters.priceMin);
        }
        if (filters.priceMax) {
          filteredProperties = filteredProperties.filter(p => p.price <= filters.priceMax);
        }

        // Filter by property types
        if (filters.propertyTypes && filters.propertyTypes.length > 0) {
          filteredProperties = filteredProperties.filter(p => 
            filters.propertyTypes.includes(p.propertyType)
          );
        }

        // Filter by minimum bedrooms
        if (filters.bedroomsMin) {
          filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.bedroomsMin);
        }

        // Filter by minimum bathrooms
        if (filters.bathroomsMin) {
          filteredProperties = filteredProperties.filter(p => p.bathrooms >= filters.bathroomsMin);
        }

        // Filter by location (simple text search)
        if (filters.location) {
          filteredProperties = filteredProperties.filter(p => 
            p.address.toLowerCase().includes(filters.location.toLowerCase()) ||
            p.title.toLowerCase().includes(filters.location.toLowerCase())
          );
        }

        resolve(filteredProperties);
      }, 400);
    });
  }

  async sortProperties(properties, sortBy) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let sortedProperties = [...properties];

        switch (sortBy) {
          case "price-low":
            sortedProperties.sort((a, b) => a.price - b.price);
            break;
          case "price-high":
            sortedProperties.sort((a, b) => b.price - a.price);
            break;
          case "newest":
            sortedProperties.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
            break;
          case "oldest":
            sortedProperties.sort((a, b) => new Date(a.listedDate) - new Date(b.listedDate));
            break;
          case "bedrooms":
            sortedProperties.sort((a, b) => b.bedrooms - a.bedrooms);
            break;
          case "size":
            sortedProperties.sort((a, b) => b.squareFeet - a.squareFeet);
            break;
          default:
            // Default sort by newest
            sortedProperties.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
        }

        resolve(sortedProperties);
      }, 100);
    });
  }

  create(property) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProperty = {
          ...property,
          Id: Math.max(...this.properties.map(p => p.Id)) + 1,
          listedDate: new Date().toISOString()
        };
        this.properties.push(newProperty);
        resolve({ ...newProperty });
      }, 300);
    });
  }

  update(id, propertyData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.properties.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          this.properties[index] = { ...this.properties[index], ...propertyData };
          resolve({ ...this.properties[index] });
        } else {
          reject(new Error("Property not found"));
        }
      }, 300);
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.properties.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          this.properties.splice(index, 1);
          resolve();
        } else {
          reject(new Error("Property not found"));
        }
      }, 300);
    });
  }
}

export default new PropertyService();