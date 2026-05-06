import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tab } from '@/constants/data';
import { BUBBLE_BG, GLASS_BG, ACTIVE_COLOR, INACTIVE_COLOR, ITEM_H, V_PAD, TAB_H, TAB_R, ITEM_R } from '@/constants/theme';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const CustomNavBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom + 22, 20);

  return (
    <View style={[styles.wrapper, { bottom }]}>
      <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFillObject} />
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: GLASS_BG }]} />
      <View style={[StyleSheet.absoluteFillObject, styles.border]} />

      {state.routes.map((route, index) => {
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const tabItem = tab.find((t) => t.name === route.name);
        const Icon = tabItem?.icon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? BUBBLE_BG : 'transparent' },
            ]}
          >
            {Icon ? (
              <Icon
                size={26}
                strokeWidth={isFocused ? 2 : 1.5}
                color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
            ) : null}

            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.label}
              >
                {label as string}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    // No left/right — let content width determine the pill size
    alignSelf: 'center',
    height: TAB_H,
    borderRadius: TAB_R,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: V_PAD,
  },
  border: {
    borderRadius: TAB_R,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    borderTopColor: 'rgba(255,255,255,0.22)',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_H,
    paddingHorizontal: 14,
    borderRadius: ITEM_R,
    gap: 6,
  },
  label: {
    color: ACTIVE_COLOR,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});

export default CustomNavBar;