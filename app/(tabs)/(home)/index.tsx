
import React from "react";
import { Stack, Link } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";

export default function HomeScreen() {
  const theme = useTheme();

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log('Plus button pressed')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="plus" color={colors.primary} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => console.log('Settings button pressed')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol
        name="gear"
        color={colors.primary}
      />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "QR Scanner App",
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroSection}>
            <View style={styles.iconContainer}>
              <IconSymbol name="qrcode" size={80} color={colors.primary} />
            </View>
            <Text style={styles.title}>QR Code Scanner</Text>
            <Text style={styles.subtitle}>
              Scan QR codes to open websites instantly
            </Text>
          </View>

          <Link href="/qrscanner" asChild>
            <Pressable style={styles.scanButton}>
              <IconSymbol name="camera" size={24} color={colors.card} style={{ marginRight: 12 }} />
              <Text style={styles.scanButtonText}>Start Scanning</Text>
            </Pressable>
          </Link>

          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="bolt" size={28} color={colors.card} />
              </View>
              <Text style={styles.featureTitle}>Flashlight Support</Text>
              <Text style={styles.featureDescription}>
                Toggle the flashlight for scanning in dark environments
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: colors.accent }]}>
                <IconSymbol name="link" size={28} color={colors.card} />
              </View>
              <Text style={styles.featureTitle}>Instant Website Access</Text>
              <Text style={styles.featureDescription}>
                Automatically opens websites from scanned QR codes
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name="checkmark.circle" size={28} color={colors.card} />
              </View>
              <Text style={styles.featureTitle}>Fast & Reliable</Text>
              <Text style={styles.featureDescription}>
                Quick scanning with accurate QR code detection
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  scanButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 40,
    boxShadow: '0px 6px 16px rgba(98, 0, 238, 0.3)',
    elevation: 5,
  },
  scanButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700',
  },
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
