import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import SuggestStoryModal from '../../components/SuggestStoryModal';

const newReleases = [
  {
    id: '1',
    title: 'The Good Samaritan',
    type: 'Bible Story',
    category: "Jesus' Teachings",
    subtitle: 'A story of compassion and helping others in need',
    duration: '15:00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_XHV0SRzTNsscbeKuCEsnC_RtQsYMNYLCLk3EhcNf25Uj5DeFOua25KUsmUid4rPJ-td-H92XsE4jJ5OeBpAfdRLF5worTPk93VNtPR87y7ZR-g_wO0pcNe9MnCBKzz8jf044DlvSHppruzGJvVvVYY4sEWDrecHcdh5lropYssfbYVHCHaLrV2Vs_qzEiyUA60t5Voi55oB_-w5WZqLV1_DcaY9bGgvwLqQ2Jpc3SEsbGgWyPkOrAPkHuNXDn32yI4BvAd691nkd',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'David and Goliath',
    type: 'Bible Story',
    category: 'Old Testament',
    subtitle: 'A tale of courage and faith against all odds',
    duration: '12:00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2YKeiW_nxD-Pu7gyhsQJTrlYNgBOjIzLsJJZhUtb2L5fvBLq8ZaEwjfB8WbM-p7HGsr2HZKNTeLHz6D4ilgWIE_WW3B4wl3d8B1JIr8xRpeHTZlmGFzsVORgHb-kGChfkCsrxpWhw9Vt8ph-e1IEKQRTq3qd52dQ8A3G67nEJP17kqCa5xQuuzvHFOYeQ5vYXWzhR3Hpf5Zwi2ccDixizgHVSvcPsNENnuQe77jR8wmEuYtJaHUsrtQa1IJylnPzwb0y-R_kt0eWj',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'The Sleepy Shepherd',
    type: 'Bedtime Story',
    category: 'Sleep',
    subtitle: "A calming tale about a shepherd under the stars.",
    duration: '20:00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDn7YyX53p75wkK-vRcyrDabmBVW9dZLR8W2x1WP7gUa5VWubHGjYSaArzBpKErrzl17GosfPGWhr9qqd-UvhIGPX2zzF2bd-8jC8BYG4IZd65obr6FRukf23MgybGiD3PZNBoPeDamcHHy28DAaHLZmtzW2UeoCdb09q251tkB-FMfEPoQSejz9ssL-d1sFbgF7rcWIr0T9jJIUa2huMH5NsjSkkt1YD_WTNmyh0xRy7iJdSr-KN-AX1VgPJ5eYzdjLBAOjCMqLy3d',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: "Daniel in the Lion's Den",
    type: 'Bible Story',
    category: 'Prophets',
    subtitle: 'Faith and protection in the face of danger',
    duration: '18:00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXfM_9erAUPZLERrsVnu_s1XFy19lCEyY44NeicKwbq8HOdgtxUXh5MisJzi9QuEVjXNBudmEnOfm-XMnlUM5mDTJa6cVwWLxZHWP6uLAV16OITQKibOxzCzSSucj7b7-2sUrxZtK_pK4NUQgPXahKDYZ--R5n76tkXeW6Hnj3bphCv1rbUlVSHT0EADSSPubKEmV5_GjAM5SZz2WdL0CSRxPy951Nng5Gk_fFVAllVZCJZIS9L2ANrbTsgmCSLXeJhfzPA8d-C_G0',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
];

const popularStories = [...newReleases].reverse();
const recentlyPlayed = newReleases.slice(0, 2);

const StoryCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    <ImageBackground
      source={{ uri: item.image }}
      style={styles.cardImage}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={styles.cardOverlay} />
      <View style={styles.playButton}>
        <Ionicons name="play" size={24} color="white" />
      </View>
    </ImageBackground>
    <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
    <View style={styles.durationContainer}>
      <MaterialIcons name="schedule" size={14} color={COLORS.textSecondary} />
      <Text style={styles.cardDuration}>{item.duration.replace(':00', ' min')}</Text>
    </View>
  </TouchableOpacity>
);

