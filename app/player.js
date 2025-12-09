import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Slider from '@react-native-community/slider';
import COLORS from '../constants/colors';
import { useAudio } from '../context/AudioProvider';

const PlayerScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { status, player, loadTrack, currentTrack } = useAudio();

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

  const headerTitle = currentTrack.sourceScreen === 'stories' ? 'Bible Story' : 'Bedtime Story';

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
            minimumTrackTintColor="#E4B47C"
            maximumTrackTintColor="rgba(245, 245, 245, 0.2)"
            thumbTintColor="white"
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(status.currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(status.duration)}</Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
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
        </View>

        <View style={styles.secondaryControls}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.customizationControls}>
          <TouchableOpacity style={styles.customButton}>
            <Ionicons name="moon-outline" size={20} color={COLORS.textPrimary} />
            <Text style={styles.customButtonText}>Sleep Mode</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.customButton}>
            <Ionicons name="musical-notes-outline" size={20} color={COLORS.textPrimary} />
            <Text style={styles.customButtonText}>Background Sound</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0724',
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
    color: 'rgba(245, 245, 245, 0.6)',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginTop: 24,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E4B47C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 24,
  },
  customizationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.1)',
    borderRadius: 999,
    padding: 8,
    marginTop: 32,
    marginBottom: 16,
  },
  customButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  customButtonText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
  },
});

export default PlayerScreen;