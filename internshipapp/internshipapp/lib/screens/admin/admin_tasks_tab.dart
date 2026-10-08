import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AdminTasksTab extends StatefulWidget {
  const AdminTasksTab({super.key});

  @override
  State<AdminTasksTab> createState() => _AdminTasksTabState();
}

class _AdminTasksTabState extends State<AdminTasksTab> {
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  bool _isLoading = false;
  String _targetAudience = 'All Students';

  void _createTask() async {
    if (_titleController.text.isEmpty || _descController.text.isEmpty) return;
    setState(() => _isLoading = true);
    
    try {
      await FirebaseFirestore.instance.collection('tasks').add({
        'title': _titleController.text.trim(),
        'description': _descController.text.trim(),
        'target_audience': _targetAudience,
        'created_at': FieldValue.serverTimestamp(),
      });

      if (mounted) {
        setState(() {
          _isLoading = false;
          _titleController.clear();
          _descController.clear();
        });
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text('Task Assigned Successfully!'),
          backgroundColor: Colors.green,
        ));
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
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: FadeInUp(
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20)],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Row(
                children: [
                   Icon(Icons.assignment_add, color: Color(0xFF1565C0), size: 30),
                   SizedBox(width: 10),
                   Text('Assign New Task', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF1565C0))),
                ],
              ),
              const SizedBox(height: 24),
              TextField(
                controller: _titleController,
                decoration: InputDecoration(
                  labelText: 'Task Title',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                  filled: true,
                  fillColor: Colors.grey.shade50,
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _descController,
                maxLines: 4,
                decoration: InputDecoration(
                  labelText: 'Task Description & Instructions',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                  filled: true,
                  fillColor: Colors.grey.shade50,
                ),
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey.shade400),
                  borderRadius: BorderRadius.circular(15)
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _targetAudience,
                    isExpanded: true,
                    items: const [
                      DropdownMenuItem(value: 'All Students', child: Text('Assign to: All Students')),
                      DropdownMenuItem(value: 'Top Performers', child: Text('Assign to: Top Performers')),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _targetAudience = val);
                    },
                  ),
                ),
              ),
              const SizedBox(height: 30),
              ElevatedButton(
                onPressed: _isLoading ? null : _createTask,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1565C0),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                ),
                child: _isLoading 
                    ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Assign Task', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              )
            ],
          ),
        ),
      ),
    );
  }
}
