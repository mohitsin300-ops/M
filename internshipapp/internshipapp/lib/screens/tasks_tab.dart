import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../theme/modern_theme.dart';
import 'student/task_detail_screen.dart' as student;
import 'student/project_submission_screen.dart' as student;

class TasksTab extends StatefulWidget {
  const TasksTab({super.key});

  @override
  State<TasksTab> createState() => _TasksTabState();
}

class _TasksTabState extends State<TasksTab> {
  bool _isLoading = true;
  List<dynamic> _tasks = [];

  @override
  void initState() {
    super.initState();
    _fetchTasks();
  }

  Future<void> _fetchTasks() async {
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('tasks')
          .orderBy('created_at', descending: true)
          .get();
      final data = snapshot.docs.map((doc) {
        final item = doc.data();
        item['id'] = doc.id;
        return item;
      }).toList();
      
      if (mounted) {
        setState(() {
          _tasks = data;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAFAFA),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 0,
        title: const Text(
          'My Tasks',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: ModernTheme.darkGray,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded, color: ModernTheme.primary),
            onPressed: () {
               setState(() => _isLoading = true);
               _fetchTasks();
            },
          )
        ],
      ),
      body: _isLoading 
          ? Center(child: CircularProgressIndicator(color: ModernTheme.primary))
          : _tasks.isEmpty 
              ? _buildEmptyState()
              : _buildTaskList(),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: FadeInUp(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: ModernTheme.primary.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.assignment_outlined,
                size: 64,
                color: ModernTheme.primary,
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              'No Tasks Yet',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: ModernTheme.darkGray,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Check back later for your assigned tasks',
              style: TextStyle(
                fontSize: 14,
                color: ModernTheme.mediumGray,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTaskList() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: List.generate(_tasks.length, (index) {
          final task = _tasks[index];
          return FadeInUp(
            delay: Duration(milliseconds: 100 * index),
            duration: const Duration(milliseconds: 500),
            child: GestureDetector(
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => student.TaskDetailScreen(task: task)),
              ),
              child: Container(
                margin: const EdgeInsets.only(bottom: 16),
                padding: const EdgeInsets.all(16),
                decoration: ModernTheme.cardDecoration,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            task['title'] ?? 'Untitled Task',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: ModernTheme.darkGray,
                            ),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: ModernTheme.primary.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Text(
                            'Due',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              color: ModernTheme.primary,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      task['description'] ?? 'No description',
                      style: const TextStyle(
                        fontSize: 13,
                        color: ModernTheme.mediumGray,
                        height: 1.4,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Icon(
                          Icons.calendar_today_rounded,
                          size: 16,
                          color: ModernTheme.mediumGray,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          'Due: ${task['due_date'] ?? 'N/A'}',
                          style: const TextStyle(
                            fontSize: 12,
                            color: ModernTheme.mediumGray,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}
