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
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { useRouter } from 'expo-router';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENTLY_PLAYED_KEY = 'recentlyPlayedList';
const MAX_RECENTLY_PLAYED = 10;

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
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchStories = async () => {
      const db = getFirestore();
      const storiesCollection = collection(db, 'stories');
      const storySnapshot = await getDocs(storiesCollection);
      const storyList = storySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStories(storyList);
      setFilteredStories(storyList);

      const uniqueCategories = [...new Set(storyList.map(story => story.category))];
      setCategories(['All', ...uniqueCategories]);

      setLoading(false);
    };

    fetchStories();
  }, []);

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
  }, [activeChip, searchQuery, stories]);

  const addRecentlyPlayedItem = async (item) => {
    try {
      const existingItems = await AsyncStorage.getItem(RECENTLY_PLAYED_KEY);
      let items = existingItems ? JSON.parse(existingItems) : [];
      
      items = items.filter(i => i.id !== item.id);
      items.unshift(item);

      if (items.length > MAX_RECENTLY_PLAYED) {
        items = items.slice(0, MAX_RECENTLY_PLAYED);
      }

      await AsyncStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save recently played item.", error);
    }
  };

  const handleStoryPress = (story) => {
    addRecentlyPlayedItem(story);
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primaryBg }}>
        <ActivityIndicator size="large" color={COLORS.primaryAccent} />
      </View>
    );
  }

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
          {categories.map((chip) => (
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
        backgroundColor: COLORS.primaryAccent,
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