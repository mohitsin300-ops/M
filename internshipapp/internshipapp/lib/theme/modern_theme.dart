import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ModernTheme {
  // Colors
  static const Color primary = Color(0xFF2563EB);
  static const Color secondary = Color(0xFF7C3AED);
  static const Color accent = Color(0xFF06B6D4);
  static const Color success = Color(0xFF10B981);
  static const Color warning = Color(0xFFF59E0B);
  static const Color danger = Color(0xFFDC2626);

  static const Color darkGray = Color(0xFF1F2937);
  static const Color mediumGray = Color(0xFF6B7280);
  static const Color lightGray = Color(0xFFE5E7EB);
  static const Color veryLightGray = Color(0xFFF9FAFB);

  // Gradients
  static const LinearGradient primaryGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFF2563EB), Color(0xFF7C3AED), Color(0xFF06B6D4)],
  );

  static const LinearGradient blueGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFF2563EB), Color(0xFF1D4ED8)],
  );

  static const LinearGradient purpleGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFF7C3AED), Color(0xFF6D28D9)],
  );

  // Text Styles
  static TextStyle heading1 = GoogleFonts.poppins(
    fontSize: 36,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
    color: darkGray,
  );

  static TextStyle heading2 = GoogleFonts.poppins(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
    color: darkGray,
  );

  static TextStyle heading3 = GoogleFonts.poppins(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: darkGray,
  );

  static TextStyle subtitle1 = GoogleFonts.poppins(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: mediumGray,
  );

  static TextStyle subtitle2 = GoogleFonts.poppins(
    fontSize: 14,
    fontWeight: FontWeight.w500,
    color: mediumGray,
  );

  static TextStyle body1 = GoogleFonts.poppins(
    fontSize: 14,
    fontWeight: FontWeight.w500,
    color: darkGray,
  );

  static TextStyle body2 = GoogleFonts.poppins(
    fontSize: 13,
    fontWeight: FontWeight.w400,
    color: mediumGray,
  );

  static TextStyle caption = GoogleFonts.poppins(
    fontSize: 12,
    fontWeight: FontWeight.w400,
    color: mediumGray,
  );

  // Button Styles
  static ButtonStyle primaryButtonStyle = ElevatedButton.styleFrom(
    backgroundColor: primary,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
    elevation: 0,
  );

  static ButtonStyle secondaryButtonStyle = ElevatedButton.styleFrom(
    backgroundColor: Colors.white,
    foregroundColor: primary,
    padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(14),
      side: const BorderSide(color: primary, width: 2),
    ),
    elevation: 0,
  );

  // Input Decoration
  static InputDecoration textFieldDecoration({
    required String label,
    required IconData prefixIcon,
    Widget? suffixIcon,
  }) {
    return InputDecoration(
      labelText: label,
      labelStyle: const TextStyle(
        color: mediumGray,
        fontWeight: FontWeight.w500,
      ),
      prefixIcon: Icon(prefixIcon, color: primary),
      suffixIcon: suffixIcon,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: lightGray, width: 2),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: lightGray, width: 2),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: primary, width: 2.5),
      ),
      filled: true,
      fillColor: veryLightGray,
      contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 12),
    );
  }

  // Card Shadow
  static List<BoxShadow> get cardShadow => [
    BoxShadow(
      color: Colors.black.withOpacity(0.08),
      blurRadius: 20,
      offset: const Offset(0, 4),
    ),
  ];

  static List<BoxShadow> get heavyShadow => [
    BoxShadow(
      color: Colors.black.withOpacity(0.15),
      blurRadius: 40,
      offset: const Offset(0, 20),
    ),
  ];

  // Card Decoration
  static BoxDecoration cardDecoration = BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(20),
    boxShadow: cardShadow,
  );
}
