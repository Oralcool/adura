import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
  } from 'react-native';
  import { Stack, useRouter } from 'expo-router';
  import { MaterialIcons } from '@expo/vector-icons';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import COLORS from '../constants/colors';

  const PrayerScreen = () => {
    const router = useRouter();

    return (
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={28} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Morning Prayer</Text>
            <TouchableOpacity>
              <MaterialIcons name="ios-share" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <ImageBackground
            source={{
              uri:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBO1fGn1ZnBB6N9TfGlcu0N4RxL7-Z1dIMw-JkwroYUCrRcFcZ_1m2IlExbVqenTRfvx2Vw5q7gwtDBWwfeSuatBPOHiTz22ptbbb3Ni_rW_QIna19fPKM174J3vrYWXCjAj23atvhEykIeR2G2cZjArPTA3mAjyhfz0UahllenwWT0g38FH9iIxeaHdZwHS0jxYsXn6Z_ALtgry7FsZq67BA2784g01uOOm91MEDy4xx7I9MIByKhtrHMWejjTPvtiG3FaNEkZ4_Cf',
            }}
            style={styles.heroImage}
          >
            <View style={styles.imageOverlay} />
          </ImageBackground>

          <View style={styles.contentContainer}>
            <View style={styles.scriptureCard}>
              <Text style={styles.scriptureVerse}>PSALM 118:24</Text>
              <Text style={styles.scriptureText}>
                This is the day the Lord has made; let us rejoice and be glad in it.
              </Text>
            </View>

            <View style={styles.prayerTextContainer}>
              <Text style={styles.prayerText}>
                Heavenly Father, as the sun rises, so does our gratitude for a new
                day. Thank you for the gift of life, for the peace that surpasses
                understanding, and for your guiding light.
              </Text>
              <Text style={styles.prayerText}>
                We ask for your wisdom to navigate the challenges ahead and your
                strength to walk in your ways. May our hearts be filled with your
                love, our minds with your truth, and our actions with your grace.
                Amen.
              </Text>
            </View>

          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.favoriteButton}>
            <MaterialIcons name="favorite-border" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.completeButtonText}>Mark as Complete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.volumeButton}>
            <MaterialIcons name="volume-off" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.primaryBg,
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: COLORS.primaryBg,
    },
    headerText: {
      color: COLORS.textPrimary,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'serif',
    },
    heroImage: {
      width: '100%',
      height: 300,
      justifyContent: 'flex-end',
    },
    imageOverlay: {
      height: 96,
      backgroundColor: 'rgba(0,0,0,0)',
      // backgroundColor: linear-gradient(to top, #000B29, transparent),
    },
    contentContainer: {
      padding: 16,
      marginTop: -64,
    },
    scriptureCard: {
      backgroundColor: '#394867',
      borderRadius: 8,
      padding: 24,
      marginBottom: 24,
    },
    scriptureVerse: {
      color: COLORS.primaryAccent,
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    scriptureText: {
      color: COLORS.textPrimary,
      fontSize: 20,
      fontFamily: 'serif',
    },
    prayerTextContainer: {
      gap: 16,
      marginBottom: 24,
    },
    prayerText: {
      color: COLORS.textPrimary,
      fontSize: 18,
      lineHeight: 28,
      fontFamily: 'serif',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      padding: 16,
      backgroundColor: COLORS.primaryBg,
      borderTopWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    favoriteButton: {
      height: 56,
      width: 56,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 28,
      borderWidth: 2,
      borderColor: COLORS.primaryAccent,
    },
    completeButton: {
      flex: 1,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.primaryAccent,
      borderRadius: 28,
    },
    completeButtonText: {
      color: COLORS.primaryBg,
      fontSize: 18,
      fontWeight: 'bold',
    },
    volumeButton: {
      height: 56,
      width: 56,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 28,
      borderWidth: 2,
      borderColor: COLORS.textPrimary,
    }
  });

  export default PrayerScreen;