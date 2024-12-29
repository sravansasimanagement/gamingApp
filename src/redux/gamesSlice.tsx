import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GameList} from '../types';
import gameList from '../constants/gameList';

interface GamesState {
  games: GameList;
}

const initialState: GamesState = {
  games: gameList,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<string[]>) {
      state.games = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const gameId = action.payload; // The ID of the game to update
      const gameCollection = state.games.find(game => {
        return game.data.find((gameItem: any) => gameItem.id === gameId);
      });
      // Find the specific game collection by id
      if (gameCollection) {
        // Iterate through the `data` array inside the found game collection
        gameCollection.data.forEach((game: any) => {
          if (game.id === action.payload) {
            game.isFavorite = !game.isFavorite; // Toggle the `isFavorite` value
          }
        });
      }
    },
  },
});

export const {toggleFavorite, setFavorites} = gamesSlice.actions;
export default gamesSlice.reducer;
