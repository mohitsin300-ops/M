import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../services/firebase_service.dart';
import 'login_screen.dart';
import 'dashboard_screen.dart';
import 'admin/admin_dashboard.dart';

class AuthGate extends StatefulWidget {
  const AuthGate({super.key});

  @override
  State<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends State<AuthGate> {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator(color: Color(0xFF673AB7))),
          );
        }

        final user = snapshot.data;

        // User is not logged in
        if (user == null) {
          return const LoginScreen();
        }

        return FutureBuilder<bool>(
          future: FirebaseService.isAdminUser(user),
          builder: (context, roleSnapshot) {
            if (roleSnapshot.connectionState == ConnectionState.waiting) {
              return const Scaffold(
                body: Center(
                  child: CircularProgressIndicator(color: Color(0xFF673AB7)),
                ),
              );
            }

            final isAdmin = roleSnapshot.data ?? false;
            return isAdmin
                ? const AdminDashboardScreen()
                : const DashboardScreen();
          },
        );
      },
    );
  }
}
