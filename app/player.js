import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Slider from '@react-native-community/slider';
import COLORS from '../constants/colors';
import { useAudio } from '../context/AudioProvider';
import { useFavorites } from '../context/FavoritesProvider';

const PlayerScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { status, player, loadTrack, currentTrack, toggleMute, isMuted } = useAudio();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const isTrackFavorite = currentTrack ? isFavorite(currentTrack.id) : false;

  useEffect(() => {
    // If there's a track in the params and it's different from the current one, load it.
    if (params.audio && params.audio !== currentTrack?.audio) {
      loadTrack(params);
    }
  }, [params.audio]);

  const handlePlayPause = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleToggleFavorite = () => {
    if (!currentTrack) return;
    if (isTrackFavorite) {
      removeFavorite(currentTrack.id);
    } else {
      addFavorite(currentTrack);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === null) {
        return '00:00';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // If there's no current track, we can show a loading or empty state.
  if (!currentTrack) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.accent} />
          <Text style={{ color: COLORS.textPrimary, marginTop: 10 }}>Loading track...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const headerTitle = currentTrack.type;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground source={{ uri: currentTrack.image }} style={styles.mainImage} imageStyle={{ borderRadius: 12 }} />

        <Text style={styles.title}>{currentTrack.title}</Text>
        <Text style={styles.subtitle}>{currentTrack.subtitle}</Text>

        <View style={styles.sliderWrapper}>
          <Slider
            style={styles.sliderContainer}
            value={status.currentTime}
            maximumValue={status.duration}
            onSlidingComplete={(value) => player.seekTo(value)}
            minimumTrackTintColor="#D4AF37"
            maximumTrackTintColor="#2E3A4A"
            thumbTintColor="white"
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(status.currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(status.duration)}</Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <Ionicons name={isTrackFavorite ? 'heart' : 'heart-outline'} size={36} color={isTrackFavorite ? COLORS.primaryAccent : COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => player.seekTo(status.currentTime - 10)}>
            <Ionicons name="play-back" size={36} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
            {status.isBuffering ? (
              <ActivityIndicator size="large" color={'#0B0724'} />
            ) : (
              <Ionicons name={status.playing ? 'pause' : 'play'} size={48} color={'#0B0724'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => player.seekTo(status.currentTime + 30)}>
            <Ionicons name="play-forward" size={36} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMute}>
            <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={36} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>




      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  mainImage: {
    width: '100%',
    height: 320,
    marginTop: 16,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
  subtitle: {
    color: 'rgba(245, 245, 245, 0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  sliderWrapper: {
    width: '100%',
    marginTop: 32,
  },
  sliderContainer: {
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8, // Adjusted to align with slider visual
  },
  timeText: {
    color: COLORS.mediaTimeLabels,
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.mediaPlayButton,
    justifyContent: 'center',
    alignItems: 'center',
  },


});

export default PlayerScreen;