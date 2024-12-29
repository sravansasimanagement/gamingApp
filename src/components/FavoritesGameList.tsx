import React from 'react';
import {View, FlatList, Text, Image, StyleSheet} from 'react-native';

import GameCard from './GameCard';
import {GameItem} from '../types';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';
import STRINGCONSTANT from '../constants/stringConstant';

const FavoritesGameList = ({
  games,
  groupedGames,
}: {
  games: Array<{id: string; title: string}>;
  groupedGames: GameItem[][];
}) => {
  const navigation = useNavigation();

  // Function to filter games for id === "3"
  const getGamesForId3 = () => {
    return games.filter(game => game.id === '3');
  };
  return (
    <View style={styles.listContainer}>
      {getGamesForId3().map(game => (
        <View style={styles.horizontalItem} key={game.id}>
          {groupedGames.length > 0 ? (
            <View style={styles.topSection}>
              <Image
                source={require('../../assets/images/favoriteIcon.png')}
                style={styles.icon}
              />
              <Text style={styles.heading}>{game.title}</Text>
            </View>
          ) : (
            <View style={styles.topSectionCenter}>
              <Text style={styles.heading}>{STRINGCONSTANT.NOFAVORITE}</Text>
            </View>
          )}
        </View>
      ))}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <FlatList
          data={groupedGames}
          keyExtractor={(item, index) => `row-${index}`}
          renderItem={({item}) => (
            <View style={styles.row}>
              {item.map((game: GameItem) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPress={() => navigation.navigate('GamePlay', {game})}
                />
              ))}
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LISTBACKGROUND,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  horizontalItem: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  listContainer: {
    flex: 1,
    backgroundColor: COLORS.LISTBACKGROUND,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  topSectionCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.LISTBACKGROUND,
    paddingTop: 50,
  },
});

export default FavoritesGameList;
