import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class InternshipApplyScreen extends StatefulWidget {
  const InternshipApplyScreen({super.key});

  @override
  State<InternshipApplyScreen> createState() => _InternshipApplyScreenState();
}

class _InternshipApplyScreenState extends State<InternshipApplyScreen> {
  final _formKey = GlobalKey<FormState>();
  final _fatherNameController = TextEditingController();
  final _collegeController = TextEditingController();

  String? _selectedGender;
  String? _selectedDomain;
  String? _selectedDuration;

  bool _isLoading = false;
  String? _errorMessage;

  final List<String> _domains = [
    "Frontend Developer",
    "Backend Developer",
    "React.js Developer",
    "MERN Stack Developer",
    "Android Developer",
    "Flutter Developer",
    "App Developer",
    "Python Developer",
    "Java Developer",
    "C++/C Programming",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Business Analytics",
    "Full Stack Web Development",
    "UI/UX Design",
    "Digital Marketing",
    "Cloud Computing",
    "Unity Game Developer",
  ];

  final List<String> _durations = [
    "1 Month",
    "45 Days",
    "3 Months",
    "4 Months",
    "6 Months",
  ];

  Future<void> _submitApplication() async {
    if (!_formKey.currentState!.validate()) return;

    if (_selectedGender == null ||
        _selectedDomain == null ||
        _selectedDuration == null) {
      setState(() => _errorMessage = "Please select all dropdown options.");
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user == null) throw Exception("Not logged in");

      final userDoc = await FirebaseFirestore.instance
          .collection('users')
          .doc(user.uid)
          .get();
      final userData = userDoc.data() ?? <String, dynamic>{};

      final name = userData['full_name'] ?? user.displayName ?? 'User';
      final phone = userData['whatsapp_number'] ?? '';

      await FirebaseFirestore.instance.collection('applications').add({
        'name': name,
        'email': user.email,
        'phone': phone,
        'father_name': _fatherNameController.text.trim(),
        'college': _collegeController.text.trim(),
        'gender': _selectedGender,
        'skills': _selectedDomain,
        'duration': _selectedDuration,
        'status': 'Pending',
        'user_id': user.uid,
        'created_at': FieldValue.serverTimestamp(),
      });

      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Application Submitted Successfully!'),
          backgroundColor: Colors.green,
        ),
      );
      Navigator.pop(context, true); // true indicates successful apply
    } catch (e) {
      setState(() => _errorMessage = e.toString());
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Join Internship',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        backgroundColor: const Color(0xFF512DA8),
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: Container(
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF512DA8), Color(0xFF311B92)],
          ),
        ),
        child: FadeInUp(
          child: Container(
            margin: const EdgeInsets.only(top: 10),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 30),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(40),
                topRight: Radius.circular(40),
              ),
            ),
            child: SingleChildScrollView(
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Icon(
                      Icons.rocket_launch,
                      size: 60,
                      color: Color(0xFF673AB7),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Complete Your Profile',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF311B92),
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Provide additional details to kickstart your career with MJ Tech Global.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.grey),
                    ),
                    const SizedBox(height: 30),

                    if (_errorMessage != null)
                      Container(
                        padding: const EdgeInsets.all(12),
                        margin: const EdgeInsets.only(bottom: 20),
                        decoration: BoxDecoration(
                          color: Colors.red.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          _errorMessage!,
                          style: const TextStyle(color: Colors.red),
                        ),
                      ),

                    _buildTextField(
                      _fatherNameController,
                      "Father's Name",
                      Icons.person_outline,
                    ),
                    const SizedBox(height: 16),
                    _buildTextField(
                      _collegeController,
                      "College / University",
                      Icons.school_outlined,
                    ),
                    const SizedBox(height: 16),

                    DropdownButtonFormField<String>(
                      value: _selectedGender,
                      decoration: InputDecoration(
                        labelText: 'Gender',
                        prefixIcon: const Icon(
                          Icons.people_outline,
                          color: Color(0xFF673AB7),
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                        ),
                        filled: true,
                        fillColor: Colors.grey.shade50,
                      ),
                      items: ['Male', 'Female', 'Other']
                          .map(
                            (g) => DropdownMenuItem(value: g, child: Text(g)),
                          )
                          .toList(),
                      onChanged: (val) => setState(() => _selectedGender = val),
                    ),
                    const SizedBox(height: 16),

                    DropdownButtonFormField<String>(
                      value: _selectedDomain,
                      decoration: InputDecoration(
                        labelText: 'Technology / Domain',
                        prefixIcon: const Icon(
                          Icons.computer_outlined,
                          color: Color(0xFF673AB7),
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                        ),
                        filled: true,
                        fillColor: Colors.grey.shade50,
                      ),
                      items: _domains
                          .map(
                            (d) => DropdownMenuItem(value: d, child: Text(d)),
                          )
                          .toList(),
                      onChanged: (val) => setState(() => _selectedDomain = val),
                    ),
                    const SizedBox(height: 16),

                    DropdownButtonFormField<String>(
                      value: _selectedDuration,
                      decoration: InputDecoration(
                        labelText: 'Internship Duration',
                        prefixIcon: const Icon(
                          Icons.timer_outlined,
                          color: Color(0xFF673AB7),
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                        ),
                        filled: true,
                        fillColor: Colors.grey.shade50,
                      ),
                      items: _durations
                          .map(
                            (d) => DropdownMenuItem(value: d, child: Text(d)),
                          )
                          .toList(),
                      onChanged: (val) =>
                          setState(() => _selectedDuration = val),
                    ),

                    const SizedBox(height: 40),
                    ElevatedButton(
                      onPressed: _isLoading ? null : _submitApplication,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF673AB7),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15),
                        ),
                        elevation: 4,
                      ),
                      child: _isLoading
                          ? const SizedBox(
                              height: 24,
                              width: 24,
                              child: CircularProgressIndicator(
                                color: Colors.white,
                                strokeWidth: 2,
                              ),
                            )
                          : const Text(
                              'Submit Application',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(
    TextEditingController controller,
    String label,
    IconData icon,
  ) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon, color: const Color(0xFF673AB7)),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
        filled: true,
        fillColor: Colors.grey.shade50,
      ),
      validator: (value) => value!.isEmpty ? 'Required' : null,
    );
  }
}
