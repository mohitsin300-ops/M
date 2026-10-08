import 'package:url_launcher/url_launcher.dart';
import 'dart:io';
import 'package:flutter/material.dart';

/// App store URLs and deep linking functionality
class AppStoreLinks {
  // Play Store Package ID - Update this with your actual package ID
  static const String playStorePackageId = 'com.mjtechglobal.internshipapp';
  
  // App Store Bundle ID - Update this with your actual bundle ID
  static const String appStoreBundleId = 'com.mjtechglobal.internshipapp';

  /// Open app in Play Store (Android)
  static Future<void> openPlayStore() async {
    final String playStoreUrl =
        'https://play.google.com/store/apps/details?id=$playStorePackageId';
    
    try {
      if (await canLaunchUrl(Uri.parse(playStoreUrl))) {
        await launchUrl(
          Uri.parse(playStoreUrl),
          mode: LaunchMode.externalApplication,
        );
      } else {
        // Open in web browser as fallback
        await launchUrl(
          Uri.parse(playStoreUrl),
          mode: LaunchMode.externalApplication,
        );
      }
    } catch (e) {
      print('Error opening Play Store: $e');
    }
  }

  /// Open app in App Store (iOS)
  static Future<void> openAppStore() async {
    // App Store direct link format
    final String appStoreUrl =
        'https://apps.apple.com/app/mj-tech-internship/id$appStoreBundleId';
    
    // Also try the iTunes URL scheme for direct app store opening
    final String itunesUrl = 'itms-apps://apps.apple.com/app/mj-tech-internship/id$appStoreBundleId';
    
    try {
      // Try direct iTunes scheme first (faster)
      if (await canLaunchUrl(Uri.parse(itunesUrl))) {
        await launchUrl(Uri.parse(itunesUrl));
      } else {
        // Fallback to web URL
        await launchUrl(
          Uri.parse(appStoreUrl),
          mode: LaunchMode.externalApplication,
        );
      }
    } catch (e) {
      print('Error opening App Store: $e');
    }
  }

  /// Open appropriate store based on platform
  static Future<void> openAppStore_Adaptive() async {
    if (Platform.isAndroid) {
      await openPlayStore();
    } else if (Platform.isIOS) {
      await openAppStore();
    }
  }

  /// Get store display name based on platform
  static String getStoreNameForPlatform() {
    if (Platform.isAndroid) {
      return 'Play Store';
    } else if (Platform.isIOS) {
      return 'App Store';
    }
    return 'App Store';
  }

  /// Get store icon based on platform
  static IconData getStoreIconForPlatform() {
    if (Platform.isAndroid) {
      return Icons.play_circle_outlined;
    } else if (Platform.isIOS) {
      return Icons.apple;
    }
    return Icons.store;
  }
}

