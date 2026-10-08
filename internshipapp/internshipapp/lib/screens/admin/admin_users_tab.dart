import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../../theme/modern_theme.dart';

class AdminUsersTab extends StatefulWidget {
  const AdminUsersTab({super.key});

  @override
  State<AdminUsersTab> createState() => _AdminUsersTabState();
}

class _AdminUsersTabState extends State<AdminUsersTab> {
  bool _isLoading = true;
  List<dynamic> _users = [];
  List<dynamic> _filteredUsers = [];
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _fetchUsers();
    _searchController.addListener(_onSearchChanged);
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _onSearchChanged() {
    final query = _searchController.text.toLowerCase();
    setState(() {
      _filteredUsers = _users.where((user) {
        final name = (user['name'] ?? '').toString().toLowerCase();
        final email = (user['email'] ?? '').toString().toLowerCase();
        return name.contains(query) || email.contains(query);
      }).toList();
    });
  }

  String _normalizeStatus(String? status) {
    final value = (status ?? 'Pending').trim();
    if (value.toLowerCase() == 'complete') return 'Completed';
    if (value.toLowerCase() == 'aprovl') return 'Approval';
    if (value.toLowerCase() == 'progreces') return 'Progress';
    return value.isEmpty ? 'Pending' : value;
  }

