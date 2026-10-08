import 'package:flutter/material.dart';
import '../theme/modern_theme.dart';

/// Professional loading spinner widget with smooth animation
class LoadingSpinner extends StatefulWidget {
  final double size;
  final Color color;
  final String? label;
  final bool fullScreen;
  final Color backgroundColor;

  const LoadingSpinner({
    super.key,
    this.size = 50.0,
    this.color = ModernTheme.primary,
    this.label,
    this.fullScreen = false,
    this.backgroundColor = Colors.transparent,
  });

  @override
  State<LoadingSpinner> createState() => _LoadingSpinnerState();
}

class _LoadingSpinnerState extends State<LoadingSpinner>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

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
    if (widget.fullScreen) {
      return Container(
        color: widget.backgroundColor,
        child: Center(child: _buildSpinner()),
      );
    }
    return _buildSpinner();
  }

  Widget _buildSpinner() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Stack(
          alignment: Alignment.center,
          children: [
            // Outer rotating circle
            RotationTransition(
              turns: _controller,
              child: Container(
                width: widget.size,
                height: widget.size,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: widget.color, width: 3),
                ),
              ),
            ),
            // Inner pulsing circle
            AnimatedBuilder(
              animation: _controller,
              builder: (context, child) {
                return Transform.scale(
                  scale: 0.6 + (_controller.value * 0.2),
                  child: Container(
                    width: widget.size * 0.4,
                    height: widget.size * 0.4,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: RadialGradient(
                        colors: [
                          widget.color.withOpacity(0.6),
                          widget.color.withOpacity(0.2),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
        if (widget.label != null) ...[
          const SizedBox(height: 20),
          Text(
            widget.label!,
            style: ModernTheme.subtitle2.copyWith(
              color: ModernTheme.mediumGray,
            ),
          ),
        ],
      ],
    );
  }
}

/// Minimal loading indicator similar to Facebook
class MinimalLoadingBar extends StatefulWidget {
  final Color color;
  final double height;

  const MinimalLoadingBar({
    super.key,
    this.color = ModernTheme.primary,
    this.height = 3,
  });

  @override
  State<MinimalLoadingBar> createState() => _MinimalLoadingBarState();
}

class _MinimalLoadingBarState extends State<MinimalLoadingBar>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
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
    return LinearProgressIndicator(
      value: _controller.value,
      minHeight: widget.height,
      backgroundColor: Colors.grey[200],
      valueColor: AlwaysStoppedAnimation<Color>(widget.color),
    );
  }
}
