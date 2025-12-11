import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView>
        <View style={styles.signInContainer}>
          <View style={styles.signInContent}>
            <View style={styles.signInIconContainer}>
              <Ionicons name="person-circle-outline" size={30} color={COLORS.primaryAccent} />
            </View>
            <View style={styles.signInTextContainer}>
              <Text style={styles.signInTitle}>Sign in to sync your prayers</Text>
              <Text style={styles.signInSubtitle}>
                Save your meditation history and access it on all devices.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In / Create Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          <Text style={styles.sectionHeader}>Support & Info</Text>
          <View style={styles.menuItems}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemIcon}>
                  <Ionicons name="help-circle-outline" size={24} color={COLORS.primaryAccent} />
                </View>
                <Text style={styles.menuItemText}>Help & FAQ</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemIcon}>
                  <Ionicons name="bulb-outline" size={24} color={COLORS.primaryAccent} />
                </View>
                <Text style={styles.menuItemText}>Request a Story</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemIcon}>
                  <Ionicons name="git-pull-request-outline" size={24} color={COLORS.primaryAccent} />
                </View>
                <Text style={styles.menuItemText}>Feature Request</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemIcon}>
                  <Ionicons name="document-text-outline" size={24} color={COLORS.primaryAccent} />
                </View>
                <Text style={styles.menuItemText}>Privacy Policy</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemIcon}>
                  <Ionicons name="reader-outline" size={24} color={COLORS.primaryAccent} />
                </View>
                <Text style={styles.menuItemText}>Terms of Service</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemIcon}>
                  <Ionicons name="star-outline" size={24} color={COLORS.primaryAccent} />
                </View>
                <Text style={styles.menuItemText}>Rate App</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.cancelSubscriptionButton}>
          <Text style={styles.cancelSubscriptionButtonText}>Cancel Subscription</Text>
          <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.appVersion}>App Version 1.0.3</Text>
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
  signInContainer: {
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  signInContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInIconContainer: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 50,
    padding: 10,
    marginRight: 15,
  },
  signInTextContainer: {
    flex: 1,
  },
  signInTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  signInButtonText: {
    color: COLORS.primaryButtonText,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  menuContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  menuItems: {
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    backgroundColor: COLORS.elevatedSurface,
    borderRadius: 20,
    padding: 8,
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  cancelSubscriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 20,
    padding: 15,
    marginBottom: 30,
  },
  cancelSubscriptionButtonText: {
    color: 'red',
    fontSize: 16,
  },
  appVersion: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ProfileScreen;