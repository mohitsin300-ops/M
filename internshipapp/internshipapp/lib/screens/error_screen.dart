import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import '../theme/modern_theme.dart';

/// No Internet connection screen
class NoInternetScreen extends StatefulWidget {
  final VoidCallback onRetry;
  final bool isFullScreen;

  const NoInternetScreen({
    super.key,
    required this.onRetry,
    this.isFullScreen = true,
  });

  @override
  State<NoInternetScreen> createState() => _NoInternetScreenState();
}

class _NoInternetScreenState extends State<NoInternetScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  bool _isRetrying = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    _controller.repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Widget content = Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        // Animated WiFi icon
        FadeInDown(
          duration: const Duration(milliseconds: 600),
          child: ScaleTransition(
            scale: Tween<double>(begin: 0.8, end: 1.0).animate(
              CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
            ),
            child: Container(
              padding: const EdgeInsets.all(40),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: ModernTheme.danger.withOpacity(0.1),
              ),
              child: Icon(
                Icons.wifi_off_rounded,
                size: 80,
                color: ModernTheme.danger,
              ),
            ),
          ),
        ),
        const SizedBox(height: 32),

        // Title
        FadeInUp(
          duration: const Duration(milliseconds: 800),
          child: Text(
            'No Internet Connection',
            style: ModernTheme.heading2.copyWith(fontSize: 24),
            textAlign: TextAlign.center,
          ),
        ),
        const SizedBox(height: 12),

        // Description
        FadeInUp(
          duration: const Duration(milliseconds: 1000),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Text(
              'Please check your internet connection and try again.',
              style: ModernTheme.body2,
              textAlign: TextAlign.center,
            ),
          ),
        ),
        const SizedBox(height: 40),

        // Retry button
        FadeInUp(
          duration: const Duration(milliseconds: 1200),
          child: SizedBox(
            width: 200,
            height: 48,
            child: ElevatedButton(
              onPressed: _isRetrying ? null : _handleRetry,
              style: ModernTheme.primaryButtonStyle.copyWith(
                backgroundColor: MaterialStatePropertyAll(
                  _isRetrying
                      ? ModernTheme.primary.withOpacity(0.6)
                      : ModernTheme.primary,
                ),
              ),
              child: _isRetrying
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
                        const Icon(Icons.refresh_rounded, size: 20),
                        const SizedBox(width: 8),
                        const Text('Try Again'),
                      ],
                    ),
            ),
          ),
        ),

        const SizedBox(height: 24),

        // Help text
        FadeInUp(
          duration: const Duration(milliseconds: 1400),
          child: Text(
            'Turn on WiFi or mobile data',
            style: ModernTheme.caption,
            textAlign: TextAlign.center,
          ),
        ),
      ],
    );

    if (widget.isFullScreen) {
      return Scaffold(
        body: Container(
          width: double.infinity,
          height: double.infinity,
          color: ModernTheme.veryLightGray,
          child: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.only(
                top: MediaQuery.of(context).padding.top + 40,
                bottom: MediaQuery.of(context).padding.bottom + 40,
              ),
              child: SizedBox(
                height:
                    MediaQuery.of(context).size.height -
                    MediaQuery.of(context).padding.vertical -
                    80,
                child: content,
              ),
            ),
          ),
        ),
      );
    }

    return Container(
      color: ModernTheme.veryLightGray,
      padding: const EdgeInsets.all(24),
      child: content,
    );
  }

  void _handleRetry() async {
    setState(() => _isRetrying = true);
    // Simulate network check
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) {
      setState(() => _isRetrying = false);
      widget.onRetry();
    }
  }
}

/// Error screen for other types of errors
class ErrorScreen extends StatefulWidget {
  final String title;
  final String message;
  final IconData icon;
  final VoidCallback onRetry;
  final Color iconColor;
  final bool isFullScreen;

  const ErrorScreen({
    super.key,
    this.title = 'Something Went Wrong',
    this.message = 'An unexpected error occurred. Please try again.',
    this.icon = Icons.error_outline_rounded,
    required this.onRetry,
    this.iconColor = ModernTheme.danger,
    this.isFullScreen = true,
  });

  @override
  State<ErrorScreen> createState() => _ErrorScreenState();
}

class _ErrorScreenState extends State<ErrorScreen> {
  bool _isRetrying = false;

  @override
  Widget build(BuildContext context) {
    Widget content = Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        // Error icon
        FadeInDown(
          duration: const Duration(milliseconds: 600),
          child: Container(
            padding: const EdgeInsets.all(40),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: widget.iconColor.withOpacity(0.1),
            ),
            child: Icon(widget.icon, size: 80, color: widget.iconColor),
          ),
        ),
        const SizedBox(height: 32),

        // Title
        FadeInUp(
          duration: const Duration(milliseconds: 800),
          child: Text(
            widget.title,
            style: ModernTheme.heading2.copyWith(fontSize: 24),
            textAlign: TextAlign.center,
          ),
        ),
        const SizedBox(height: 12),

        // Message
        FadeInUp(
          duration: const Duration(milliseconds: 1000),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Text(
              widget.message,
              style: ModernTheme.body2,
              textAlign: TextAlign.center,
            ),
          ),
        ),
        const SizedBox(height: 40),

        // Retry button
        FadeInUp(
          duration: const Duration(milliseconds: 1200),
          child: SizedBox(
            width: 200,
            height: 48,
            child: ElevatedButton(
              onPressed: _isRetrying ? null : _handleRetry,
              style: ModernTheme.primaryButtonStyle.copyWith(
                backgroundColor: MaterialStatePropertyAll(
                  _isRetrying
                      ? ModernTheme.primary.withOpacity(0.6)
                      : ModernTheme.primary,
                ),
              ),
              child: _isRetrying
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
                        const Icon(Icons.refresh_rounded, size: 20),
                        const SizedBox(width: 8),
                        const Text('Try Again'),
                      ],
                    ),
            ),
          ),
        ),
      ],
    );

    if (widget.isFullScreen) {
      return Scaffold(
        body: Container(
          width: double.infinity,
          height: double.infinity,
          color: ModernTheme.veryLightGray,
          child: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.only(
                top: MediaQuery.of(context).padding.top + 40,
                bottom: MediaQuery.of(context).padding.bottom + 40,
              ),
              child: SizedBox(
                height:
                    MediaQuery.of(context).size.height -
                    MediaQuery.of(context).padding.vertical -
                    80,
                child: content,
              ),
            ),
          ),
        ),
      );
    }

    return Container(
      color: ModernTheme.veryLightGray,
      padding: const EdgeInsets.all(24),
      child: content,
    );
  }

  void _handleRetry() async {
    setState(() => _isRetrying = true);
    await Future.delayed(const Duration(milliseconds: 500));
    if (mounted) {
      setState(() => _isRetrying = false);
      widget.onRetry();
    }
  }
}
