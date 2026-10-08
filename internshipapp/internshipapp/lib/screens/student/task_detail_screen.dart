import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class TaskDetailScreen extends StatefulWidget {
  final Map<String, dynamic> task;

  const TaskDetailScreen({super.key, required this.task});

  @override
  State<TaskDetailScreen> createState() => _TaskDetailScreenState();
}

class _TaskDetailScreenState extends State<TaskDetailScreen> {
  final _submissionController = TextEditingController();
  bool _isLoading = false;

  void _submitTask() async {
    if (_submissionController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please provide your submission link or text.')));
      return;
    }
    
    setState(() => _isLoading = true);
    
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        await FirebaseFirestore.instance.collection('student_tasks').add({
          'task_id': widget.task['id'],
          'student_id': user.uid,
          'submission_content': _submissionController.text.trim(),
          'status': 'submitted',
          'created_at': FieldValue.serverTimestamp(),
        });
      }

      if (mounted) {
        setState(() => _isLoading = false);
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text('Task Submitted Successfully!'),
          backgroundColor: Colors.green,
        ));
        Navigator.pop(context, true); // Return true to refresh list
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
        title: const Text('Task Details', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
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
              child: Text(
                widget.task['title'] ?? 'Task Title',
                style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Color(0xFF311B92)),
              ),
            ),
            const SizedBox(height: 16),
            FadeInDown(
              delay: const Duration(milliseconds: 100),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(color: Colors.orange.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
                child: const Text('Status: Pending Submission', style: TextStyle(color: Colors.orange, fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 30),
            
            FadeInUp(
              delay: const Duration(milliseconds: 200),
              child: const Text('Instructions:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 12),
            FadeInUp(
              delay: const Duration(milliseconds: 300),
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(15),
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10, offset: const Offset(0, 4))],
                ),
                child: Text(
                  widget.task['description'] ?? 'No description provided.',
                  style: const TextStyle(fontSize: 16, color: Colors.black87, height: 1.5),
                ),
              ),
            ),
            const SizedBox(height: 40),
            
            FadeInUp(
              delay: const Duration(milliseconds: 400),
              child: const Text('Your Submission', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 16),
            FadeInUp(
              delay: const Duration(milliseconds: 500),
              child: TextField(
                controller: _submissionController,
                maxLines: 4,
                decoration: InputDecoration(
                  hintText: 'Paste your GitHub repo link, Drive link, or type your answer here...',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
            ),
            const SizedBox(height: 30),
            FadeInUp(
              delay: const Duration(milliseconds: 600),
              child: ElevatedButton.icon(
                onPressed: _isLoading ? null : _submitTask,
                icon: _isLoading ? const SizedBox() : const Icon(Icons.check_circle_outline),
                label: _isLoading 
                    ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Mark as Completed', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF673AB7),
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
