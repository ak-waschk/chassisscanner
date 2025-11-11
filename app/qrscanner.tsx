
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Stack, router } from 'expo-router';
import * as Linking from 'expo-linking';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    console.log('QR Scanner mounted');
    console.log('Camera permission:', permission);
  }, [permission]);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (scanned) {
      return;
    }

    console.log('QR Code scanned:', { type, data });
    setScanned(true);

    // Check if the scanned data is a valid URL
    const urlPattern = /^(https?:\/\/)/i;
    if (urlPattern.test(data)) {
      try {
        const canOpen = await Linking.canOpenURL(data);
        if (canOpen) {
          console.log('Opening URL:', data);
          await Linking.openURL(data);
          
          // Reset scanned state after a delay to allow scanning again
          setTimeout(() => {
            setScanned(false);
          }, 2000);
        } else {
          Alert.alert('Invalid URL', 'Cannot open this URL', [
            { text: 'OK', onPress: () => setScanned(false) }
          ]);
        }
      } catch (error) {
        console.error('Error opening URL:', error);
        Alert.alert('Error', 'Failed to open the URL', [
          { text: 'OK', onPress: () => setScanned(false) }
        ]);
      }
    } else {
      Alert.alert(
        'Not a Website',
        `Scanned data: ${data}\n\nThis QR code does not contain a website URL.`,
        [{ text: 'OK', onPress: () => setScanned(false) }]
      );
    }
  };

  const toggleFlash = () => {
    console.log('Toggling flash:', !flashEnabled);
    setFlashEnabled(!flashEnabled);
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'QR Scanner',
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.card,
          }}
        />
        <View style={styles.permissionContainer}>
          <IconSymbol name="camera" size={64} color={colors.primary} style={{ marginBottom: 20 }} />
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionMessage}>
            We need access to your camera to scan QR codes.
          </Text>
          <Pressable style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'QR Scanner',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.card,
        }}
      />
      
      <CameraView
        style={styles.camera}
        facing="back"
        enableTorch={flashEnabled}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay} />
          
          <View style={styles.middleRow}>
            <View style={styles.sideOverlay} />
            <View style={styles.scanArea}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <View style={styles.sideOverlay} />
          </View>
          
          <View style={styles.bottomOverlay}>
            <Text style={styles.instructionText}>
              Position the QR code within the frame
            </Text>
            
            <Pressable
              style={[styles.flashButton, flashEnabled && styles.flashButtonActive]}
              onPress={toggleFlash}
            >
              <IconSymbol
                name={flashEnabled ? "bolt.fill" : "bolt"}
                size={28}
                color={flashEnabled ? colors.primary : colors.card}
              />
              <Text style={[styles.flashButtonText, flashEnabled && styles.flashButtonTextActive]}>
                {flashEnabled ? 'Flash On' : 'Flash Off'}
              </Text>
            </Pressable>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  middleRow: {
    flexDirection: 'row',
    height: 300,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scanArea: {
    width: 300,
    height: 300,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  instructionText: {
    color: colors.card,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  flashButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.card,
  },
  flashButtonActive: {
    backgroundColor: colors.card,
  },
  flashButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  flashButtonTextActive: {
    color: colors.primary,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: colors.text,
    fontSize: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  permissionButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
