import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import {GameItem} from '../types';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {toggleFavorite} from '../redux/gamesSlice';
import COLORS from '../constants/colors';
import {saveFavorite} from '../utils/storage';
import StylishToast from './StylishToast';
import STRINGCONSTANT from '../constants/stringConstant';

interface GameCardProps {
  game: GameItem;
  onPress: () => void;
  categoryId?: string;
  rating?: number;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  onPress,
  categoryId,
  rating,
}) => {
  const dispatch = useAppDispatch();
  const favoriteAsyncUpdate = async (id: any) => {
    await dispatch(toggleFavorite(game.id));
    await saveFavorite(id);
    StylishToast(
      game.isFavorite
        ? STRINGCONSTANT.REMOVEDFAVORITE
        : STRINGCONSTANT.ADDEDFAVORITE,
    );
  };

  return (
    <>
      {categoryId === '2' ? (
        <TouchableOpacity style={styles.ratingCard} onPress={onPress}>
          <View style={styles.positionContainer}>
            <Image
              source={
                rating === 1
                  ? require('../../assets/images/rate1.png')
                  : require('../../assets/images/rate2.png')
              }
              style={styles.rateImage}
              resizeMode="cover"
            />
          </View>
          <View style={{flex: 5}}>
            <ImageBackground
              source={game.image}
              style={styles.image}
              imageStyle={styles.imageBorder}>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => {
                  favoriteAsyncUpdate(game.id);
                }}>
                {game.isFavorite ? (
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
              <View style={styles.info}>
                <Text style={styles.title}>{game.title}</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {game.description}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.card} onPress={onPress}>
          <ImageBackground
            source={game.image}
            style={styles.image}
            imageStyle={styles.imageBorder}>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => {
                favoriteAsyncUpdate(game.id);
              }}>
              {game.isFavorite ? (
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
            <View style={styles.info}>
              <Text style={styles.title}>{game.title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {game.description}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    width: (screenWidth - 40) / 3,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  ratingCard: {
    width: (screenWidth - 30) / 2,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageBorder: {
    borderRadius: 10,
  },
  favoriteButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    right: 5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 25,
    padding: 5,
  },
  favoriteText: {
    fontSize: 18,
    color: '#FFD700',
  },
  info: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: COLORS.DESCRIPTIONTEXT,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  positionContainer: {
    flex: 3,
    backgroundColor: COLORS.LISTBACKGROUND,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rateImage: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 30,
  },
});

export default GameCard;
