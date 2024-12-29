import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import COLORS from '../constants/colors';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {toggleFavorite} from '../redux/gamesSlice';
import {saveFavorite} from '../utils/storage';
import StylishToast from '../components/StylishToast';
import STRINGCONSTANT from '../constants/stringConstant';

const GamePlayScreen = () => {
  const route = useRoute();
  const {game} = route.params as any;
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(game.isFavorite);
  const navigation = useNavigation();

  const favoriteAsyncUpdate = async (id: any) => {
    const updatedFavorites = await saveFavorite(id);
    setIsFavorite(updatedFavorites.includes(id));
    StylishToast(
      isFavorite
        ? STRINGCONSTANT.REMOVEDFAVORITE
        : STRINGCONSTANT.ADDEDFAVORITE,
    );
  };

  const playToast = () => {
    StylishToast('Play action');
  };

  return (
    <ImageBackground
      source={game.image}
      style={styles.background}
      resizeMode="cover">
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/images/backIcon.png')} // Replace with your back button icon
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Favorite Icon */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => {
          dispatch(toggleFavorite(game.id));
          favoriteAsyncUpdate(game.id);
        }}>
        {isFavorite ? (
          <Image
            source={require('../../assets/images/favoriteIcon.png')}
            style={styles.icon}
          />
        ) : (
          <Image
            source={require('../../assets/images/defaultFavoriteIcon.png')}
            style={styles.icon}
          />
        )}
      </TouchableOpacity>

      {/* Title and Description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.description}>{game.description}</Text>
      </View>
      <TouchableOpacity style={styles.buttonView} onPress={playToast}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  textContainer: {
    position: 'absolute',
    bottom: 250,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: COLORS.WHITE,
  },
  favoriteButton: {
    position: 'absolute',
    top: 25,
    right: 25,
    backgroundColor: COLORS.WHITE,
    borderRadius: 35,
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  buttonView: {
    position: 'absolute',
    bottom: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.BUTTONCOLOR,
    width: 150,
    height: 40,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 25,
    backgroundColor: COLORS.WHITE,
    borderRadius: 35,
    padding: 10,
  },
});

export default GamePlayScreen;
