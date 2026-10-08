import 'package:flutter/material.dart';

/// Smooth page transition routes - Facebook/Instagram style animations
class SmoothPageRoute<T> extends PageRoute<T> {
  final WidgetBuilder builder;
  final String? name;
  final Object? arguments;
  final Duration transitionDuration;
  final bool maintainState;
  final TransitionType transitionType;
  final Curve curve;

  SmoothPageRoute({
    required this.builder,
    this.settings,
    this.name,
    this.arguments,
    this.transitionDuration = const Duration(milliseconds: 300),
    this.maintainState = true,
    this.transitionType = TransitionType.slideFromRight,
    this.curve = Curves.easeInOutCubic,
  }) : super(
         settings: RouteSettings(name: name, arguments: arguments),
       );

  @override
  final bool opaque = false;
  @override
  final bool barrierDismissible = false;

  @override
  Color? get barrierColor => null;

  @override
  String? get barrierLabel => null;

  @override
  bool get maintainState => true;

  @override
  Duration get transitionDuration => Duration(milliseconds: 300);

  @override
  Widget buildPage(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
  ) {
    return builder(context);
  }

  @override
  Widget buildTransitions(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    switch (transitionType) {
      case TransitionType.slideFromRight:
        return SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(1.0, 0.0),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: animation, curve: curve)),
          child: child,
        );

      case TransitionType.slideFromLeft:
        return SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(-1.0, 0.0),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: animation, curve: curve)),
          child: child,
        );

      case TransitionType.slideFromBottom:
        return SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(0.0, 1.0),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: animation, curve: curve)),
          child: child,
        );

      case TransitionType.fadeInScale:
        return ScaleTransition(
          scale: Tween<double>(
            begin: 0.95,
            end: 1.0,
          ).animate(CurvedAnimation(parent: animation, curve: curve)),
          child: FadeTransition(opacity: animation, child: child),
        );

      case TransitionType.fadeOnly:
        return FadeTransition(opacity: animation, child: child);

      case TransitionType.scaleUp:
        return ScaleTransition(
          scale: Tween<double>(
            begin: 0.0,
            end: 1.0,
          ).animate(CurvedAnimation(parent: animation, curve: curve)),
          child: FadeTransition(opacity: animation, child: child),
        );

      case TransitionType.slideAndFade:
        return SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(0.0, 0.3),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: animation, curve: curve)),
          child: FadeTransition(opacity: animation, child: child),
        );

      case TransitionType.rotateAndScale:
        return ScaleTransition(
          scale: animation,
          child: RotationTransition(turns: animation, child: child),
        );
    }
  }
}

enum TransitionType {
  slideFromRight,
  slideFromLeft,
  slideFromBottom,
  fadeOnly,
  fadeInScale,
  scaleUp,
  slideAndFade,
  rotateAndScale,
}

/// Helper class for page transitions
class PageTransitions {
  static Future<T?> slideFromRight<T>(
    BuildContext context,
    Widget page, {
    Curve curve = Curves.easeInOutCubic,
  }) {
    return Navigator.of(context).push<T>(
      SmoothPageRoute(
        builder: (_) => page,
        transitionType: TransitionType.slideFromRight,
        curve: curve,
      ),
    );
  }

  static Future<T?> slideFromLeft<T>(
    BuildContext context,
    Widget page, {
    Curve curve = Curves.easeInOutCubic,
  }) {
    return Navigator.of(context).push<T>(
      SmoothPageRoute(
        builder: (_) => page,
        transitionType: TransitionType.slideFromLeft,
        curve: curve,
      ),
    );
  }

  static Future<T?> slideFromBottom<T>(
    BuildContext context,
    Widget page, {
    Curve curve = Curves.easeInOutCubic,
  }) {
    return Navigator.of(context).push<T>(
      SmoothPageRoute(
        builder: (_) => page,
        transitionType: TransitionType.slideFromBottom,
        curve: curve,
      ),
    );
  }

  static Future<T?> fadeInScale<T>(
    BuildContext context,
    Widget page, {
    Curve curve = Curves.easeInOutCubic,
  }) {
    return Navigator.of(context).push<T>(
      SmoothPageRoute(
        builder: (_) => page,
        transitionType: TransitionType.fadeInScale,
        curve: curve,
      ),
    );
  }

  static Future<T?> fadeOnly<T>(
    BuildContext context,
    Widget page, {
    Curve curve = Curves.easeInOutCubic,
  }) {
    return Navigator.of(context).push<T>(
      SmoothPageRoute(
        builder: (_) => page,
        transitionType: TransitionType.fadeOnly,
        curve: curve,
      ),
    );
  }

  static Future<T?> slideAndFade<T>(
    BuildContext context,
    Widget page, {
    Curve curve = Curves.easeInOutCubic,
  }) {
    return Navigator.of(context).push<T>(
      SmoothPageRoute(
        builder: (_) => page,
        transitionType: TransitionType.slideAndFade,
        curve: curve,
      ),
    );
  }

  static Future<T?> scaleUp<T>(
    BuildContext context,
    Widget page, {
    Curve curve = Curves.easeInOutCubic,
  }) {
    return Navigator.of(context).push<T>(
      SmoothPageRoute(
        builder: (_) => page,
        transitionType: TransitionType.scaleUp,
        curve: curve,
      ),
    );
  }
}
