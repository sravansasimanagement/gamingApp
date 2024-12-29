import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import GameCard from './GameCard';
import COLORS from '../constants/colors';

const HorizontalGameList = ({games}: {games: any[]}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={games}
      keyExtractor={parentItem => parentItem.id}
      renderItem={({item: parentItem}) => (
        <View style={styles.horizontalItem}>
          {/* Top Section with Icon and Heading */}
          <View style={styles.topSection}>
            <Image
              source={
                parentItem.id == '1'
                  ? require('../../assets/images/popularGame.png')
                  : parentItem.id == '2'
                  ? require('../../assets/images/americanFlag.png')
                  : require('../../assets/images/playIcon.png')
              }
              style={styles.icon}
            />
            <Text style={styles.heading}>{parentItem.title}</Text>
          </View>

          {/* Nested FlatList */}
          <View style={[styles.listContainer]}>
            <FlatList
              data={parentItem.data}
              horizontal
              keyExtractor={verticalItem => verticalItem.id}
              renderItem={({item, index}) => (
                <GameCard
                  game={item}
                  onPress={() => navigation.navigate('GamePlay', {game: item})}
                  categoryId={parentItem.id}
                  rating={index + 1}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  horizontalItem: {
    marginVertical: 5,
    borderRadius: 8,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LISTBACKGROUND,
    marginBottom: 8,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  listContainer: {
    marginLeft: 1,
  },
});

export default HorizontalGameList;
