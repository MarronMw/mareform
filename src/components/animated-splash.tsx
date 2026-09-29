import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet } from 'react-native';

type Props = {
  ready: boolean;        // app finished loading (fonts, auth, etc.)
  onFinish: () => void;  // called after the exit animation, so you can unmount
};

const BG = '#0B1F3A'; // use the same color as the native splash

export function AnimatedSplash({ ready, onFinish }: Props) {
  const [introDone, setIntroDone] = useState(false);

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(20)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const exit = useRef(new Animated.Value(0)).current;

  // Intro: logo pops in, then the title slides up
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(titleY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ]).start(() => setIntroDone(true));
  }, []);

  // Pulsing ring overlay behind the logo
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 1600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, []);

  // Exit: only once the intro has played AND the app is ready
  useEffect(() => {
    if (!introDone || !ready) return;
    Animated.timing(exit, {
      toValue: 1,
      duration: 400,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => finished && onFinish());
  }, [introDone, ready]);

  return (
    <Animated.View
      // Hide the native splash only after this overlay has rendered, so there's no flash
      onLayout={() => SplashScreen.hide()}
      style={[
        styles.container,
        {
          opacity: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
          transform: [{ scale: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) }],
        },
      ]}
    >
      {/* Overlay layers */}
      <Animated.View style={[styles.blob, styles.blobTopRight]} />
      <Animated.View style={[styles.blob, styles.blobBottomLeft]} />
      <Animated.View
        style={[
          styles.ring,
          {
            opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] }),
            transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.8] }) }],
          },
        ]}
      />

      {/* Content */}
      <Animated.View style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/dyuni_logo.png')}
          resizeMode="contain"
        />
      </Animated.View>
      {/* <Animated.Text
        style={[styles.title, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}
      >
        // Ma Reform
      </Animated.Text> */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  logo: { width: 200, height: 100 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20, color: '#fff' },
  ring: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: '#4C8BF5',
  },
  blob: { position: 'absolute', borderRadius: 999, backgroundColor: '#4C8BF5' },
  blobTopRight: { width: 260, height: 260, top: -90, right: -90, opacity: 0.12 },
  blobBottomLeft: { width: 200, height: 200, bottom: -70, left: -70, opacity: 0.08 },
});