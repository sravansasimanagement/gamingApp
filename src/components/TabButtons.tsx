import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import COLORS from '../constants/colors';
import STRINGCONSTANT from '../constants/stringConstant';

const TabButtons = ({onTabPress}: {onTabPress: (tab: string) => void}) => {
  const [activeTab, setActiveTab] = useState('See All Games');

  const handlePress = (tab: string) => {
    setActiveTab(tab);
    onTabPress(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === STRINGCONSTANT.SEEALLGAMES && styles.activeButton,
          ]}
          onPress={() => handlePress(STRINGCONSTANT.SEEALLGAMES)}>
          <Image
            source={require('../../assets/images/border_all.png')}
            style={styles.icon}
          />
          <Text
            style={[
              styles.text,
              activeTab === STRINGCONSTANT.SEEALLGAMES && styles.activeText,
            ]}>
            {STRINGCONSTANT.SEEALLGAMES}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === STRINGCONSTANT.FAVORITES && styles.activeButton,
          ]}
          onPress={() => handlePress(STRINGCONSTANT.FAVORITES)}>
          <Image
            source={require('../../assets/images/favorite.png')}
            style={styles.icon}
          />
          <Text
            style={[
              styles.text,
              activeTab === STRINGCONSTANT.FAVORITES && styles.activeText,
            ]}>
            {STRINGCONSTANT.FAVORITES}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  background: {
    flexDirection: 'row',
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
  },
  activeButton: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.TEXT,
  },
  text: {
    color: COLORS.TEXT,
    fontWeight: 'bold',
    paddingLeft: 8,
  },
  activeText: {
    color: COLORS.TEXT,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabButtons;
