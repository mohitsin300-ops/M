import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'services/firebase_service.dart';
import 'services/app_version_service.dart';
import 'screens/auth_gate.dart';
import 'screens/splash_screen.dart';
import 'screens/app_update_screen.dart';
import 'theme/modern_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await FirebaseService.initialize();
  await AppVersionService().initialize();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MJ Tech Global Internships',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: ModernTheme.primary),
        useMaterial3: true,
        textTheme: GoogleFonts.poppinsTextTheme(Theme.of(context).textTheme),
        appBarTheme: AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
          scrolledUnderElevation: 0,
          iconTheme: const IconThemeData(color: ModernTheme.darkGray),
          titleTextStyle: GoogleFonts.poppins(
            color: ModernTheme.darkGray,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ModernTheme.primaryButtonStyle,
        ),
      ),
      home: const AppInitializer(),
    );
  }
}

/// App initializer - handles splash screen and app setup
class AppInitializer extends StatefulWidget {
  const AppInitializer({super.key});

  @override
  State<AppInitializer> createState() => _AppInitializerState();
}

class _AppInitializerState extends State<AppInitializer> {
  bool _showingSplash = true;

  @override
  void initState() {
    super.initState();
    _initializeApp();
  }

  Future<void> _initializeApp() async {
    // Splash screen is shown for 3 seconds
    await Future.delayed(const Duration(seconds: 3));

    if (!mounted) return;

    // Check for app updates
    final updateResult = await AppVersionService().checkForUpdates();

    if (!mounted) return;

    // Show update dialog if update is available
    if (updateResult != null && updateResult.hasUpdate) {
      if (mounted) {
        _showUpdateDialog(updateResult);
      }
    } else {
      setState(() => _showingSplash = false);
    }
  }

  void _showUpdateDialog(UpdateCheckResult updateResult) {
    showDialog(
      context: context,
      barrierDismissible: !updateResult.isForced,
      builder: (context) => AppUpdateDialog(
        currentVersion: AppVersionService.currentVersion,
        newVersion: updateResult.latestVersion,
        releaseNotes: updateResult.releaseNotes,
        isForced: updateResult.isForced,
        onUpdate: () {
          // In real app, open store or deep link to update
          // For now, just navigate to auth gate
          if (mounted) {
            Navigator.of(context).pop();
            setState(() => _showingSplash = false);
          }
        },
        onLater: () {
          if (mounted) {
            setState(() => _showingSplash = false);
          }
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_showingSplash) {
      return SplashScreen(
        onLoadingComplete: () {
          // This is called after splash screen duration
          // Update check happens in initState
        },
      );
    }
    return const AuthGate();
  }
}
