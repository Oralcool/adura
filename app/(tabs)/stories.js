import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { useRouter } from 'expo-router';

const stories = [
  {
    id: '1',
    title: 'The Good Samaritan',
    type: 'Bible Story',
    category: "Jesus' Teachings",
    subtitle: 'A story of compassion and helping others in need',
    duration: '15:00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_XHV0SRzTNsscbeKuCEsnC_RtQsYMNYLCLk3EhcNf25Uj5DeFOua25KUsmUid4rPJ-td-H92XsE4jJ5OeBpAfdRLF5worTPk93VNtPR87y7ZR-g_wO0pcNe9MnCBKzz8jf044DlvSHppruzGJvVvVYY4sEWDrecHcdh5lropYssfbYVHCHaLrV2Vs_qzEiyUA60t5Voi55oB_-w5WZqLV1_DcaY9bGgvwLqQ2Jpc3SEsbGgWyPkOrAPkHuNXDn32yI4BvAd691nkd',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'David and Goliath',
    type: 'Bible Story',
    category: 'Old Testament',
    subtitle: 'A tale of courage and faith against all odds',
    duration: '12:00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2YKeiW_nxD-Pu7gyhsQJTrlYNgBOjIzLsJJZhUtb2L5fvBLq8ZaEwjfB8WbM-p7HGsr2HZKNTeLHz6D4ilgWIE_WW3B4wl3d8B1JIr8xRpeHTZlmGFzsVORgHb-kGChfkCsrxpWhw9Vt8ph-e1IEKQRTq3qd52dQ8A3G67nEJP17kqCa5xQuuzvHFOYeQ5vYXWzhR3Hpf5Zwi2ccDixizgHVSvcPsNENnuQe77jR8wmEuYtJaHUsrtQa1IJylnPzwb0y-R_kt0eWj',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'The Creation',
    type: 'Bible Story',
    category: 'Old Testament',
    subtitle: 'The beginning of all things and God\'s beautiful creation',
    duration: '20:00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn7YyX53p75wkK-vRcyrDabmBVW9dZLR8W2x1WP7gUa5VWubHGjYSaArzBpKErrzl17GosfPGWhr9qqd-UvhIGPX2zzF2bd-8jC8BYG4IZd65obr6FRukf23MgybGiD3PZNBoPeDamcHHy28DAaHLZmtzW2UeoCdb09q251tkB-FMfEPoQSejz9ssL-d1sFbgF7rcWIr0T9jJIUa2huMH5NsjSkkt1YD_WTNmyh0xRy7iJdSr-KN-AX1VgPJ5eYzdjLBAOjCMqLy3d',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: "Daniel in the Lion's Den",
    type: 'Bible Story',
    category: 'Prophets',
    subtitle: 'Faith and protection in the face of danger',
    duration: '18:00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXfM_9erAUPZLERrsVnu_s1XFy19lCEyY44NeicKwbq8HOdgtxUXh5MisJzi9QuEVjXNBudmEnOfm-XMnlUM5mDTJa6cVwWLxZHWP6uLAV16OITQKibOxzCzSSucj7b7-2sUrxZtK_pK4NUQgPXahKDYZ--R5n76tkXeW6Hnj3bphCv1rbUlVSHT0EADSSPubKEmV5_GjAM5SZz2WdL0CSRxPy951Nng5Gk_fFVAllVZCJZIS9L2ANrbTsgmCSLXeJhfzPA8d-C_G0',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: '5',
    title: 'The Prodigal Son',
    type: 'Bible Story',
    category: "Jesus' Teachings",
    subtitle: 'A journey of redemption and unconditional love',
    duration: '14:00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGQPujiMucgSOVAAfKv_02V_Hw3bOOVwPzOe7815xV9H34cDGEkG2bZqoH08S8Q4WFp_kitO2iiSadlubdy0_iHHpdD_V4fv8Y2fi8bGBYJAKyjiPiIHJUmN0C2AJgpgS_JWBBAnxtaktTt7uZJJsfjhYQPSe02dboHu11FFOhQVyw9JdSp2XXE3Pde07LcofTZwR2mmigsKybDrEkBCKX7fOf65t-M9pOWApsqHXezu5eH6IyCBTMpInCVoE6UoM_zNGUggixYJiA',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: '6',
    title: "Noah's Ark",
    type: 'Bible Story',
    category: 'Old Testament',
    subtitle: 'Trust and obedience through the great flood',
    duration: '25:00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQEkoynPq6ZX4osbB-xfsV32k-N1zcEYwVszTts4xBWPy9EfsOTkCkObKR8ZremDHi5hoDevgW3-WQzRfOXz_YzEcu1MEo1uHrRL7dlARtf3vUgOpGlW-23F4NZZNA2LrbQi2YAJU9jb2dfGlx8rGlxeDxg8EJQbCLMAkcmG-hgkY1VEjSV2A5McOEJoejiEEI-1CUSRTe49N3DpLYxI9knXA2jUEZrQKEUOi3FUjiVQtQ2DSLe2wc2UN6vTp9mcxsYO4ghcqO-8SJ',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
];

const chips = ['All', 'Old Testament', "Jesus' Teachings", 'Prophets', 'Kids'];

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
    <Text style={styles.cardTitle}>{item.title}</Text>
    <View style={styles.durationContainer}>
      <MaterialIcons name="schedule" size={14} color={COLORS.textSecondary} />
      <Text style={styles.cardDuration}>{item.duration.replace(':00', ' min')}</Text>
    </View>
  </TouchableOpacity>
);

