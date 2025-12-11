import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { useRouter } from 'expo-router';

const favoritesData = [
  {
    id: '1',
    title: 'Morning Gratitude Meditation',
    duration: '5 min',
    author: 'Sarah Jennings',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFUbOI3wngr5j3UeyoqqzBquEuvFVQRfJ-CYeSYmNJAnGnQJRAwoKeJIPUxbKaGBnggNXoEJDF5Hot-jpxtuXZYb-qjETk2FkdM9eLxoQQJ4_d0zIzPx9QdLMds-0cklKo6rGR1BKsfbhbSRt7-aiVKvZ67P-oiS7DGyKJ7yYva7bZoDx-rowQCbl_dziSzOlf0nffyFSPowlICLlUGNAyjjtbA7V06ZLy6_BcKfg5byjDDnWbOY-eNdDHEmKVeLrWXeZf4XyRbbcm',
  },
  {
    id: '2',
    title: 'The Serenity Prayer',
    duration: '2 min',
    author: 'Audio Prayer',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DRoLUqNUH45Ty8eL6-5idDiJ5yYoY_GDSqvYlg_JrJ5jqO9R_3JyIP1fAZFZ-XrwaJ5B9IxanS0mbAYIIF76KdqmrNptchGJmwmJadcB6TGpeMZ4V1HeiblBY4uwgyXUUZAA88g5KgxNTHXqfxPbfEuOnfyj9y_R3_c3oI1_-5A-A_dJZI8esEN7i5SNSbXrrk81TzhlCLqOkO_Ux8SHpXlrlAQTkunn8tHWwBnE8BArl6tJvG1Pu0fClTj7qkaM0T2-uGFjar4p',
  },
  {
    id: '3',
    title: 'Peaceful Evening Reflections',
    duration: '15 min',
    author: 'Sleep Meditation',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6iw1IXmGAw30y1xEX24H6U14suk_e0TlxhULfd2xsRXmNJAnGnQJRAwoKeJIPUxbKaGBnggNXoEJDF5Hot-jpxtuXZYb-qjETk2FkdM9eLxoQQJ4_d0zIzPx9QdLMds-0cklKo6rGR1BKsfbhbSRt7-aiVKvZ67P-oiS7DGyKJ7yYva7bZoDx-rowQCbl_dziSzOlf0nffyFSPowlICLlUGNAyjjtbA7V06ZLy6_BcKfg5byjDDnWbOY-eNdDHEmKVeLrWXeZf4XyRbbcm',
  },
];

const FavoritesScreen = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');
  const filters = ['All', 'Prayers', 'Meditations', 'Music', 'Courses', 'Scripture'];
  const router = useRouter();

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
          {filters.map((filter) => (
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
      <ScrollView>
        {favoritesData.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <Image source={{ uri: item.image }} style={styles.listItemImage} />
            <View style={styles.listItemTextContainer}>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <Text style={styles.listItemSubtitle}>{`${item.duration} • ${item.author}`}</Text>
            </View>
            <View style={styles.listItemActions}>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={24} color={COLORS.primaryButtonText} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="heart" size={24} color={COLORS.primaryAccent} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
});

export default FavoritesScreen;