  Future<void> _fetchUsers() async {
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('applications')
          .orderBy('created_at', descending: true)
          .get();
      final data = snapshot.docs.map((doc) {
        final item = doc.data();
        item['id'] = doc.id;
        return item;
      }).toList();

      if (mounted) {
        setState(() {
          _users = data;
          _filteredUsers = data;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _updateStatus(
    Map<String, dynamic> user,
    String newStatus,
  ) async {
    final id = (user['id'] ?? '').toString();
    if (id.isEmpty) return;

    try {
      final normalizedStatus = _normalizeStatus(newStatus);
      await FirebaseFirestore.instance.collection('applications').doc(id).set({
        'status': normalizedStatus,
      }, SetOptions(merge: true));

      await _syncCertificateRecord(user, normalizedStatus);

      _fetchUsers();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Status updated successfully!'),
            backgroundColor: ModernTheme.success,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error: $e'),
            backgroundColor: ModernTheme.danger,
          ),
        );
      }
    }
  }

  Future<void> _syncCertificateRecord(
    Map<String, dynamic> user,
    String status,
  ) async {
    final normalized = _normalizeStatus(status).toLowerCase();
    final eligible =
        normalized == 'progress' ||
        normalized == 'active' ||
        normalized == 'approved' ||
        normalized == 'approval' ||
        normalized == 'completed';
    if (!eligible) return;

    final applicationId = (user['id'] ?? '').toString();
    if (applicationId.isEmpty) return;

    final email = (user['email'] ?? '').toString();
    final userId = (user['user_id'] ?? '').toString();

    await FirebaseFirestore.instance
        .collection('certificates')
        .doc(applicationId)
        .set({
          'application_id': applicationId,
          'user_id': userId,
          'email': email,
          'student_name': user['name'],
          'domain': user['skills'],
          'status': normalized == 'complete' ? 'completed' : normalized,
          'certificate_id':
              'CERT-${applicationId.substring(0, applicationId.length > 8 ? 8 : applicationId.length).toUpperCase()}',
          'updated_at': FieldValue.serverTimestamp(),
          'created_at': FieldValue.serverTimestamp(),
        }, SetOptions(merge: true));
  }

  void _showStatusDialog(Map<String, dynamic> user) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Change Application Status'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: const Text(
                'Pending Review',
                style: TextStyle(color: ModernTheme.warning),
              ),
              onTap: () {
                Navigator.pop(context);
                _updateStatus(user, 'Pending');
              },
            ),
            ListTile(
              title: const Text(
                'In Progress',
                style: TextStyle(color: Color(0xFF0288D1)),
              ),
              onTap: () {
                Navigator.pop(context);
                _updateStatus(user, 'Progress');
              },
            ),
            ListTile(
              title: const Text(
                'Approval',
                style: TextStyle(color: Color(0xFF7E57C2)),
              ),
              onTap: () {
                Navigator.pop(context);
                _updateStatus(user, 'Approval');
              },
            ),
            ListTile(
              title: const Text(
                'Active',
                style: TextStyle(color: ModernTheme.success),
              ),
              onTap: () {
                Navigator.pop(context);
                _updateStatus(user, 'Active');
              },
            ),
            ListTile(
              title: const Text(
                'Completed',
                style: TextStyle(color: Color(0xFF2E7D32)),
              ),
              onTap: () {
                Navigator.pop(context);
                _updateStatus(user, 'Completed');
              },
            ),
            ListTile(
              title: const Text(
                'Rejected',
                style: TextStyle(color: ModernTheme.danger),
              ),
              onTap: () {
                Navigator.pop(context);
                _updateStatus(user, 'Rejected');
              },
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAFAFA),
      body: Column(
        children: [
          // Header
          Container(
            padding: const EdgeInsets.all(20),
            color: Colors.white,
            child: FadeInDown(
              duration: const Duration(milliseconds: 600),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Manage Users',
                    style: TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                      color: ModernTheme.darkGray,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Search Bar
                  TextField(
                    controller: _searchController,
                    decoration: InputDecoration(
                      hintText: 'Search by name or email...',
                      hintStyle: const TextStyle(
                        color: ModernTheme.mediumGray,
                        fontSize: 14,
                      ),
                      prefixIcon: const Icon(
                        Icons.search_rounded,
                        color: ModernTheme.primary,
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(
                          color: ModernTheme.lightGray,
                          width: 2,
                        ),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(
                          color: ModernTheme.lightGray,
                          width: 2,
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(
                          color: ModernTheme.primary,
                          width: 2.5,
                        ),
                      ),
                      filled: true,
                      fillColor: ModernTheme.veryLightGray,
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Users List
          Expanded(
            child: _isLoading
                ? Center(
                    child: CircularProgressIndicator(
                      color: ModernTheme.primary,
                    ),
                  )
                : _filteredUsers.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.people_outline_rounded,
                          size: 64,
                          color: ModernTheme.primary.withOpacity(0.3),
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          'No users found',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: ModernTheme.darkGray,
                          ),
                        ),
                      ],
                    ),
                  )
                : SingleChildScrollView(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: List.generate(_filteredUsers.length, (index) {
                        final user = _filteredUsers[index];
                        final status = _normalizeStatus(
                          user['status']?.toString(),
                        );
                        return FadeInUp(
                          delay: Duration(milliseconds: 100 * index),
                          duration: const Duration(milliseconds: 500),
                          child: GestureDetector(
                            onTap: () => _showStatusDialog(user),
                            child: Container(
                              margin: const EdgeInsets.only(bottom: 12),
                              padding: const EdgeInsets.all(16),
                              decoration: ModernTheme.cardDecoration,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              user['name'] ?? 'Unknown',
                                              style: const TextStyle(
                                                fontSize: 16,
                                                fontWeight: FontWeight.bold,
                                                color: ModernTheme.darkGray,
                                              ),
                                            ),
                                            const SizedBox(height: 4),
                                            Text(
                                              user['email'] ?? 'No email',
                                              style: const TextStyle(
                                                fontSize: 12,
                                                color: ModernTheme.mediumGray,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      Container(
                                        padding: const EdgeInsets.symmetric(
                                          horizontal: 12,
                                          vertical: 6,
                                        ),
                                        decoration: BoxDecoration(
                                          color: _getStatusColor(
                                            status,
                                          ).withOpacity(0.1),
                                          borderRadius: BorderRadius.circular(
                                            8,
                                          ),
                                          border: Border.all(
                                            color: _getStatusColor(
                                              status,
                                            ).withOpacity(0.3),
                                          ),
                                        ),
                                        child: Text(
                                          status,
                                          style: TextStyle(
                                            color: _getStatusColor(status),
                                            fontWeight: FontWeight.bold,
                                            fontSize: 11,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      if (user['phone'] != null)
                                        Row(
                                          children: [
                                            Icon(
                                              Icons.phone_outlined,
                                              size: 14,
                                              color: ModernTheme.mediumGray,
                                            ),
                                            const SizedBox(width: 4),
                                            Text(
                                              user['phone'] ?? '',
                                              style: const TextStyle(
                                                fontSize: 12,
                                                color: ModernTheme.mediumGray,
                                              ),
                                            ),
                                            const SizedBox(width: 16),
                                          ],
                                        ),
                                      if (user['skills'] != null)
                                        Flexible(
                                          child: Text(
                                            '${user['skills']}',
                                            style: const TextStyle(
                                              fontSize: 12,
                                              color: ModernTheme.primary,
                                              fontWeight: FontWeight.w600,
                                            ),
                                            overflow: TextOverflow.ellipsis,
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
                  ),
          ),
        ],
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'progress':
        return const Color(0xFF0288D1);
      case 'approval':
        return const Color(0xFF7E57C2);
      case 'active':
      case 'approved':
      case 'completed':
        return ModernTheme.success;
      case 'pending':
        return ModernTheme.warning;
      case 'rejected':
        return ModernTheme.danger;
      default:
        return ModernTheme.mediumGray;
    }
  }
}
