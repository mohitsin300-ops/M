import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import '../theme/modern_theme.dart';

/// Professional splash/loading screen for MJ Tech Global
class SplashScreen extends StatefulWidget {
  final VoidCallback onLoadingComplete;
  final Duration displayDuration;

  const SplashScreen({
    super.key,
    required this.onLoadingComplete,
    this.displayDuration = const Duration(seconds: 3),
  });

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    _controller.forward();

    // Auto-navigate after display duration
    Future.delayed(widget.displayDuration, () {
      if (mounted) {
        widget.onLoadingComplete();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(gradient: ModernTheme.primaryGradient),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Logo with pulse animation
              FadeInDown(
                duration: const Duration(milliseconds: 800),
                child: ScaleTransition(
                  scale: Tween<double>(begin: 0.8, end: 1.0).animate(
                    CurvedAnimation(parent: _controller, curve: Curves.easeOut),
                  ),
                  child: Container(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Colors.white.withOpacity(0.95),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          blurRadius: 20,
                          spreadRadius: 5,
                        ),
                      ],
                    ),
                    child: Center(
                      child: Icon(
                        Icons.business_center,
                        size: 50,
                        color: ModernTheme.primary,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 30),

              // Company name
              FadeInUp(
                duration: const Duration(milliseconds: 1000),
                child: Column(
                  children: [
                    Text(
                      'MJ Tech Global',
                      style: ModernTheme.heading2.copyWith(
                        color: Colors.white,
                        fontSize: 28,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Internship Portal',
                      style: ModernTheme.subtitle1.copyWith(
                        color: Colors.white.withOpacity(0.9),
                        fontSize: 16,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),

              // Spacer
              const Spacer(),

              // Loading indicator
              FadeInUp(
                duration: const Duration(milliseconds: 1200),
                child: Column(
                  children: [
                    _buildLoadingAnimation(),
                    const SizedBox(height: 20),
                    Text(
                      'Loading...',
                      style: ModernTheme.body2.copyWith(
                        color: Colors.white.withOpacity(0.8),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 50),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLoadingAnimation() {
    return RotationTransition(
      turns: _controller,
      child: Container(
        width: 50,
        height: 50,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border(
            top: BorderSide(color: Colors.white, width: 3),
            right: BorderSide(color: Colors.white, width: 3),
            bottom: BorderSide(color: Colors.white.withOpacity(0.2), width: 3),
            left: BorderSide(color: Colors.white.withOpacity(0.2), width: 3),
          ),
        ),
      ),
    );
  }
}

/// Alternative modern splash screen with wave animation
class ModernSplashScreen extends StatefulWidget {
  final VoidCallback onLoadingComplete;
  final Duration displayDuration;

  const ModernSplashScreen({
    super.key,
    required this.onLoadingComplete,
    this.displayDuration = const Duration(seconds: 3),
  });

  @override
  State<ModernSplashScreen> createState() => _ModernSplashScreenState();
}

class _ModernSplashScreenState extends State<ModernSplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    _controller.repeat(reverse: true);

    Future.delayed(widget.displayDuration, () {
      if (mounted) {
        widget.onLoadingComplete();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        color: Colors.white,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Animated logo
            FadeInDown(
              duration: const Duration(milliseconds: 600),
              child: Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: ModernTheme.primaryGradient,
                  boxShadow: [
                    BoxShadow(
                      color: ModernTheme.primary.withOpacity(0.3),
                      blurRadius: 20,
                      spreadRadius: 10,
                    ),
                  ],
                ),
                child: Center(
                  child: Icon(
                    Icons.business_center,
                    size: 60,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 40),

            // Animated text
            FadeInUp(
              duration: const Duration(milliseconds: 800),
              child: Text(
                'MJ Tech Global',
                style: ModernTheme.heading1.copyWith(fontSize: 32),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Internship & Placement Portal',
              style: ModernTheme.subtitle2.copyWith(fontSize: 14),
              textAlign: TextAlign.center,
            ),

            const Spacer(),

            // Animated progress indicator
            FadeInUp(
              duration: const Duration(milliseconds: 1000),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 40),
                child: AnimatedBuilder(
                  animation: _controller,
                  builder: (context, child) {
                    return Column(
                      children: [
                        // Wave animation
                        Container(
                          height: 4,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(2),
                            color: ModernTheme.lightGray,
                          ),
                          child: Align(
                            alignment: Alignment(
                              (_controller.value * 2) - 1,
                              0,
                            ),
                            child: Container(
                              width: 60,
                              height: 4,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(2),
                                gradient: ModernTheme.primaryGradient,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Setting up your experience...',
                          style: ModernTheme.caption.copyWith(
                            color: ModernTheme.mediumGray,
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
            ),

            const SizedBox(height: 60),
          ],
        ),
      ),
    );
  }
}
