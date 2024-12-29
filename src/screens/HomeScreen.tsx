import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {RootState} from '../redux/store';
import Header from '../components/Header';
import TabButtons from '../components/TabButtons';
import COLORS from '../constants/colors';
import HorizontalGameList from '../components/HorizontalGameList';
import FavoritesGameList from '../components/FavoritesGameList';

const HomeScreen = () => {
  const games = useSelector((state: RootState) => state.games.games);
  const [activeTab, setActiveTab] = useState('See All Games');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    console.log('Active Tab:', tab);
  };

  const groupGamesInRows = (gamesItem: string | any[], itemsPerRow: number) => {
    const rows = [];
    for (let i = 0; i < gamesItem.length; i += itemsPerRow) {
      rows.push(gamesItem.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const favoriteGames = games
    .flatMap(category => category.data)
    .filter(game => game.isFavorite);
  const groupedGames = groupGamesInRows(favoriteGames, 3);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.tabContainer}>
        <TabButtons onTabPress={handleTabPress} />
        {activeTab === 'See All Games' ? (
          <HorizontalGameList games={games} />
        ) : (
          <FavoritesGameList games={games} groupedGames={groupedGames} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LISTBACKGROUND,
  },
  tabContainer: {
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;
