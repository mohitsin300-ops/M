import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import '../theme/modern_theme.dart';

/// Shimmer skeleton loader - Facebook/Instagram style content placeholders
class SkeletonLoader extends StatelessWidget {
  final double width;
  final double height;
  final BorderRadius borderRadius;
  final Color baseColor;
  final Color highlightColor;
  final bool isCircular;
  final bool isTransparent;
  final double opacity;

  const SkeletonLoader({
    super.key,
    this.width = double.infinity,
    this.height = 20.0,
    this.borderRadius = const BorderRadius.all(Radius.circular(8)),
    this.baseColor = const Color(0xFFE0E0E0),
    this.highlightColor = const Color(0xFFF5F5F5),
    this.isCircular = false,
    this.isTransparent = false,
    this.opacity = 0.6,
  });

  @override
  Widget build(BuildContext context) {
    final Color effectiveBase = isTransparent
        ? baseColor.withOpacity(opacity)
        : baseColor;
    final Color effectiveHighlight = isTransparent
        ? highlightColor.withOpacity(opacity)
        : highlightColor;

    return Shimmer.fromColors(
      baseColor: effectiveBase,
      highlightColor: effectiveHighlight,
      child: isCircular
          ? Container(
              width: width,
              height: height,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: effectiveBase,
              ),
            )
          : Container(
              width: width,
              height: height,
              decoration: BoxDecoration(
                color: effectiveBase,
                borderRadius: borderRadius,
              ),
            ),
    );
  }
}

/// Adaptive banner skeleton - matches banner size (16:9 ratio)
class BannerSkeletonLoader extends StatelessWidget {
  final double? width;
  final double? height;
  final bool isTransparent;

  const BannerSkeletonLoader({
    super.key,
    this.width,
    this.height,
    this.isTransparent = true,
  });

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final effectiveWidth = width ?? screenWidth;
    final effectiveHeight = height ?? (effectiveWidth * 9 / 16); // 16:9 ratio

    return SkeletonLoader(
      width: effectiveWidth,
      height: effectiveHeight,
      borderRadius: BorderRadius.circular(12),
      isTransparent: isTransparent,
      opacity: 0.5,
    );
  }
}

/// Adaptive card skeleton - responsive to container size
class AdaptiveCardSkeletonLoader extends StatelessWidget {
  final double? height;
  final int lines;
  final double spacing;
  final bool hasImage;
  final bool isTransparent;

  const AdaptiveCardSkeletonLoader({
    super.key,
    this.height,
    this.lines = 3,
    this.spacing = 8,
    this.hasImage = true,
    this.isTransparent = true,
  });

  @override
  Widget build(BuildContext context) {
    final effectiveHeight = height ?? 150.0;

    return Shimmer.fromColors(
      baseColor: const Color(0xFFE0E0E0).withOpacity(isTransparent ? 0.5 : 1.0),
      highlightColor: const Color(
        0xFFF5F5F5,
      ).withOpacity(isTransparent ? 0.5 : 1.0),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFFE0E0E0).withOpacity(isTransparent ? 0.5 : 1.0),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (hasImage) ...[
              Container(
                width: double.infinity,
                height: effectiveHeight * 0.6,
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              SizedBox(height: spacing),
            ],
            // Text lines
            for (int i = 0; i < lines; i++) ...[
              Container(
                width: i == lines - 1 ? 70 : double.infinity,
                height: 10,
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
              if (i < lines - 1) SizedBox(height: spacing),
            ],
          ],
        ),
      ),
    );
  }
}

/// Card skeleton loader - for loading list items
class CardSkeletonLoader extends StatelessWidget {
  final double height;
  final int lines;
  final double spacing;

  const CardSkeletonLoader({
    super.key,
    this.height = 150,
    this.lines = 3,
    this.spacing = 8,
  });

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: const Color(0xFFE0E0E0),
      highlightColor: const Color(0xFFF5F5F5),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFFE0E0E0),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image placeholder
            Container(
              width: double.infinity,
              height: height * 0.6,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            SizedBox(height: spacing),
            // Text lines
            for (int i = 0; i < lines; i++) ...[
              Container(
                width: i == lines - 1 ? 70 : double.infinity,
                height: 10,
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
              if (i < lines - 1) SizedBox(height: spacing),
            ],
          ],
        ),
      ),
    );
  }
}

/// Profile skeleton loader
class ProfileSkeletonLoader extends StatelessWidget {
  const ProfileSkeletonLoader({super.key});

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: const Color(0xFFE0E0E0),
      highlightColor: const Color(0xFFF5F5F5),
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Profile header
          Column(
            children: [
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.grey[300],
                ),
              ),
              const SizedBox(height: 16),
              Container(width: 150, height: 16, color: Colors.grey[300]),
              const SizedBox(height: 8),
              Container(width: 200, height: 12, color: Colors.grey[300]),
            ],
          ),
          const SizedBox(height: 32),
          // Profile items
          for (int i = 0; i < 5; i++) ...[
            Padding(
              padding: const EdgeInsets.only(bottom: 16),
              child: Row(
                children: [
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Colors.grey[300],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(height: 12, color: Colors.grey[300]),
                        const SizedBox(height: 8),
                        Container(
                          width: 80,
                          height: 10,
                          color: Colors.grey[300],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

/// List skeleton loader - multiple items
class ListSkeletonLoader extends StatelessWidget {
  final int itemCount;
  final double itemHeight;

  const ListSkeletonLoader({
    super.key,
    this.itemCount = 5,
    this.itemHeight = 100,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: itemCount,
      itemBuilder: (context, index) {
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: CardSkeletonLoader(height: itemHeight),
        );
      },
    );
  }
}

/// Table/Grid skeleton loader
class GridSkeletonLoader extends StatelessWidget {
  final int crossAxisCount;
  final int itemCount;

  const GridSkeletonLoader({
    super.key,
    this.crossAxisCount = 2,
    this.itemCount = 6,
  });

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: crossAxisCount,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        childAspectRatio: 1,
      ),
      itemCount: itemCount,
      itemBuilder: (context, index) {
        return Shimmer.fromColors(
          baseColor: const Color(0xFFE0E0E0),
          highlightColor: const Color(0xFFF5F5F5),
          child: Container(
            decoration: BoxDecoration(
              color: Colors.grey[300],
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        );
      },
    );
  }
}

/// Text skeleton loader - single line
class TextSkeletonLoader extends StatelessWidget {
  final double width;
  final double height;
  final BorderRadius? borderRadius;

  const TextSkeletonLoader({
    super.key,
    this.width = double.infinity,
    this.height = 14,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    return SkeletonLoader(
      width: width,
      height: height,
      borderRadius: borderRadius ?? const BorderRadius.all(Radius.circular(4)),
    );
  }
}