const Home = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const story = {
    title: 'Journey of Faith: The Prodigal Son',
    subtitle:
      'Rediscover forgiveness and unconditional love in this timeless parable.',
    type: 'Bible Story',
    category: "Jesus' Teachings",
    duration: '14:00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGQPujiMucgSOVAAfKv_02V_Hw3bOOVwPzOe7815xV9H34cDGEkG2bZqoH08S8Q4WFp_kitO2iiSadlubdy0_iHHpdD_V4fv8Y2fi8bGBYJAKyjiPiIHJUmN0C2AJgpgS_JWBBAnxtaktTt7uZJJsfjhYQPSe02dboHu11FFOhQVyw9JdSp2XXE3Pde07LcofTZwR2mmigsKybDrEkBCKX7fOf65t-M9pOWApsqHXezu5eH6IyCBTMpInCVoE6UoM_zNGUggixYJiA',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  };

  const handlePress = (item) => {
    router.push({
      pathname: '/player',
      params: {
        title: item.title,
        subtitle: item.subtitle,
        image: item.image,
        duration: item.duration,
        audio: item.audio,
        type: item.type, // Pass the story type
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Good Morning, Adeyinka</Text>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Ionicons
              name="person-circle-outline"
              size={28}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <ImageBackground
            source={{
              uri: story.image,
            }}
            style={styles.heroCard}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroContent}>
              <View>
                <Text style={styles.heroTitle}>{story.title}</Text>
                <Text style={styles.heroSubtitle}>{story.subtitle}</Text>
              </View>
              <TouchableOpacity
                style={styles.beginButton}
                onPress={() => handlePress(story)}
              >
                <Text style={styles.beginButtonText}>Listen Now</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
        </View>
        <FlatList
          data={recentlyPlayed}
          renderItem={({ item }) => (
            <StoryCard item={item} onPress={() => handlePress(item)} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Releases</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.suggestStoryButtonText}>Suggest story</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={newReleases}
          renderItem={({ item }) => (
            <StoryCard item={item} onPress={() => handlePress(item)} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        />
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={styles.sectionTitle}>Popular Stories</Text>
        </View>
        <FlatList
          data={popularStories}
          renderItem={({ item }) => (
            <StoryCard item={item} onPress={() => handlePress(item)} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        />
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={styles.sectionTitle}>Verse of the Day</Text>
        </View>
        <View style={styles.verseCard}>
          <Text style={styles.verseText}>
            "The Lord is my shepherd; I shall not want."
          </Text>
          <Text style={styles.verseReference}>Psalm 23:1</Text>
        </View>
      </ScrollView>
      <SuggestStoryModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryBg,
  },
  container: {
    backgroundColor: COLORS.primaryBg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerText: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
  heroCard: {
    height: 300,
    justifyContent: 'flex-end',
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroImage: {
    borderRadius: 12,
  },
  heroContent: {
    backgroundColor: 'rgba(27, 46, 75, 0.8)',
    padding: 16,
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    maxWidth: 440,
  },
  heroSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 4,
  },
  beginButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  beginButtonText: {
    color: COLORS.primaryButtonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    // Removed paddingHorizontal here, it's now in sectionHeader
    paddingBottom: 8,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingTop and paddingBottom are handled by sectionTitle for now
  },
  suggestStoryButtonText: {
    color: COLORS.primaryAccent,
    fontSize: 14,
    fontWeight: '600',
  },
  verseCard: {
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 8,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  verseText: {
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.textPrimary,
  },
  verseReference: {
    marginTop: 12,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primaryAccent,
  },
  // Styles for StoryCard
  card: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#36454F',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryAccent,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  cardDuration: {
    color: COLORS.textSecondary,
    marginLeft: 4,
    fontSize: 12,
  },
});

export default Home;