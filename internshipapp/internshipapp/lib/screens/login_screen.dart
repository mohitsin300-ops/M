import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:animate_do/animate_do.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../services/firebase_service.dart';
import 'registration_screen.dart';
import 'auth_gate.dart';
import 'forgot_password_screen.dart' as forgot_pw;

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;
  bool _obscurePassword = true;
  String? _errorMessage;

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final response = await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text,
      );

      if (response.user != null) {
        await FirebaseService.ensureUserProfile(response.user!);
        if (!mounted) return;
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (_) => const AuthGate()),
          (route) => false,
        );
      }
    } on FirebaseAuthException catch (e) {
      setState(() => _errorMessage = e.message ?? 'Authentication failed.');
    } catch (e) {
      setState(() => _errorMessage = 'Unexpected error occurred.');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _loginWithGoogle() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final credential = await FirebaseService.signInWithGoogle();
      if (credential.user != null) {
        await FirebaseService.ensureUserProfile(credential.user!);
      }

      if (!mounted) return;
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => const AuthGate()),
        (route) => false,
      );
    } on FirebaseAuthException catch (e) {
      setState(() => _errorMessage = e.message ?? 'Google sign-in failed.');
    } catch (_) {
      setState(() => _errorMessage = 'Google sign-in failed. Please try again.');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF2563EB), Color(0xFF7C3AED), Color(0xFF06B6D4)],
          ),
        ),
        child: Stack(
          children: [
            // Animated background shapes
            Positioned(
              top: -50,
              right: -50,
              child: FadeInDown(
                duration: const Duration(milliseconds: 1200),
                child: Container(
                  width: 200,
                  height: 200,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white.withOpacity(0.1),
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: -100,
              left: -50,
              child: FadeInUp(
                duration: const Duration(milliseconds: 1200),
                child: Container(
                  width: 300,
                  height: 300,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white.withOpacity(0.05),
                  ),
                ),
              ),
            ),

            SingleChildScrollView(
              child: Column(
                children: [
                  SizedBox(height: size.height * 0.12),

                  // Logo & Title
                  FadeInDown(
                    duration: const Duration(milliseconds: 800),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.white.withOpacity(0.15),
                        border: Border.all(
                          color: Colors.white.withOpacity(0.3),
                          width: 2,
                        ),
                      ),
                      child: const Icon(
                        Icons.school_rounded,
                        size: 60,
                        color: Colors.white,
                      ),
                    ),
                  ),

                  const SizedBox(height: 24),

                  FadeInDown(
                    delay: const Duration(milliseconds: 200),
                    duration: const Duration(milliseconds: 800),
                    child: const Text(
                      'MJ Tech Global',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                        letterSpacing: -0.5,
                      ),
                    ),
                  ),

                  const SizedBox(height: 8),

                  FadeInDown(
                    delay: const Duration(milliseconds: 400),
                    duration: const Duration(milliseconds: 800),
                    child: const Text(
                      'Internship Management Portal',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),

                  SizedBox(height: size.height * 0.08),

                  // Login Form Card
                  FadeInUp(
                    duration: const Duration(milliseconds: 1000),
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 24),
                      padding: const EdgeInsets.all(32),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(28),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.15),
                            blurRadius: 40,
                            offset: const Offset(0, 20),
                          ),
                        ],
                      ),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            const Text(
                              'Welcome Back',
                              style: TextStyle(
                                fontSize: 28,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF1F2937),
                                letterSpacing: -0.5,
                              ),
                            ),
                            const SizedBox(height: 8),
                            const Text(
                              'Sign in to your account to continue',
                              style: TextStyle(
                                fontSize: 14,
                                color: Color(0xFF6B7280),
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
                                    color: const Color(
                                      0xFFDC2626,
                                    ).withOpacity(0.1),
                                    border: Border.all(
                                      color: const Color(
                                        0xFFDC2626,
                                      ).withOpacity(0.5),
                                    ),
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: Row(
                                    children: [
                                      const Icon(
                                        Icons.error_rounded,
                                        color: Color(0xFFDC2626),
                                        size: 20,
                                      ),
                                      const SizedBox(width: 12),
                                      Expanded(
                                        child: Text(
                                          _errorMessage!,
                                          style: const TextStyle(
                                            color: Color(0xFFDC2626),
                                            fontSize: 13,
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),

                            // Email Field
                            TextFormField(
                              controller: _emailController,
                              keyboardType: TextInputType.emailAddress,
                              decoration: InputDecoration(
                                labelText: 'Email Address',
                                labelStyle: const TextStyle(
                                  color: Color(0xFF6B7280),
                                  fontWeight: FontWeight.w500,
                                ),
                                prefixIcon: const Icon(
                                  Icons.mail_outline_rounded,
                                  color: Color(0xFF2563EB),
                                ),
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(14),
                                  borderSide: const BorderSide(
                                    color: Color(0xFFE5E7EB),
                                    width: 2,
                                  ),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(14),
                                  borderSide: const BorderSide(
                                    color: Color(0xFFE5E7EB),
                                    width: 2,
                                  ),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(14),
                                  borderSide: const BorderSide(
                                    color: Color(0xFF2563EB),
                                    width: 2.5,
                                  ),
                                ),
                                filled: true,
                                fillColor: const Color(0xFFF9FAFB),
                              ),
                              validator: (value) =>
                                  value!.isEmpty ? 'Email is required' : null,
                            ),

                            const SizedBox(height: 16),

                            // Password Field
                            TextFormField(
                              controller: _passwordController,
                              obscureText: _obscurePassword,
                              decoration: InputDecoration(
                                labelText: 'Password',
                                labelStyle: const TextStyle(
                                  color: Color(0xFF6B7280),
                                  fontWeight: FontWeight.w500,
                                ),
                                prefixIcon: const Icon(
                                  Icons.lock_outline_rounded,
                                  color: Color(0xFF2563EB),
                                ),
                                suffixIcon: IconButton(
                                  icon: Icon(
                                    _obscurePassword
                                        ? Icons.visibility_off_rounded
                                        : Icons.visibility_rounded,
                                    color: const Color(0xFF6B7280),
                                  ),
                                  onPressed: () => setState(
                                    () => _obscurePassword = !_obscurePassword,
                                  ),
                                ),
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(14),
                                  borderSide: const BorderSide(
                                    color: Color(0xFFE5E7EB),
                                    width: 2,
                                  ),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(14),
                                  borderSide: const BorderSide(
                                    color: Color(0xFFE5E7EB),
                                    width: 2,
                                  ),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(14),
                                  borderSide: const BorderSide(
                                    color: Color(0xFF2563EB),
                                    width: 2.5,
                                  ),
                                ),
                                filled: true,
                                fillColor: const Color(0xFFF9FAFB),
                              ),
                              validator: (value) => value!.isEmpty
                                  ? 'Password is required'
                                  : null,
                            ),

                            const SizedBox(height: 12),

                            // Forgot Password Link
                            Align(
                              alignment: Alignment.centerRight,
                              child: TextButton(
                                onPressed: () => Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (_) =>
                                        const forgot_pw.ForgotPasswordScreen(),
                                  ),
                                ),
                                child: const Text(
                                  'Forgot Password?',
                                  style: TextStyle(
                                    color: Color(0xFF2563EB),
                                    fontWeight: FontWeight.w600,
                                    fontSize: 14,
                                  ),
                                ),
                              ),
                            ),

                            const SizedBox(height: 24),

                            // Login Button
                            ElevatedButton(
                              onPressed: _isLoading ? null : _login,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF2563EB),
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(
                                  vertical: 14,
                                ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(14),
                                ),
                                elevation: 0,
                                disabledBackgroundColor: const Color(
                                  0xFF2563EB,
                                ).withOpacity(0.5),
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
                                      'Sign In',
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
                                Expanded(child: Divider(color: Color(0xFFE5E7EB))),
                                Padding(
                                  padding: EdgeInsets.symmetric(horizontal: 10),
                                  child: Text(
                                    'or',
                                    style: TextStyle(color: Color(0xFF6B7280)),
                                  ),
                                ),
                                Expanded(child: Divider(color: Color(0xFFE5E7EB))),
                              ],
                            ),

                            const SizedBox(height: 16),

                            OutlinedButton.icon(
                              onPressed: _isLoading ? null : _loginWithGoogle,
                              icon: const FaIcon(
                                FontAwesomeIcons.google,
                                size: 16,
                                color: Color(0xFFDB4437),
                              ),
                              label: const Text(
                                'Continue with Google',
                                style: TextStyle(
                                  color: Color(0xFF1F2937),
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              style: OutlinedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 12),
                                side: const BorderSide(color: Color(0xFFE5E7EB), width: 1.5),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(14),
                                ),
                                backgroundColor: Colors.white,
                              ),
                            ),

                            const SizedBox(height: 20),

                            // Signup Link
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text(
                                  'Don\'t have an account? ',
                                  style: TextStyle(
                                    color: Color(0xFF6B7280),
                                    fontSize: 14,
                                  ),
                                ),
                                GestureDetector(
                                  onTap: () => Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (_) =>
                                          const RegistrationScreen(),
                                    ),
                                  ),
                                  child: const Text(
                                    'Sign Up',
                                    style: TextStyle(
                                      color: Color(0xFF2563EB),
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

                  SizedBox(height: size.height * 0.05),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
