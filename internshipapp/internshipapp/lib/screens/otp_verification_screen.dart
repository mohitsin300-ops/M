import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'dashboard_screen.dart';
import 'login_screen.dart';

class OtpVerificationScreen extends StatefulWidget {
  final String email;
  final bool isRecovery;

  const OtpVerificationScreen({super.key, required this.email, this.isRecovery = false});

  @override
  State<OtpVerificationScreen> createState() => _OtpVerificationScreenState();
}

class _OtpVerificationScreenState extends State<OtpVerificationScreen> {
  bool _isLoading = false;
  String? _errorMessage;

  void _verifyOtp() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final user = FirebaseAuth.instance.currentUser;
      if (widget.isRecovery) {
        if (!mounted) return;
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (_) => const LoginScreen()),
          (route) => false,
        );
        return;
      }

      await user?.reload();
      final refreshed = FirebaseAuth.instance.currentUser;

      if (refreshed != null && refreshed.emailVerified) {
        if (!mounted) return;
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (_) => const DashboardScreen()),
          (route) => false,
        );
      } else {
        setState(() {
          _errorMessage = 'Email is not verified yet. Please verify from inbox and try again.';
        });
      }
    } on FirebaseAuthException catch (e) {
      setState(() => _errorMessage = e.message ?? 'Verification failed.');
    } catch (e) {
      setState(() => _errorMessage = 'Unexpected error occurred. Please try again.');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _resendOtp() async {
    try {
      if (widget.isRecovery) {
        await FirebaseAuth.instance.sendPasswordResetEmail(email: widget.email);
      } else {
        await FirebaseAuth.instance.currentUser?.sendEmailVerification();
      }
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(widget.isRecovery ? 'Reset link resent!' : 'Verification email resent!'),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.isRecovery ? 'Password Recovery' : 'Email Verification', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF512DA8),
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: Container(
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Color(0xFF512DA8), Color(0xFF311B92)]),
        ),
        child: FadeInUp(
          child: Container(
            margin: const EdgeInsets.only(top: 20),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(topLeft: Radius.circular(40), topRight: Radius.circular(40)),
            ),
            child: SingleChildScrollView(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Icon(Icons.mark_email_read_outlined, size: 70, color: Color(0xFF311B92)),
                    const SizedBox(height: 20),
                    Text(
                      widget.isRecovery ? 'Reset your password' : 'Verify your email',
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Color(0xFF311B92)),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      widget.isRecovery
                          ? 'We sent a password reset email to\n${widget.email}'
                          : 'We sent a verification email to\n${widget.email}',
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: Colors.grey, fontSize: 16),
                    ),
                    const SizedBox(height: 30),
                    
                    if (_errorMessage != null)
                      Container(
                        padding: const EdgeInsets.all(12),
                        margin: const EdgeInsets.only(bottom: 20),
                        decoration: BoxDecoration(color: Colors.red.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
                        child: Text(_errorMessage!, style: const TextStyle(color: Colors.red)),
                      ),
                      
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: Colors.grey.shade100,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        widget.isRecovery
                            ? 'Open your inbox and reset password using the secure link.'
                            : 'Open your inbox and tap the verification link. Then come back and continue.',
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: Colors.black54, height: 1.4),
                      ),
                    ),

                    const SizedBox(height: 40),
                    ElevatedButton(
                      onPressed: _isLoading ? null : _verifyOtp,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF512DA8),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                        elevation: 4,
                      ),
                      child: _isLoading 
                          ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                          : Text(widget.isRecovery ? 'Back to Login' : 'I Verified, Continue', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    ),
                    const SizedBox(height: 20),
                    TextButton(
                      onPressed: _resendOtp,
                      child: Text(
                        widget.isRecovery ? 'Resend reset link' : 'Didn\'t receive email? Resend',
                        style: const TextStyle(color: Color(0xFF673AB7), fontWeight: FontWeight.bold),
                      ),
                    )
                  ],
                ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
  }
}
