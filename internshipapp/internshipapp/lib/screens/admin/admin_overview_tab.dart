import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../../theme/modern_theme.dart';

class AdminOverviewTab extends StatefulWidget {
  const AdminOverviewTab({super.key});

  @override
  State<AdminOverviewTab> createState() => _AdminOverviewTabState();
}

class _AdminOverviewTabState extends State<AdminOverviewTab> {
  bool _isLoading = true;
  int _totalApplications = 0;
  int _activeTasks = 0;
  int _pendingReviews = 0;
  int _issuesProjects = 0;

  List<dynamic> _recentActivity = [];

  @override
  void initState() {
    super.initState();
    _fetchStats();
  }

  Future<void> _fetchStats() async {
    try {
      final client = FirebaseFirestore.instance;

      final appCount = await client.collection('applications').get();
      final totalApps = appCount.docs.length;

      final taskCount = await client.collection('tasks').get();
      final tasks = taskCount.docs.length;

      final pendingCount = await client
        .collection('student_tasks')
        .where('status', isEqualTo: 'submitted')
        .get();
      final pending = pendingCount.docs.length;

      final projCount = await client.collection('final_projects').get();
      final proj = projCount.docs.length;

      final recentAppsSnapshot = await client
        .collection('applications')
        .orderBy('created_at', descending: true)
        .limit(3)
        .get();
      final recentApps = recentAppsSnapshot.docs.map((doc) {
      final item = doc.data();
      item['id'] = doc.id;
      return item;
      }).toList();

      if (mounted) {
        setState(() {
          _totalApplications = totalApps;
          _activeTasks = tasks;
          _pendingReviews = pending;
          _issuesProjects = proj;
          _recentActivity = recentApps;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Center(
        child: CircularProgressIndicator(color: ModernTheme.primary),
      );
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          FadeInDown(
            duration: const Duration(milliseconds: 600),
            child: const Text(
              'Dashboard Overview',
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
                color: ModernTheme.darkGray,
                letterSpacing: -0.5,
              ),
            ),
          ),

          const SizedBox(height: 8),

          FadeInDown(
            delay: const Duration(milliseconds: 100),
            duration: const Duration(milliseconds: 600),
            child: const Text(
              'Monitor your internship management in real-time',
              style: TextStyle(
                fontSize: 14,
                color: ModernTheme.mediumGray,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),

          const SizedBox(height: 28),

          // Stats Grid
          Row(
            children: [
              Expanded(
                child: FadeInUp(
                  delay: const Duration(milliseconds: 200),
                  duration: const Duration(milliseconds: 600),
                  child: _buildStatCard(
                    'Total Applications',
                    _totalApplications.toString(),
                    Icons.people_rounded,
                    Color(0xFF3B82F6),
                    Color(0xFF3B82F6).withOpacity(0.1),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: FadeInUp(
                  delay: const Duration(milliseconds: 300),
                  duration: const Duration(milliseconds: 600),
                  child: _buildStatCard(
                    'Active Tasks',
                    _activeTasks.toString(),
                    Icons.assignment_rounded,
                    Color(0xFF10B981),
                    Color(0xFF10B981).withOpacity(0.1),
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 16),

          Row(
            children: [
              Expanded(
                child: FadeInUp(
                  delay: const Duration(milliseconds: 400),
                  duration: const Duration(milliseconds: 600),
                  child: _buildStatCard(
                    'Pending Review',
                    _pendingReviews.toString(),
                    Icons.pending_actions_rounded,
                    Color(0xFFF59E0B),
                    Color(0xFFF59E0B).withOpacity(0.1),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: FadeInUp(
                  delay: const Duration(milliseconds: 500),
                  duration: const Duration(milliseconds: 600),
                  child: _buildStatCard(
                    'Projects',
                    _issuesProjects.toString(),
                    Icons.file_present_rounded,
                    Color(0xFF8B5CF6),
                    Color(0xFF8B5CF6).withOpacity(0.1),
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 32),

          // Recent Activity
          FadeInUp(
            delay: const Duration(milliseconds: 600),
            duration: const Duration(milliseconds: 600),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Recent Applications',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: ModernTheme.darkGray,
                  ),
                ),
                const SizedBox(height: 12),
                if (_recentActivity.isEmpty)
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 20),
                    child: Center(
                      child: Text(
                        'No recent activities',
                        style: TextStyle(
                          color: ModernTheme.mediumGray,
                          fontSize: 14,
                        ),
                      ),
                    ),
                  )
                else
                  ..._recentActivity.asMap().entries.map((entry) {
                    final index = entry.key;
                    final activity = entry.value;
                    return FadeInUp(
                      delay: Duration(milliseconds: 700 + (index * 100)),
                      duration: const Duration(milliseconds: 600),
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(16),
                        decoration: ModernTheme.cardDecoration,
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: ModernTheme.primary.withOpacity(0.1),
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: const Icon(
                                Icons.person_add_rounded,
                                color: ModernTheme.primary,
                                size: 20,
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    activity['name'] ?? 'Unknown',
                                    style: const TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      color: ModernTheme.darkGray,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    'Applied for internship',
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: ModernTheme.mediumGray,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Text(
                              _formatDate(_dateValue(activity['created_at'])),
                              style: const TextStyle(
                                fontSize: 12,
                                color: ModernTheme.mediumGray,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  }).toList(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _dateValue(dynamic value) {
    if (value is Timestamp) return value.toDate().toIso8601String();
    return value?.toString() ?? '';
  }

  Widget _buildStatCard(
    String title,
    String value,
    IconData icon,
    Color color,
    Color bgColor,
  ) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: ModernTheme.cardDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color, size: 24),
          ),
          const SizedBox(height: 16),
          Text(
            value,
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: ModernTheme.darkGray,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            title,
            style: const TextStyle(
              fontSize: 13,
              color: ModernTheme.mediumGray,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  String _formatDate(String? dateStr) {
    if (dateStr == null) return 'N/A';
    try {
      final dt = DateTime.parse(dateStr);
      final now = DateTime.now();
      final diff = now.difference(dt);

      if (diff.inDays == 0) return 'Today';
      if (diff.inDays == 1) return 'Yesterday';
      if (diff.inDays < 7) return '${diff.inDays}d ago';
      if (diff.inDays < 30) return '${(diff.inDays / 7).floor()}w ago';
      return '${(diff.inDays / 30).floor()}m ago';
    } catch (e) {
      return 'N/A';
    }
  }
}
