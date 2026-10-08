import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class ProjectSubmissionScreen extends StatefulWidget {
  const ProjectSubmissionScreen({super.key});

  @override
  State<ProjectSubmissionScreen> createState() => _ProjectSubmissionScreenState();
}

class _ProjectSubmissionScreenState extends State<ProjectSubmissionScreen> {
  final _projectLinkController = TextEditingController();
  final _videoLinkController = TextEditingController();
  final _commentsController = TextEditingController();
  bool _isLoading = false;

  void _submitProject() async {
    if (_projectLinkController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Repository/Project link is required.')));
      return;
    }
    
    setState(() => _isLoading = true);
    
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        await FirebaseFirestore.instance.collection('final_projects').add({
          'student_id': user.uid,
          'project_link': _projectLinkController.text.trim(),
          'video_link': _videoLinkController.text.trim(),
          'comments': _commentsController.text.trim(),
          'status': 'submitted',
          'created_at': FieldValue.serverTimestamp(),
        });
      }

      if (mounted) {
        setState(() => _isLoading = false);
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text('Final Project Submitted Successfully! 🎉'),
          backgroundColor: Colors.green,
        ));
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isLoading = false);
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Error: ${e.toString()}'),
          backgroundColor: Colors.red,
        ));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        title: const Text('Final Project Submission', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF673AB7),
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            FadeInDown(
              child: Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF673AB7), Color(0xFF512DA8)]),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [BoxShadow(color: const Color(0xFF673AB7).withOpacity(0.4), blurRadius: 15, offset: const Offset(0, 8))],
                ),
                child: const Column(
                  children: [
                    Icon(Icons.emoji_events, color: Colors.amber, size: 60),
                    SizedBox(height: 16),
                    Text('Congratulations!', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
                    SizedBox(height: 8),
                    Text(
                      'You have reached the final stage of your internship. Submit your final project here for review to receive your certificate.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.white70, fontSize: 14, height: 1.4),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 30),
            
            FadeInUp(
              delay: const Duration(milliseconds: 200),
              child: TextField(
                controller: _projectLinkController,
                decoration: InputDecoration(
                  labelText: 'GitHub Repository / Project Link *',
                  prefixIcon: const Icon(Icons.link, color: Color(0xFF673AB7)),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
            ),
            const SizedBox(height: 16),
            FadeInUp(
              delay: const Duration(milliseconds: 300),
              child: TextField(
                controller: _videoLinkController,
                decoration: InputDecoration(
                  labelText: 'Demo Video Link (Optional)',
                  prefixIcon: const Icon(Icons.play_circle_outline, color: Color(0xFF673AB7)),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
            ),
            const SizedBox(height: 16),
            FadeInUp(
              delay: const Duration(milliseconds: 400),
              child: TextField(
                controller: _commentsController,
                maxLines: 4,
                decoration: InputDecoration(
                  labelText: 'Additional Comments or Setup Instructions',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
            ),
            const SizedBox(height: 40),
            
            FadeInUp(
              delay: const Duration(milliseconds: 500),
              child: ElevatedButton.icon(
                onPressed: _isLoading ? null : _submitProject,
                icon: _isLoading ? const SizedBox() : const Icon(Icons.cloud_upload),
                label: _isLoading 
                    ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Submit Final Project', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1565C0),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                  elevation: 5,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
