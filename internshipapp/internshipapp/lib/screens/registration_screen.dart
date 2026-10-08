import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:animate_do/animate_do.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../services/firebase_service.dart';
import '../theme/modern_theme.dart';
import 'auth_gate.dart';
import 'otp_verification_screen.dart' as otp;

class RegistrationScreen extends StatefulWidget {
  const RegistrationScreen({super.key});

  @override
  State<RegistrationScreen> createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _whatsappController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;
  bool _obscurePassword = true;
  String? _errorMessage;
  String? _successMessage;

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() {
      _isLoading = true;
      _errorMessage = null;
      _successMessage = null;
    });

    try {
      final response = await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text,
      );

      await response.user?.updateDisplayName(_nameController.text.trim());
      if (response.user != null) {
        await FirebaseService.upsertUserProfile(
          uid: response.user!.uid,
          email: _emailController.text.trim(),
          fullName: _nameController.text.trim(),
          whatsapp: _whatsappController.text.trim(),
        );
      }

      await response.user?.sendEmailVerification();
      await FirebaseAuth.instance.signOut();

      if (response.user != null) {
        if (!mounted) return;
        final email = _emailController.text.trim();

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (_) =>
                otp.OtpVerificationScreen(email: email, isRecovery: false),
          ),
        );
      }
    } on FirebaseAuthException catch (e) {
      setState(
        () => _errorMessage =
            (e.message ?? '').toLowerCase().contains('already')
            ? 'This email is already registered.'
            : (e.message ?? 'Registration failed.'),
      );
    } catch (e) {
      setState(() => _errorMessage = 'Unexpected error occurred.');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _registerWithGoogle() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
      _successMessage = null;
    });

    try {
      final credential = await FirebaseService.signInWithGoogle();
      final user = credential.user;
      if (user != null) {
        await FirebaseService.ensureUserProfile(user);
      }

      if (!mounted) return;
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => const AuthGate()),
        (route) => false,
      );
    } on FirebaseAuthException catch (e) {
      setState(() => _errorMessage = e.message ?? 'Google signup failed.');
    } catch (_) {
      setState(() => _errorMessage = 'Google signup failed. Please try again.');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_rounded,
            color: ModernTheme.darkGray,
          ),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Create Account',
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            color: ModernTheme.darkGray,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
        child: FadeInUp(
          duration: const Duration(milliseconds: 600),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'Join MJ Tech Global',
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: ModernTheme.darkGray,
                    letterSpacing: -0.5,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Start your internship journey with us today!',
                  style: TextStyle(
                    fontSize: 14,
                    color: ModernTheme.mediumGray,
                    fontWeight: FontWeight.w500,
                  ),
                ),

                const SizedBox(height: 28),

                // Error Message
                if (_errorMessage != null)
                  FadeIn(
                    child: Container(
                      padding: const EdgeInsets.all(14),
                      margin: const EdgeInsets.only(bottom: 20),
                      decoration: BoxDecoration(
                        color: ModernTheme.danger.withOpacity(0.1),
                        border: Border.all(
                          color: ModernTheme.danger.withOpacity(0.5),
                        ),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        children: [
                          const Icon(
                            Icons.error_rounded,
                            color: ModernTheme.danger,
                            size: 20,
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              _errorMessage!,
                              style: const TextStyle(
                                color: ModernTheme.danger,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                // Success Message
                if (_successMessage != null)
                  FadeIn(
                    child: Container(
                      padding: const EdgeInsets.all(14),
                      margin: const EdgeInsets.only(bottom: 20),
                      decoration: BoxDecoration(
                        color: ModernTheme.success.withOpacity(0.1),
                        border: Border.all(
                          color: ModernTheme.success.withOpacity(0.5),
                        ),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        children: [
                          const Icon(
                            Icons.check_circle_rounded,
                            color: ModernTheme.success,
                            size: 20,
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              _successMessage!,
                              style: const TextStyle(
                                color: ModernTheme.success,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                // Full Name Field
                TextFormField(
                  controller: _nameController,
                  decoration: ModernTheme.textFieldDecoration(
                    label: 'Full Name',
                    prefixIcon: Icons.person_outline_rounded,
                  ),
                  validator: (value) =>
                      value!.isEmpty ? 'Name is required' : null,
                ),

                const SizedBox(height: 16),

                // Email Field
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: ModernTheme.textFieldDecoration(
                    label: 'Email Address',
                    prefixIcon: Icons.mail_outline_rounded,
                  ),
                  validator: (value) => value!.isEmpty
                      ? 'Email is required'
                      : (!value.contains('@') ? 'Enter a valid email' : null),
                ),

                const SizedBox(height: 16),

                // WhatsApp Number Field
                TextFormField(
                  controller: _whatsappController,
                  keyboardType: TextInputType.phone,
                  decoration: ModernTheme.textFieldDecoration(
                    label: 'WhatsApp Number',
                    prefixIcon: Icons.phone_outlined,
                  ),
                  validator: (value) =>
                      value!.isEmpty ? 'WhatsApp number is required' : null,
                ),

                const SizedBox(height: 16),

                // Password Field
                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    labelStyle: const TextStyle(
                      color: ModernTheme.mediumGray,
                      fontWeight: FontWeight.w500,
                    ),
                    prefixIcon: const Icon(
                      Icons.lock_outline_rounded,
                      color: ModernTheme.primary,
                    ),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword
                            ? Icons.visibility_off_rounded
                            : Icons.visibility_rounded,
                        color: ModernTheme.mediumGray,
                      ),
                      onPressed: () =>
                          setState(() => _obscurePassword = !_obscurePassword),
                    ),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                      borderSide: const BorderSide(
                        color: ModernTheme.lightGray,
                        width: 2,
                      ),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                      borderSide: const BorderSide(
                        color: ModernTheme.lightGray,
                        width: 2,
                      ),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                      borderSide: const BorderSide(
                        color: ModernTheme.primary,
                        width: 2.5,
                      ),
                    ),
                    filled: true,
                    fillColor: ModernTheme.veryLightGray,
                    contentPadding: const EdgeInsets.symmetric(
                      vertical: 16,
                      horizontal: 12,
                    ),
                  ),
                  validator: (value) => value!.isEmpty
                      ? 'Password is required'
                      : (value.length < 6
                            ? 'Password must be at least 6 characters'
                            : null),
                ),

                const SizedBox(height: 28),

                // Register Button
                ElevatedButton(
                  onPressed: _isLoading || _successMessage != null
                      ? null
                      : _register,
                  style: ModernTheme.primaryButtonStyle.copyWith(
                    padding: MaterialStateProperty.all(
                      const EdgeInsets.symmetric(vertical: 14),
                    ),
                  ),
                  child: _isLoading
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(
                            color: Colors.white,
                            strokeWidth: 2.5,
                          ),
                        )
                      : const Text(
                          'Create Account',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.5,
                          ),
                        ),
                ),

                const SizedBox(height: 20),

                Row(
                  children: const [
                    Expanded(
                      child: Divider(color: ModernTheme.lightGray),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 10),
                      child: Text(
                        'or',
                        style: TextStyle(color: ModernTheme.mediumGray),
                      ),
                    ),
                    Expanded(
                      child: Divider(color: ModernTheme.lightGray),
                    ),
                  ],
                ),

                const SizedBox(height: 16),

                OutlinedButton.icon(
                  onPressed: _isLoading ? null : _registerWithGoogle,
                  icon: const FaIcon(
                    FontAwesomeIcons.google,
                    size: 16,
                    color: Color(0xFFDB4437),
                  ),
                  label: const Text(
                    'Continue with Google',
                    style: TextStyle(
                      color: ModernTheme.darkGray,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 13),
                    side: const BorderSide(
                      color: ModernTheme.lightGray,
                      width: 1.5,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                    backgroundColor: Colors.white,
                  ),
                ),

                const SizedBox(height: 20),

                // Login Link
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'Already have an account? ',
                      style: TextStyle(
                        color: ModernTheme.mediumGray,
                        fontSize: 14,
                      ),
                    ),
                    GestureDetector(
                      onTap: () => Navigator.pop(context),
                      child: const Text(
                        'Sign In',
                        style: TextStyle(
                          color: ModernTheme.primary,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _whatsappController.dispose();
    super.dispose();
  }
}
