/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  Animated,
} from 'react-native';
import faker from 'faker';

const {width, height} = Dimensions.get('screen');

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men',
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

//Credits to

const BG_IMG =
  'https://images.pexels.com/photos/3875821/pexels-photo-3875821.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const FlatListAnimation = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFill}
        // blurRadius={10}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        data={DATA}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(225,225,225,0.9)',
                borderRadius: SPACING,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                transform: [{scale}],
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>
                  {item.jobTitle}
                </Text>
                <Text style={{fontSize: 12, opacity: 0.8, color: '#0099CC'}}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default FlatListAnimation;
