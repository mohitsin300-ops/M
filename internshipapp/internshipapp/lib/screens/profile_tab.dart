import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:animate_do/animate_do.dart';
import '../theme/modern_theme.dart';
import 'student/certificate_screen.dart' as student;

class ProfileTab extends StatefulWidget {
  const ProfileTab({super.key});

  @override
  State<ProfileTab> createState() => _ProfileTabState();
}

class _ProfileTabState extends State<ProfileTab> {
  static const String _supportEmail = 'mjtechglobal@zohomail.in';
  static const String _supportWhatsapp = '9628416516';

  String _userName = 'Loading...';
  String _userEmail = 'Loading...';
  String _whatsapp = 'Loading...';
  bool _isLoading = true;
  bool _isUpdatingName = false;

  @override
  void initState() {
    super.initState();
    _fetchProfile();
  }

  Future<void> _fetchProfile() async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        final userDoc = await FirebaseFirestore.instance
            .collection('users')
            .doc(user.uid)
            .get();
        final userData = userDoc.data() ?? <String, dynamic>{};
        setState(() {
          _userName =
              (userData['full_name'] ?? user.displayName ?? 'Not provided')
                  .toString();
          _userEmail = user.email ?? 'Not provided';
          _whatsapp =
              (userData['whatsapp_number'] ?? 'Not provided').toString();
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _logout() async {
    showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Sign Out'),
        content: const Text('Are you sure you want to sign out?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext),
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

  Future<void> _changeName() async {
    final controller = TextEditingController(text: _userName);

    await showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Change Name'),
        content: TextField(
          controller: controller,
          textCapitalization: TextCapitalization.words,
          decoration: const InputDecoration(
            labelText: 'Full Name',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: _isUpdatingName
                ? null
                : () async {
                    final navigator = Navigator.of(dialogContext);
                    final messenger = ScaffoldMessenger.of(context);
                    final newName = controller.text.trim();
                    if (newName.isEmpty) return;

                    setState(() => _isUpdatingName = true);
                    try {
                      final user = FirebaseAuth.instance.currentUser;
                      await user?.updateDisplayName(newName);
                      if (user != null) {
                        await FirebaseFirestore.instance
                            .collection('users')
                            .doc(user.uid)
                            .set({
                              'full_name': newName,
                              'updated_at': FieldValue.serverTimestamp(),
                            }, SetOptions(merge: true));
                      }
                      if (!mounted) return;
                      setState(() {
                        _userName = newName;
                        _isUpdatingName = false;
                      });
                      navigator.pop();
                      messenger.showSnackBar(
                        const SnackBar(
                          content: Text('Name updated successfully'),
                        ),
                      );
                    } catch (_) {
                      if (!mounted) return;
                      setState(() => _isUpdatingName = false);
                      messenger.showSnackBar(
                        const SnackBar(content: Text('Failed to update name')),
                      );
                    }
                  },
            child: _isUpdatingName
                ? const SizedBox(
                    width: 16,
                    height: 16,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showPolicySheet(String title, String content) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => Padding(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: ModernTheme.darkGray,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              content,
              style: const TextStyle(
                fontSize: 13,
                height: 1.5,
                color: ModernTheme.mediumGray,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        backgroundColor: const Color(0xFFFAFAFA),
        body: Center(
          child: CircularProgressIndicator(color: ModernTheme.primary),
        ),
      );
    }

    return Scaffold(
      backgroundColor: const Color(0xFFFAFAFA),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 0,
        title: const Text(
          'My Profile',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: ModernTheme.darkGray,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Profile Header
            FadeInDown(
              duration: const Duration(milliseconds: 600),
              child: Center(
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: ModernTheme.primaryGradient,
                        boxShadow: ModernTheme.cardShadow,
                      ),
                      child: Container(
                        width: 110,
                        height: 110,
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.white,
                        ),
                        child: const Icon(
                          Icons.person_rounded,
                          size: 60,
                          color: ModernTheme.primary,
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      _userName,
                      style: const TextStyle(
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                        color: ModernTheme.darkGray,
                      ),
                    ),
                    const SizedBox(height: 10),
                    OutlinedButton.icon(
                      onPressed: _changeName,
                      icon: const Icon(Icons.edit_rounded, size: 18),
                      label: const Text('Change Name'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: ModernTheme.primary,
                        side: const BorderSide(color: ModernTheme.primary),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 32),

            // Profile Info Cards
            FadeInUp(
              delay: const Duration(milliseconds: 200),
              duration: const Duration(milliseconds: 600),
              child: _buildProfileCard(
                'Email Address',
                _userEmail,
                Icons.mail_outline_rounded,
              ),
            ),

            const SizedBox(height: 12),

            FadeInUp(
              delay: const Duration(milliseconds: 300),
              duration: const Duration(milliseconds: 600),
              child: _buildProfileCard(
                'WhatsApp Number',
                _whatsapp,
                Icons.phone_outlined,
              ),
            ),

            const SizedBox(height: 12),

            FadeInUp(
              delay: const Duration(milliseconds: 350),
              duration: const Duration(milliseconds: 600),
              child: _buildProfileCard(
                'Support Email',
                _supportEmail,
                Icons.support_agent_rounded,
              ),
            ),

            const SizedBox(height: 12),

            FadeInUp(
              delay: const Duration(milliseconds: 380),
              duration: const Duration(milliseconds: 600),
              child: _buildProfileCard(
                'Support WhatsApp',
                _supportWhatsapp,
                Icons.chat_rounded,
              ),
            ),

            const SizedBox(height: 32),

            // Quick Actions
            FadeInUp(
              delay: const Duration(milliseconds: 400),
              duration: const Duration(milliseconds: 600),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Actions',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: ModernTheme.darkGray,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: ModernTheme.cardDecoration,
                    child: Row(
                      children: [
                        Icon(
                          Icons.card_giftcard_rounded,
                          color: ModernTheme.success,
                          size: 24,
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'My Certificates',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                  color: ModernTheme.darkGray,
                                ),
                              ),
                              const Text(
                                'View your earned certificates',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: ModernTheme.mediumGray,
                                ),
                              ),
                            ],
                          ),
                        ),
                        IconButton(
                          onPressed: () => Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => const student.CertificateScreen(),
                            ),
                          ),
                          icon: const Icon(
                            Icons.arrow_forward_rounded,
                            color: ModernTheme.primary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            FadeInUp(
              delay: const Duration(milliseconds: 460),
              duration: const Duration(milliseconds: 600),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Legal',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: ModernTheme.darkGray,
                    ),
                  ),
                  const SizedBox(height: 12),
                  _buildActionRow(
                    icon: Icons.privacy_tip_outlined,
                    title: 'Privacy Policy',
                    subtitle: 'How we collect and use your data',
                    onTap: () => _showPolicySheet(
                      'Privacy Policy',
                      'MJ Tech Global app aapki profile information jaise name, email aur WhatsApp number ko internship process ke liye use karta hai. Hum aapke data ko unauthorized access se protect karne ki koshish karte hain.',
                    ),
                  ),
                  const SizedBox(height: 10),
                  _buildActionRow(
                    icon: Icons.rule_outlined,
                    title: 'Terms & Conditions',
                    subtitle: 'Guidelines for using this app',
                    onTap: () => _showPolicySheet(
                      'Terms & Conditions',
                      'Is app ka use internship related activities ke liye hai. User ko sahi details deni hongi. Misuse, fake information, ya policy violation par account access restrict kiya ja sakta hai.',
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Sign Out Button
            FadeInUp(
              delay: const Duration(milliseconds: 500),
              duration: const Duration(milliseconds: 600),
              child: ElevatedButton(
                onPressed: _logout,
                style: ElevatedButton.styleFrom(
                  backgroundColor: ModernTheme.danger.withValues(alpha: 0.1),
                  foregroundColor: ModernTheme.danger,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                  elevation: 0,
                  side: const BorderSide(color: ModernTheme.danger, width: 1.5),
                ),
                child: const Text(
                  'Sign Out',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
            ),

            const SizedBox(height: 16),

            const Center(
              child: Text(
                'MSME URN: UDYAM-UP-13-0023373',
                style: TextStyle(
                  fontSize: 11,
                  color: ModernTheme.mediumGray,
                  fontWeight: FontWeight.w500,
                  letterSpacing: 0.2,
                ),
                textAlign: TextAlign.center,
              ),
            ),

            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileCard(String label, String value, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: ModernTheme.cardDecoration,
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: ModernTheme.primary.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: ModernTheme.primary, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: const TextStyle(
                    fontSize: 12,
                    color: ModernTheme.mediumGray,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  value,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: ModernTheme.darkGray,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionRow({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: ModernTheme.cardDecoration,
        child: Row(
          children: [
            Icon(icon, color: ModernTheme.primary),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: ModernTheme.darkGray,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 12,
                      color: ModernTheme.mediumGray,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios_rounded, size: 16),
          ],
        ),
      ),
    );
  }
}
