import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:firebase_auth/firebase_auth.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final _emailController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;
  String? _errorMessage;

  void _sendRecoveryOtp() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      await FirebaseAuth.instance.sendPasswordResetEmail(
        email: _emailController.text.trim(),
      );

      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Password reset email sent successfully.'),
          backgroundColor: Colors.green,
        ),
      );
      Navigator.pop(context);
    } on FirebaseAuthException catch (e) {
      setState(() => _errorMessage = e.message ?? 'Unable to send reset email.');
    } catch (e) {
      setState(() => _errorMessage = 'Unexpected error occurred.');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Forgot Password', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF673AB7),
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: Container(
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Color(0xFF673AB7), Color(0xFF311B92)]),
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
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Icon(Icons.lock_reset, size: 80, color: Color(0xFF673AB7)),
                    const SizedBox(height: 20),
                    const Text('Password Recovery', textAlign: TextAlign.center, style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Color(0xFF311B92))),
                    const SizedBox(height: 12),
                    const Text(
                      'Enter the email address associated with your account and we will send you a password reset link.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.grey, fontSize: 15, height: 1.4),
                    ),
                    const SizedBox(height: 40),
                    
                    if (_errorMessage != null)
                      Container(
                        padding: const EdgeInsets.all(12),
                        margin: const EdgeInsets.only(bottom: 20),
                        decoration: BoxDecoration(color: Colors.red.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
                        child: Text(_errorMessage!, style: const TextStyle(color: Colors.red)),
                      ),
                      
                    TextFormField(
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        labelText: 'Email Address',
                        prefixIcon: const Icon(Icons.email_outlined, color: Color(0xFF673AB7)),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                        filled: true,
                        fillColor: Colors.grey.shade50,
                      ),
                      validator: (value) => value!.isEmpty ? 'Please enter an email address' : null,
                    ),
                    const SizedBox(height: 40),
                    
                    ElevatedButton(
                      onPressed: _isLoading ? null : _sendRecoveryOtp,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF673AB7),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                        elevation: 4,
                      ),
                      child: _isLoading 
                          ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                            : const Text('Send Reset Link', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
