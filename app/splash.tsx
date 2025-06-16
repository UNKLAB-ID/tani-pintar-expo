import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useProfile } from '@/hooks/useProfile';

const SplashScreen = () => {
  const router = useRouter();
  const { data: profile, isLoading, isError } = useProfile();

  useEffect(() => {
    const handleNavigation = () => {
      // If still loading, wait
      if (isLoading) return; // If profile data is available, user is authenticated - go to social media tab
      if (profile && !isError) {
        router.replace('/(tabs)/sosmed');
        return;
      }

      // If no profile data or error, go to login
      router.replace('/login');
    };

    // Add a minimum splash screen display time
    const timer = setTimeout(handleNavigation, 2000);

    return () => clearTimeout(timer);
  }, [isLoading, profile, isError, router]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.innerContainer}>
        <Image
          source={require('../assets/LOGO ICON white.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>TANI PINTAR</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D5c32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  logo: {
    width: 200,
    height: 273,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SplashScreen;
