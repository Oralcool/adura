import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useAudio } from '../context/AudioProvider';
import COLORS from '../constants/colors';

const FloatingPlayer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentTrack, status, player, unloadTrack } = useAudio();

  const handlePlayPause = (e) => {
    e.stopPropagation(); // Don't trigger the container's onPress
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleClose = (e) => {
    e.stopPropagation(); // Don't trigger the container's onPress
    unloadTrack();
  };

  const handlePress = () => {
    if (currentTrack) {
        router.push({
            pathname: '/player',
            params: { ...currentTrack }
        });
    }
  };

  if (!currentTrack || pathname === '/player') {
    return null;
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container} activeOpacity={0.9}>
      <Image source={{ uri: currentTrack.image }} style={styles.image} />
      <View style={styles.trackInfo}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{currentTrack.subtitle}</Text>
      </View>
      <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
        <Ionicons name={status.playing ? 'pause' : 'play'} size={24} color={COLORS.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClose} style={styles.playPauseButton}>
        <Ionicons name="close" size={24} color={COLORS.textPrimary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 95, // Adjusted to move it further up from the tab bar
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#36454F',
    padding: 8,
    borderRadius: 12,
    height: 70,
    zIndex: 1, // Ensure it floats above other content
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  playPauseButton: {
    padding: 10,
    marginLeft: 10,
  },
});

export default FloatingPlayer;
