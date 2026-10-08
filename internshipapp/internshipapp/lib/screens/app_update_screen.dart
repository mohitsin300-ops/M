import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:io';
import '../theme/modern_theme.dart';
import '../services/app_store_service.dart';

/// App Update Dialog/Screen
class AppUpdateDialog extends StatefulWidget {
  final String currentVersion;
  final String newVersion;
  
  final String releaseNotes;
  final VoidCallback onUpdate;
  final VoidCallback? onLater;
  final bool isForced;

  const AppUpdateDialog({
    super.key,
    required this.currentVersion,
    required this.newVersion,
    this.releaseNotes = 'New features and improvements are available.',
    required this.onUpdate,
    this.onLater,
    this.isForced = false,
  });

  @override
  State<AppUpdateDialog> createState() => _AppUpdateDialogState();
}

class _AppUpdateDialogState extends State<AppUpdateDialog> {
  bool _isUpdating = false;

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: !widget.isForced,
      child: Dialog(
        backgroundColor: Colors.transparent,
        child: FadeInDown(
          duration: const Duration(milliseconds: 600),
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 24),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.15),
                  blurRadius: 30,
                  spreadRadius: 5,
                ),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Header with new badge
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    gradient: ModernTheme.primaryGradient,
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(20),
                    ),
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 6,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.3),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              'v${widget.newVersion}',
                              style: ModernTheme.body1.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 6,
                            ),
                            decoration: BoxDecoration(
                              color: ModernTheme.success.withOpacity(0.3),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              widget.isForced ? 'REQUIRED' : 'NEW',
                              style: ModernTheme.caption.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Icon(
                        Icons.cloud_download_outlined,
                        size: 60,
                        color: Colors.white,
                      ),
                    ],
                  ),
                ),

                // Content
                Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Update Available', style: ModernTheme.heading3),
                      const SizedBox(height: 12),
                      Text(
                        'A new version of the MJ Tech Global Internship App is available. Please update to continue using the latest features.',
                        style: ModernTheme.body2,
                      ),
                      const SizedBox(height: 20),

                      // Version info
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: ModernTheme.veryLightGray,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Current Version',
                                  style: ModernTheme.caption,
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  'v${widget.currentVersion}',
                                  style: ModernTheme.body1.copyWith(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                            Icon(
                              Icons.arrow_forward_rounded,
                              color: ModernTheme.mediumGray,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text('New Version', style: ModernTheme.caption),
                                const SizedBox(height: 2),
                                Text(
                                  'v${widget.newVersion}',
                                  style: ModernTheme.body1.copyWith(
                                    fontWeight: FontWeight.bold,
                                    color: ModernTheme.success,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),

                      if (widget.releaseNotes.isNotEmpty) ...[
                        const SizedBox(height: 20),
                        Text('What\'s New', style: ModernTheme.subtitle2),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: ModernTheme.veryLightGray,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            widget.releaseNotes,
                            style: ModernTheme.body2,
                            maxLines: 3,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),

                // Action buttons
                Padding(
                  padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
                  child: Column(
                    children: [
                      SizedBox(
                        width: double.infinity,
                        height: 48,
                        child: ElevatedButton(
                          onPressed: _isUpdating ? null : _handleUpdate,
                          style: ModernTheme.primaryButtonStyle,
                          child: _isUpdating
                              ? SizedBox(
                                  width: 20,
                                  height: 20,
                                  child: CircularProgressIndicator(
                                    valueColor: AlwaysStoppedAnimation<Color>(
                                      Colors.white.withOpacity(0.7),
                                    ),
                                    strokeWidth: 2,
                                  ),
                                )
                              : Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Platform.isAndroid
                                          ? Icons.play_circle_outlined
                                          : Icons.apple,
                                    ),
                                    const SizedBox(width: 8),
                                    Text(
                                      'Open ${Platform.isAndroid ? 'Play Store' : 'App Store'}',
                                    ),
                                  ],
                                ),
                        ),
                      ),
                      if (!widget.isForced) ...[
                        const SizedBox(height: 12),
                        SizedBox(
                          width: double.infinity,
                          height: 48,
                          child: OutlinedButton(
                            onPressed: _handleLater,
                            style: OutlinedButton.styleFrom(
                              side: const BorderSide(
                                color: ModernTheme.lightGray,
                                width: 2,
                              ),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: const Text('Later'),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _handleUpdate() async {
    setState(() => _isUpdating = true);
    await Future.delayed(const Duration(milliseconds: 500));

    if (mounted) {
      // Open app store based on platform
      if (Platform.isAndroid) {
        await AppStoreLinks.openPlayStore();
      } else if (Platform.isIOS) {
        await AppStoreLinks.openAppStore();
      }

      // Call the callback as well
      widget.onUpdate();
    }
  }

  void _handleLater() {
    if (widget.onLater != null) {
      widget.onLater!();
    }
    Navigator.of(context).pop();
  }
}

/// Update screen variant (full page)
class AppUpdateScreen extends StatefulWidget {
  final String currentVersion;
  final String newVersion;
  final String releaseNotes;
  final VoidCallback onUpdate;
  final bool isForced;

  const AppUpdateScreen({
    super.key,
    required this.currentVersion,
    required this.newVersion,
    this.releaseNotes = 'New features and improvements are available.',
    required this.onUpdate,
    this.isForced = false,
  });

  @override
  State<AppUpdateScreen> createState() => _AppUpdateScreenState();
}

class _AppUpdateScreenState extends State<AppUpdateScreen> {
  bool _isUpdating = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          width: double.infinity,
          decoration: BoxDecoration(gradient: ModernTheme.primaryGradient),
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(height: 40),

                  // Status badge
                  FadeInDown(
                    duration: const Duration(milliseconds: 600),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.3),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        widget.isForced
                            ? 'REQUIRED UPDATE'
                            : 'NEW UPDATE AVAILABLE',
                        style: ModernTheme.caption.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 40),

                  // Icon
                  FadeInDown(
                    duration: const Duration(milliseconds: 800),
                    child: Icon(
                      Icons.cloud_done_rounded,
                      size: 120,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 40),

                  // Title
                  FadeInUp(
                    duration: const Duration(milliseconds: 1000),
                    child: Text(
                      'Update Available',
                      style: ModernTheme.heading1.copyWith(
                        color: Colors.white,
                        fontSize: 32,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Subtitle
                  FadeInUp(
                    duration: const Duration(milliseconds: 1100),
                    child: Text(
                      'A new version of the MJ Tech Global Internship App is available. Please update to continue using the latest features.',
                      style: ModernTheme.body2.copyWith(
                        color: Colors.white.withOpacity(0.9),
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 50),

                  // Version comparison
                  FadeInUp(
                    duration: const Duration(milliseconds: 1200),
                    child: Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: Colors.white.withOpacity(0.3),
                        ),
                      ),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Current Version',
                                    style: ModernTheme.caption.copyWith(
                                      color: Colors.white.withOpacity(0.8),
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    'v${widget.currentVersion}',
                                    style: ModernTheme.heading3.copyWith(
                                      color: Colors.white,
                                      fontSize: 20,
                                    ),
                                  ),
                                ],
                              ),
                              Icon(
                                Icons.arrow_forward_rounded,
                                color: Colors.white.withOpacity(0.6),
                                size: 28,
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Text(
                                    'New Version',
                                    style: ModernTheme.caption.copyWith(
                                      color: Colors.white.withOpacity(0.8),
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    'v${widget.newVersion}',
                                    style: ModernTheme.heading3.copyWith(
                                      color: Colors.white,
                                      fontSize: 20,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),

                  if (widget.releaseNotes.isNotEmpty) ...[
                    const SizedBox(height: 30),
                    FadeInUp(
                      duration: const Duration(milliseconds: 1300),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'What\'s New',
                            style: ModernTheme.subtitle1.copyWith(
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 12),
                          Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(
                                color: Colors.white.withOpacity(0.2),
                              ),
                            ),
                            child: Text(
                              widget.releaseNotes,
                              style: ModernTheme.body2.copyWith(
                                color: Colors.white.withOpacity(0.9),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],

                  const SizedBox(height: 50),

                  // Update button
                  FadeInUp(
                    duration: const Duration(milliseconds: 1400),
                    child: SizedBox(
                      width: double.infinity,
                      height: 52,
                      child: ElevatedButton.icon(
                        onPressed: _isUpdating ? null : _handleUpdate,
                        icon: Icon(
                          Platform.isAndroid
                              ? Icons.play_circle_outlined
                              : Icons.apple,
                        ),
                        label: Text(
                          _isUpdating
                              ? 'Opening ${Platform.isAndroid ? 'Play Store' : 'App Store'}...'
                              : 'Open ${Platform.isAndroid ? 'Play Store' : 'App Store'}',
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: ModernTheme.primary,
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 60),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  void _handleUpdate() async {
    setState(() => _isUpdating = true);
    await Future.delayed(const Duration(milliseconds: 500));

    if (mounted) {
      // Open app store based on platform
      if (Platform.isAndroid) {
        await AppStoreLinks.openPlayStore();
      } else if (Platform.isIOS) {
        await AppStoreLinks.openAppStore();
      }

      // Call the callback as well
      widget.onUpdate();
    }
  }
}
