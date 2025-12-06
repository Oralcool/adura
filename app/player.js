import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import COLORS from '../constants/colors';

// This is a temporary slider simulation
const Slider = () => (
  <View style={styles.sliderContainer}>
    <View style={styles.sliderTrack}>
      <View style={styles.sliderProgress} />
    </View>
    <View style={styles.sliderThumb} />
  </View>
);

const PlayerScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Use dummy data if params are not available, for testing
  const item = {
    title: params.title || 'The Story of David',
    subtitle: params.subtitle || 'A journey of faith, courage, and divine guidance.',
    image: params.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_7oJslpLjjyaqNc5ELZAM4QjlHkEL-fEyfCPZb_WCpITcJebBKZ3eJShKIntyUJgaYpd_voN0tB0JgZNiuu7eKhbp0fIXoPcBNcG1HKxKBFLv_aE7xZ4ItsUDNYXaDVL5y_-x65g6c-AZqahnZjlta45OamAeR9mmr3gNs4vGCey7DBBWiJIBfLnyBZmNf7uOlFTH3f_9tTDa3IglP0J9cvYLI7HftCNekpx6r9EX9stod69CT-UsVC6ENM7ZotEs_2M8tWy87TWl',
    duration: params.duration || '18:40',
    audio: params.audio || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    sourceScreen: params.sourceScreen || 'sleep', // Default to 'sleep' for "Bedtime Story"
  };

  const headerTitle = item.sourceScreen === 'stories' ? 'Bible Story' : 'Bedtime Story';

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
        <ImageBackground source={{ uri: item.image }} style={styles.mainImage} imageStyle={{ borderRadius: 12 }} />

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>

        <View style={styles.sliderWrapper}>
          <Slider />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>03:15</Text>
            <Text style={styles.timeText}>{item.duration}</Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity>
            <Ionicons name="replay-10" size={36} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playPauseButton}>
            <Ionicons name="pause" size={48} color={'#0B0724'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="forward-30" size={36} color={COLORS.textPrimary} />
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
    height: 20,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
    borderRadius: 2,
  },
  sliderProgress: {
    height: 4,
    backgroundColor: '#E4B47C',
    width: '17%',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    left: '17%',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    marginLeft: -8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
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