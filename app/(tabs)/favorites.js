import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { useRouter } from 'expo-router';
import { useFavorites } from '../../context/FavoritesProvider';

const FavoritesScreen = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');
  const router = useRouter();
  const { favorites, loading, removeFavorite } = useFavorites();

  const uniqueTypes = useMemo(() => {
    const types = new Set(favorites.map(item => item.type).filter(Boolean));
    return ['All', ...Array.from(types)];
  }, [favorites]);

  const filteredFavorites = useMemo(() => {
    if (activeFilter === 'All') {
      return favorites;
    }
    return favorites.filter(item => item.type === activeFilter);
  }, [favorites, activeFilter]);

  const handlePlay = (track) => {
    router.push({ pathname: '/player', params: track });
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={COLORS.accent} style={{ marginTop: 50 }} />;
    }

    if (favorites.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your favorites list is empty.</Text>
          <Text style={styles.emptySubText}>Tap the heart icon on any track to add it here.</Text>
        </View>
      );
    }

    if (filteredFavorites.length === 0 && activeFilter !== 'All') {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No {activeFilter} favorites found.</Text>
          <Text style={styles.emptySubText}>Try selecting another filter or add more favorites.</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        {filteredFavorites.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.listItem}>
            <Image source={{ uri: item.image }} style={styles.listItemImage} />
            <View style={styles.listItemTextContainer}>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <Text style={styles.listItemSubtitle}>{`${item.duration || 'N/A'} • ${item.author || 'Unknown'}`}</Text>
            </View>
            <View style={styles.listItemActions}>
              <TouchableOpacity style={styles.playButton} onPress={() => handlePlay(item)}>
                <Ionicons name="play" size={24} color={COLORS.primaryButtonText} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                <Ionicons name="heart" size={24} color={COLORS.primaryAccent} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your favorites..."
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {uniqueTypes.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter ? styles.activeFilterChip : styles.inactiveFilterChip,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={activeFilter === filter ? styles.activeFilterText : styles.inactiveFilterText}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={16} color={COLORS.textPrimary} />
          <Text style={styles.sortText}>Sort by: Recently Added</Text>
        </TouchableOpacity>
        <View style={styles.viewToggle}>
          <TouchableOpacity style={styles.toggleButton}>
            <Ionicons name="list" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toggleButton, styles.inactiveToggleButton]}>
            <Ionicons name="grid" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      {renderContent()}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBg,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    height: 50,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  activeFilterChip: {
    backgroundColor: COLORS.categoryPillActiveBg,
  },
  inactiveFilterChip: {
    backgroundColor: COLORS.categoryPillInactiveBg,
  },
  activeFilterText: {
    color: COLORS.categoryPillActiveText,
    fontWeight: 'bold',
  },
  inactiveFilterText: {
    color: COLORS.categoryPillInactiveText,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBg,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sortText: {
    color: COLORS.textPrimary,
    marginLeft: 5,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 20,
    padding: 5,
  },
  toggleButton: {
    padding: 5,
  },
  inactiveToggleButton: {
    // backgroundColor: 'transparent',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  listItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  listItemTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  listItemTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItemSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  listItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: COLORS.mediaPlayButton,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptySubText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default FavoritesScreen;