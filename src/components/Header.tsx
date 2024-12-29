import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import COLORS from '../constants/colors';
import gameList from '../constants/gameList';

const Header = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('GamePlay', {game: gameList[0].data[0]})
      }>
      <Image
        source={require('../../assets/images/header.png')}
        style={styles.image}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 300,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 20,
    color: COLORS.TEXT,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
});

export default Header;
