import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';
export const saveFavorite = async (id: string) => {
  try {
    // Get the current favorites
    const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites: any[] = storedFavorites ? JSON.parse(storedFavorites) : [];
    // Check if ID is already in the favorites
    if (favorites.includes(id)) {
      // Remove it from favorites if it exists
      const updatedFavorites = favorites.filter(
        (favId: string) => favId !== id,
      );
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );
      return updatedFavorites;
    } else {
      // Add it to favorites if it doesn't exist
      const updatedFavorites = [...favorites, id];
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );
      return updatedFavorites;
    }
  } catch (e) {
    console.error('Failed to update favorite', e);
    return [];
  }
};

export const getFavorites = async () => {
  try {
    const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (e) {
    console.error('Failed to fetch favorites', e);
  }
};
