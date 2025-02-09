// src/screens/SplashScreen.js
import React, {useEffect, useRef, useState} from 'react';
import {View, StatusBar, Animated, Dimensions} from 'react-native';
import Logo from '../../../assests/logo.svg';
import {useAppSelector} from '../../hooks/useRedux';

const SplashScreen = ({navigation, isSignedIn}: any) => {
  const screenHeight = Dimensions.get('window').height;
  const initialTranslateY = -screenHeight; // Start above screen
  const finalScale = Math.max((screenHeight / 100) * 2, 35); // Adjust scale based on screen height

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(initialTranslateY)).current;
  const [statusBarColor, setStatusBarColor] = useState('#FFAF19');

  useEffect(() => {
    const animation = Animated.sequence([
      // Step 1: Bounce drop
      Animated.spring(translateYAnim, {
        toValue: 0,
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }),
      // Step 2: Zoom in and expand
      Animated.timing(scaleAnim, {
        toValue: finalScale,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    animation.start(() => {
      // Step 3: Navigate after animations
      navigation.replace(isSignedIn ? 'Main' : 'Login');
    });

    // Update status bar color during zoom phase
    scaleAnim.addListener(({value}) => {
      const threshold = finalScale * 0.5;
      setStatusBarColor(value >= threshold ? '#FFAF19' : 'white');
    });

    return () => {
      scaleAnim.removeAllListeners();
    };
  }, [navigation, isSignedIn, scaleAnim, translateYAnim, finalScale]);

  return (
    <View style={{flex: 1, backgroundColor: statusBarColor}}>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={statusBarColor === 'white' ? 'dark-content' : 'light-content'}
      />
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{translateY: translateYAnim}, {scale: scaleAnim}],
        }}>
        <Logo width={200} height={200} />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