const StoriesScreen = () => {
  const router = useRouter();
  const [activeChip, setActiveChip] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStories, setFilteredStories] = useState(stories);

  useEffect(() => {
    let newFilteredStories = stories;

    // Filter by active chip
    if (activeChip !== 'All') {
      newFilteredStories = newFilteredStories.filter(
        (story) => story.category === activeChip
      );
    }

    // Filter by search query
    if (searchQuery) {
      newFilteredStories = newFilteredStories.filter(
        (story) =>
          story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStories(newFilteredStories);
  }, [activeChip, searchQuery]);

  const handleStoryPress = (story) => {
    router.push({
      pathname: '/player',
      params: {
        title: story.title,
        subtitle: story.subtitle,
        image: story.image,
        duration: story.duration,
        audio: story.audio,
        type: story.type,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bible Stories</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Ionicons
            name="search"
            size={24}
            color={COLORS.textSecondary}
            style={{ marginLeft: 10 }}
          />
          <TextInput
            placeholder="Search for a story..."
            placeholderTextColor={COLORS.textSecondary}
            style={styles.textInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={{ height: 50, marginTop: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {chips.map((chip) => (
            <TouchableOpacity
              key={chip}
              style={[
                styles.chip,
                activeChip === chip && styles.activeChip,
              ]}
              onPress={() => setActiveChip(chip)}
            >
              <Text
                style={[
                  styles.chipText,
                  activeChip === chip && styles.activeChipText,
                ]}
              >
                {chip}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredStories}
        renderItem={({ item }) => (
          <StoryCard item={item} onPress={() => handleStoryPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#36454F',
        borderRadius: 12,
        height: 48,
    },
    textInput: {
        flex: 1,
        color: COLORS.textPrimary,
        marginLeft: 10,
        fontSize: 16,
    },
    chipsContainer: {
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    chip: {
        backgroundColor: '#36454F',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginRight: 8,
    },
    activeChip: {
        backgroundColor: '#737C8C',
    },
    chipText: {
        color: COLORS.textPrimary,
        fontWeight: '500',
    },
    activeChipText: {
        color: 'white',
        fontWeight: 'bold',
    },
    grid: {
        paddingHorizontal: 8,
    },
    card: {
        flex: 1,
        margin: 8,
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

export default StoriesScreen;