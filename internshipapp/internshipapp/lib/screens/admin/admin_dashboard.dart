import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../theme/modern_theme.dart';
import '../login_screen.dart';
import 'admin_overview_tab.dart';
import 'admin_users_tab.dart';
import 'admin_tasks_tab.dart';
import 'admin_announcements_tab.dart';
import 'admin_banners_tab.dart';

class AdminDashboardScreen extends StatefulWidget {
  const AdminDashboardScreen({super.key});

  @override
  State<AdminDashboardScreen> createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends State<AdminDashboardScreen> {
  int _currentIndex = 0;

  final List<Widget> _tabs = [
    const AdminOverviewTab(),
    const AdminUsersTab(),
    const AdminTasksTab(),
    const AdminAnnouncementsTab(),
    const AdminBannersTab(),
  ];

  @override
  void initState() {
    super.initState();
    FirebaseAuth.instance.authStateChanges().listen((user) {
      if (user == null) {
        if (mounted) {
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (_) => const LoginScreen()),
            (route) => false,
          );
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAFAFA),
      appBar: AppBar(
        backgroundColor: ModernTheme.primary,
        elevation: 0,
        scrolledUnderElevation: 0,
        title: const Text(
          'Admin Panel',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 24,
            letterSpacing: -0.5,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout_rounded, color: Colors.white),
            onPressed: () => _showLogoutDialog(),
          ),
        ],
      ),
      body: _tabs[_currentIndex],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 20,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: NavigationBar(
          selectedIndex: _currentIndex,
          backgroundColor: Colors.white,
          elevation: 0,
          indicatorColor: ModernTheme.primary.withOpacity(0.15),
          onDestinationSelected: (index) {
            setState(() => _currentIndex = index);
          },
          destinations: [
            NavigationDestination(
              icon: const Icon(Icons.dashboard_outlined),
              selectedIcon: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: ModernTheme.primary.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.dashboard_rounded,
                  color: ModernTheme.primary,
                ),
              ),
              label: 'Overview',
            ),
            NavigationDestination(
              icon: const Icon(Icons.people_outline),
              selectedIcon: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: ModernTheme.primary.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.people_rounded,
                  color: ModernTheme.primary,
                ),
              ),
              label: 'Users',
            ),
            NavigationDestination(
              icon: const Icon(Icons.assignment_outlined),
              selectedIcon: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: ModernTheme.primary.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.assignment_rounded,
                  color: ModernTheme.primary,
                ),
              ),
              label: 'Tasks',
            ),
            NavigationDestination(
              icon: const Icon(Icons.campaign_outlined),
              selectedIcon: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: ModernTheme.primary.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.campaign_rounded,
                  color: ModernTheme.primary,
                ),
              ),
              label: 'Updates',
            ),
            NavigationDestination(
              icon: const Icon(Icons.view_carousel_outlined),
              selectedIcon: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: ModernTheme.primary.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.view_carousel_rounded,
                  color: ModernTheme.primary,
                ),
              ),
              label: 'Banners',
            ),
          ],
        ),
      ),
    );
  }

  void _showLogoutDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Sign Out'),
        content: const Text('Are you sure you want to sign out?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              await FirebaseAuth.instance.signOut();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: ModernTheme.danger,
              foregroundColor: Colors.white,
            ),
            child: const Text('Sign Out'),
          ),
        ],
      ),
    );
  }
}
