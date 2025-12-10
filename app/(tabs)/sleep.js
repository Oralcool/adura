import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import COLORS from '../../constants/colors';

const sleepStories = [
  {
    id: '1',
    title: 'The Whispering River',
    type: 'Bedtime Story',
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    subtitle: 'Let the gentle sounds of the river guide you to sleep.',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    id: '2',
    title: 'The Enchanted Forest',
    type: 'Bedtime Story',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    subtitle: 'A magical journey through a forest of wonders.',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
];

const SleepStoryCard = ({ item, onPress }) => (
    <View style={styles.card}>
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
        <Text style={styles.cardDuration}>{item.duration}</Text>
        </View>
    </View>
);


const SleepScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Sleep Stories</Text>
            </View>

            <FlatList
                data={sleepStories}
                renderItem={({ item }) => (
                    <Link href={{ pathname: "/player", params: { title: item.title, subtitle: item.subtitle, image: item.image, duration: item.duration, type: item.type, audio: item.audio } }} asChild>
                        <TouchableOpacity>
                            <SleepStoryCard item={item} />
                        </TouchableOpacity>
                    </Link>
                )}
                keyExtractor={(item) => item.id}
                numColumns={1} // Sleep stories might look better in a single column list
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
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    headerTitle: {
        color: COLORS.textPrimary,
        fontSize: 24,
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
        aspectRatio: 16/9,
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
        fontSize: 18,
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
        fontSize: 14,
    },
});

export default SleepScreen;