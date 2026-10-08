import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../theme/modern_theme.dart';
import 'home_tab.dart';
import 'tasks_tab.dart';
import 'profile_tab.dart';
import 'login_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _currentIndex = 0;
  late final List<Widget> _tabs;

  @override
  void initState() {
    super.initState();

    _tabs = [
      HomeTab(
        onNavigateToTasks: () {
          setState(() {
            _currentIndex = 1;
          });
        },
      ),
      const TasksTab(),
      const ProfileTab(),
    ];

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
      body: IndexedStack(index: _currentIndex, children: _tabs),
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
            setState(() {
              _currentIndex = index;
            });
          },
          destinations: [
            NavigationDestination(
              icon: const Icon(Icons.home_outlined),
              selectedIcon: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: ModernTheme.primary.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.home_rounded,
                  color: ModernTheme.primary,
                ),
              ),
              label: 'Home',
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
              icon: const Icon(Icons.person_outline),
              selectedIcon: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: ModernTheme.primary.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.person_rounded,
                  color: ModernTheme.primary,
                ),
              ),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }
}
