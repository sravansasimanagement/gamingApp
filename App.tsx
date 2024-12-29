import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import GamePlayScreen from './src/screens/GamePlayScreen';
import {useAppDispatch} from './src/hooks/useAppDispatch';
import {getFavorites} from './src/utils/storage';
import gameList from './src/constants/gameList';
import {setFavorites} from './src/redux/gamesSlice';

const Stack = createStackNavigator();

const AppInitializer = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();

  const updateGameListWithFavorites = (
    gameList: any[],
    favorites: string[],
  ) => {
    return gameList.map(category => ({
      ...category,
      data: category.data.map((game: {id: string}) => ({
        ...game,
        isFavorite: favorites.includes(game.id),
      })),
    }));
  };
  useEffect(() => {
    const initializeFavorites = async () => {
      const favorites = await getFavorites();
      const updatedGameList = updateGameListWithFavorites(gameList, favorites);
      dispatch(setFavorites(updatedGameList));
    };
    initializeFavorites();
  }, [dispatch]);
  return <>{children}</>;
};

const App = () => {
  return (
    <Provider store={store}>
      <AppInitializer>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="GamePlay" component={GamePlayScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppInitializer>
    </Provider>
  );
};

export default App;
