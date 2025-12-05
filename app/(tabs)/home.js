import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Good Morning, Adeyinka</Text>
          <MaterialIcons name="notifications" size={28} color={COLORS.textPrimary} />
        </View>
        <View style={styles.cardContainer}>
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1SwHPWDUL_rH0PAgyKyJc0X8v-W-s8bzraR0jeSs0g9AY5rZnL1Oez5MlB37O0tFXMhLb09UPlw2e7e9VJjz0yPEVA5cWZ9RBhlPqS50iW3AwEC1R_sCsh8pFD_ct-CJkfKiybFzU-8AROZQvwNOxqy7hLYb5H929EfCvz2UQYICFbj29MPFFSioeVUBRIpMehvBg5bHbYZrB83dVhok9mcUfKefo09Y2PvlC7tmMgLaMedWHbQKsphDFBV6pzIZs0IoQFGWLCRXt',
            }}
            style={styles.heroCard}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroContent}>
              <View>
                <Text style={styles.heroTitle}>
                  Today's Prayer: A Moment of Gratitude
                </Text>
                <Text style={styles.heroSubtitle}>
                  Find peace and thankfulness in this guided prayer.
                </Text>
              </View>
              <Link href="/prayer" asChild>
                <TouchableOpacity style={styles.beginButton}>
                  <Text style={styles.beginButtonText}>Begin Prayer</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </ImageBackground>
        </View>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity style={styles.quickAccessCard}>
            <View style={styles.quickAccessIconContainer}>
              <MaterialIcons
                name="self-improvement"
                size={32}
                color={COLORS.primaryAccent}
              />
            </View>
            <Text style={styles.quickAccessText}>Meditations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessCard}>
            <View style={styles.quickAccessIconContainer}>
              <MaterialIcons name="dark-mode" size={32} color={COLORS.primaryAccent} />
            </View>
            <Text style={styles.quickAccessText}>Bedtime Stories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessCard}>
            <View style={styles.quickAccessIconContainer}>
              <MaterialIcons name="forum" size={32} color={COLORS.primaryAccent} />
            </View>
            <Text style={styles.quickAccessText}>Prayer Topics</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Verse of the Day</Text>
        <View style={styles.verseCard}>
          <Text style={styles.verseText}>
            "The Lord is my shepherd; I shall not want."
          </Text>
          <Text style={styles.verseReference}>Psalm 23:1</Text>
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
    fontFamily: 'serif',
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
    fontFamily: 'serif',
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
    fontFamily: 'serif',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quickAccessIconContainer: {
    backgroundColor: COLORS.elevatedSurface,
    borderRadius: 9999,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAccessText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  verseCard: {
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 8,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  verseText: {
    fontFamily: 'serif',
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.textPrimary,
  },
  verseReference: {
    marginTop: 12,
    textAlign: 'right',
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primaryAccent,
  },
});

export default Home;