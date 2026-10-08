import 'dart:async';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:animate_do/animate_do.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/modern_theme.dart';
import 'student/project_submission_screen.dart' as student;
import 'student/certificate_screen.dart' as student;
import 'student/internship_apply_screen.dart' as student;

class HomeTab extends StatefulWidget {
  final VoidCallback? onNavigateToTasks;

  const HomeTab({super.key, this.onNavigateToTasks});

  @override
  State<HomeTab> createState() => _HomeTabState();
}

class _HomeTabState extends State<HomeTab> {
  String _userName = 'Student';
  String _internshipStatus = 'Pending';
  bool _isLoading = false;
  bool _hasApplied = false;

  String _appDomain = '';
  String _appDuration = '';
  String _appDate = '';
  String _appCompletionDate = '';

  List<dynamic> _banners = [];
  List<dynamic> _announcements = [];

  late PageController _pageController;
  final ValueNotifier<int> _currentPageNotifier = ValueNotifier<int>(0);
  Timer? _bannerTimer;

  String _normalizeStatus(String? status) {
    final value = (status ?? 'Pending').trim();
    if (value.toLowerCase() == 'complete') return 'Completed';
    if (value.toLowerCase() == 'aprovl') return 'Approval';
    if (value.toLowerCase() == 'progreces') return 'Progress';
    return value.isEmpty ? 'Pending' : value;
  }

  int _compareCreatedAt(dynamic a, dynamic b) {
    DateTime parse(dynamic value) {
      if (value is Timestamp) return value.toDate();
      if (value is DateTime) return value;
      return DateTime.tryParse(value?.toString() ?? '') ??
          DateTime.fromMillisecondsSinceEpoch(0);
    }

    return parse(a).compareTo(parse(b));
  }

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _fetchData(showLoader: false);
  }

  @override
  void dispose() {
    _bannerTimer?.cancel();
    _pageController.dispose();
    _currentPageNotifier.dispose();
    super.dispose();
  }

  Future<void> _fetchData({bool showLoader = false}) async {
    if (showLoader && mounted) {
      setState(() {
        _isLoading = true;
      });
    }

    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        final announcementsSnapshot = await FirebaseFirestore.instance
            .collection('announcements')
            .orderBy('created_at', descending: true)
            .limit(3)
            .get();
        final announcementsData = announcementsSnapshot.docs.map((doc) {
          final item = doc.data();
          item['id'] = doc.id;
          return item;
        }).toList();

        List<dynamic> bannersData = [];
        try {
          final bannersSnapshot = await FirebaseFirestore.instance
              .collection('banners')
              .where('is_active', isEqualTo: true)
              .orderBy('created_at', descending: true)
              .get();
          bannersData = bannersSnapshot.docs.map((doc) {
            final item = doc.data();
            item['id'] = doc.id;
            return item;
          }).toList();
        } catch (_) {}

        bool userApplied = false;
        String realStatus = 'Pending';
        String domain = '';
        String duration = '';
        String date = '';
        String calcCompletion = '';

        try {
          final appSnapshots = await Future.wait([
            FirebaseFirestore.instance
                .collection('applications')
                .where('user_id', isEqualTo: user.uid)
                .get(),
            if (user.email != null)
              FirebaseFirestore.instance
                  .collection('applications')
                  .where('email', isEqualTo: user.email)
                  .get(),
          ]);

          final mergedApplications = <String, Map<String, dynamic>>{};
          for (final snapshot in appSnapshots) {
            for (final doc in snapshot.docs) {
              final item = doc.data();
              item['id'] = doc.id;
              mergedApplications[doc.id] = item;
            }
          }

          final applicationList = mergedApplications.values.toList()
            ..sort(
              (a, b) => _compareCreatedAt(b['created_at'], a['created_at']),
            );

          final appData = applicationList.isNotEmpty
              ? applicationList.first
              : null;

          if (appData != null) {
            userApplied = true;
            realStatus = _normalizeStatus(appData['status']?.toString());
            domain = appData['skills']?.toString() ?? '';
            duration = appData['duration']?.toString() ?? '';

            if (appData['created_at'] != null) {
              final dt = _toDate(appData['created_at']);
              date = "${dt.day}/${dt.month}/${dt.year}";

              final normalizedStatus = realStatus.toLowerCase();
              if (normalizedStatus == 'active' ||
                  normalizedStatus == 'approved' ||
                  normalizedStatus == 'approval' ||
                  normalizedStatus == 'completed') {
                int monthsToAdd = 0;
                final durLower = duration.toLowerCase();
                if (durLower.contains('1 month')) {
                  monthsToAdd = 1;
                } else if (durLower.contains('2 month')) {
                  monthsToAdd = 2;
                } else if (durLower.contains('3 month')) {
                  monthsToAdd = 3;
                } else if (durLower.contains('6 month')) {
                  monthsToAdd = 6;
                }

                if (monthsToAdd > 0) {
                  final endDt = DateTime(
                    dt.year,
                    dt.month + monthsToAdd,
                    dt.day,
                  );
                  calcCompletion = "${endDt.day}/${endDt.month}/${endDt.year}";
                }
              }
            }
          }
        } catch (_) {}

        final userDoc = await FirebaseFirestore.instance
            .collection('users')
            .doc(user.uid)
            .get();
        final userData = userDoc.data() ?? <String, dynamic>{};

        if (mounted) {
          setState(() {
            _userName = (userData['full_name'] ?? user.displayName ?? 'Student')
                .toString();
            _hasApplied = userApplied;
            _internshipStatus = realStatus;
            _appDomain = domain;
            _appDuration = duration;
            _appDate = date;
            if (calcCompletion.isNotEmpty) _appCompletionDate = calcCompletion;
            _announcements = announcementsData;
            _banners = bannersData;
            _isLoading = false;

            if (_banners.isNotEmpty) {
              _bannerTimer?.cancel();
              _bannerTimer = Timer.periodic(const Duration(seconds: 4), (
                Timer timer,
              ) {
                if (_pageController.hasClients) {
                  final nextPage =
                      (_currentPageNotifier.value + 1) % _banners.length;
                  _pageController.animateToPage(
                    nextPage,
                    duration: const Duration(milliseconds: 300),
                    curve: Curves.easeIn,
                  );
                }
              });
            }
          });
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  DateTime _toDate(dynamic value) {
    if (value is Timestamp) return value.toDate();
    if (value is DateTime) return value;
    return DateTime.tryParse(value?.toString() ?? '') ?? DateTime.now();
  }

  Color _getStatusColor() {
    switch (_internshipStatus.toLowerCase()) {
      case 'active':
      case 'approved':
      case 'approval':
      case 'progress':
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

  String _readBannerImage(dynamic banner) {
    final image =
        banner['image_url'] ?? banner['image'] ?? banner['banner_url'] ?? '';
    return image.toString().trim().replaceAll("'", '');
  }

  String _readBannerLink(dynamic banner) {
    final link = banner['link_url'] ?? banner['url'] ?? '';
    return link.toString().trim().replaceAll("'", '');
  }

  Future<void> _openBannerLink(dynamic banner) async {
    final raw = _readBannerLink(banner);
    if (raw.isEmpty) return;

    final normalized = raw.startsWith('http://') || raw.startsWith('https://')
        ? raw
        : 'https://$raw';

    final uri = Uri.tryParse(normalized);
    if (uri == null) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Invalid banner URL')));
      return;
    }

    final opened = await launchUrl(uri, mode: LaunchMode.externalApplication);
    if (!opened && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Unable to open banner URL')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAFAFA),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () => _fetchData(showLoader: false),
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                if (_isLoading) const LinearProgressIndicator(minHeight: 2),

                // Header
                FadeInDown(
                  duration: const Duration(milliseconds: 600),
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24,
                      vertical: 24,
                    ),
                    decoration: BoxDecoration(
                      gradient: ModernTheme.primaryGradient,
                      borderRadius: const BorderRadius.only(
                        bottomLeft: Radius.circular(28),
                        bottomRight: Radius.circular(28),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Welcome',
                          style: TextStyle(
                            color: Colors.white70,
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            letterSpacing: 0.5,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          _userName,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            letterSpacing: -0.5,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // New user: show large apply card above status
                if (!_hasApplied)
                  _buildLargeApplyCard(
                    title: 'Apply for Internship',
                    description:
                        'New user ho? Yahi se start karo. Domain choose karo aur application submit karo.',
                    buttonText: 'Apply Now',
                    delayMs: 190,
                  ),

                // Status Card
                FadeInUp(
                  delay: const Duration(milliseconds: 200),
                  duration: const Duration(milliseconds: 600),
                  child: Container(
                    margin: const EdgeInsets.all(24),
                    padding: const EdgeInsets.all(20),
                    decoration: ModernTheme.cardDecoration,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'Internship Status',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: ModernTheme.darkGray,
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                color:
                                    (_hasApplied
                                            ? _getStatusColor()
                                            : ModernTheme.primary)
                                        .withOpacity(0.1),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                _hasApplied
                                    ? _normalizeStatus(_internshipStatus)
                                    : 'Apply',
                                style: TextStyle(
                                  color: _hasApplied
                                      ? _getStatusColor()
                                      : ModernTheme.primary,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        if (!_hasApplied) ...[
                          const Text(
                            'You haven\'t applied for an internship yet. Start your journey today!',
                            style: TextStyle(
                              color: ModernTheme.mediumGray,
                              fontSize: 13,
                              height: 1.5,
                            ),
                          ),
                          const SizedBox(height: 12),
                          ElevatedButton(
                            onPressed: () async {
                              final result = await Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) =>
                                      const student.InternshipApplyScreen(),
                                ),
                              );
                              if (result == true && mounted) {
                                _fetchData();
                              }
                            },
                            style: ModernTheme.primaryButtonStyle,
                            child: const Text('Apply Now'),
                          ),
                        ] else ...[
                          Row(
                            children: [
                              Expanded(
                                child: _buildStatusItem('Domain', _appDomain),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: _buildStatusItem(
                                  'Duration',
                                  _appDuration,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Row(
                            children: [
                              Expanded(
                                child: _buildStatusItem('Start Date', _appDate),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: _buildStatusItem(
                                  'End Date',
                                  _appCompletionDate.isEmpty
                                      ? 'TBD'
                                      : _appCompletionDate,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ],
                    ),
                  ),
                ),

                // Banners
                if (_banners.isNotEmpty)
                  FadeInUp(
                    delay: const Duration(milliseconds: 300),
                    duration: const Duration(milliseconds: 600),
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 24),
                      height: 180,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: ModernTheme.cardShadow,
                      ),
                      child: Stack(
                        children: [
                          PageView.builder(
                            controller: _pageController,
                            onPageChanged: (index) {
                              _currentPageNotifier.value = index;
                            },
                            itemCount: _banners.length,
                            itemBuilder: (context, index) {
                              final banner = _banners[index];
                              final imageUrl = _readBannerImage(banner);
                              final title = (banner['title'] ?? '')
                                  .toString()
                                  .trim();
                              final description = (banner['description'] ?? '')
                                  .toString()
                                  .trim();
                              return GestureDetector(
                                onTap: () => _openBannerLink(banner),
                                child: Container(
                                  margin: const EdgeInsets.all(4),
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(16),
                                    gradient: ModernTheme.blueGradient,
                                  ),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(16),
                                    child: Stack(
                                      fit: StackFit.expand,
                                      children: [
                                        if (imageUrl.isNotEmpty)
                                          Image.network(
                                            imageUrl,
                                            fit: BoxFit.cover,
                                            errorBuilder: (_, __, ___) {
                                              return const SizedBox.shrink();
                                            },
                                          ),
                                        Container(
                                          decoration: BoxDecoration(
                                            gradient: LinearGradient(
                                              begin: Alignment.bottomCenter,
                                              end: Alignment.topCenter,
                                              colors: [
                                                Colors.black.withValues(
                                                  alpha: 0.55,
                                                ),
                                                Colors.transparent,
                                              ],
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.all(14),
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            mainAxisAlignment:
                                                MainAxisAlignment.end,
                                            children: [
                                              if (title.isNotEmpty &&
                                                  title.toLowerCase() !=
                                                      'banner')
                                                Text(
                                                  title,
                                                  maxLines: 1,
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                  style: const TextStyle(
                                                    color: Colors.white,
                                                    fontSize: 16,
                                                    fontWeight: FontWeight.w700,
                                                  ),
                                                ),
                                              if (title.isNotEmpty &&
                                                  title.toLowerCase() !=
                                                      'banner' &&
                                                  description.isNotEmpty)
                                                const SizedBox(height: 2),
                                              if (description.isNotEmpty)
                                                Text(
                                                  description,
                                                  maxLines: 2,
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                  style: const TextStyle(
                                                    color: Colors.white,
                                                    fontSize: 12,
                                                  ),
                                                ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                          Positioned(
                            bottom: 12,
                            left: 0,
                            right: 0,
                            child: ValueListenableBuilder<int>(
                              valueListenable: _currentPageNotifier,
                              builder: (context, currentPage, _) => Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: List.generate(
                                  _banners.length,
                                  (index) => Container(
                                    width: 8,
                                    height: 8,
                                    margin: const EdgeInsets.symmetric(
                                      horizontal: 4,
                                    ),
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: index == currentPage
                                          ? Colors.white
                                          : Colors.white.withOpacity(0.4),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                const SizedBox(height: 24),

                // Quick Actions
                FadeInUp(
                  delay: const Duration(milliseconds: 400),
                  duration: const Duration(milliseconds: 600),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Quick Actions',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: ModernTheme.darkGray,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Expanded(
                              child: _buildActionCard(
                                Icons.assignment_turned_in_rounded,
                                'My Tasks',
                                () {
                                  widget.onNavigateToTasks?.call();
                                },
                                ModernTheme.primary,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: _buildActionCard(
                                Icons.file_present_rounded,
                                'Submit Project',
                                () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (_) =>
                                          const student.ProjectSubmissionScreen(),
                                    ),
                                  );
                                },
                                ModernTheme.secondary,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Expanded(
                              child: _buildActionCard(
                                Icons.card_giftcard_rounded,
                                'Certificate',
                                () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (_) =>
                                          const student.CertificateScreen(),
                                    ),
                                  );
                                },
                                ModernTheme.success,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),

                // Existing user: show same-size card below assignments/quick actions
                if (_hasApplied)
                  _buildLargeApplyCard(
                    title: 'Apply Again for New Domain',
                    description:
                        'Assignments ke baad yahi same bada box rahega. Agar nayi domain chahiye to yahin se dubara apply karo.',
                    buttonText: 'Apply Again',
                    delayMs: 430,
                  ),

                const SizedBox(height: 24),

                // Announcements
                FadeInUp(
                  delay: const Duration(milliseconds: 500),
                  duration: const Duration(milliseconds: 600),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Latest Updates',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: ModernTheme.darkGray,
                          ),
                        ),
                        const SizedBox(height: 12),
                        if (_announcements.isEmpty)
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.all(16),
                            decoration: ModernTheme.cardDecoration,
                            child: const Text(
                              'No announcements available yet.',
                              style: TextStyle(
                                fontSize: 13,
                                color: ModernTheme.mediumGray,
                              ),
                            ),
                          )
                        else
                          ..._announcements.asMap().entries.map((entry) {
                            final index = entry.key;
                            final announcement = entry.value;
                            final msg =
                                (announcement['message'] ??
                                        announcement['content'] ??
                                        announcement['description'] ??
                                        '')
                                    .toString();
                            return FadeInUp(
                              delay: Duration(
                                milliseconds: 600 + (index * 100),
                              ),
                              duration: const Duration(milliseconds: 600),
                              child: Container(
                                margin: const EdgeInsets.only(bottom: 12),
                                padding: const EdgeInsets.all(16),
                                decoration: ModernTheme.cardDecoration,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      (announcement['title'] ?? 'Announcement')
                                          .toString(),
                                      style: const TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.bold,
                                        color: ModernTheme.darkGray,
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      msg,
                                      style: const TextStyle(
                                        fontSize: 13,
                                        color: ModernTheme.mediumGray,
                                        height: 1.4,
                                      ),
                                      maxLines: 3,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                            );
                          }),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildStatusItem(String label, String value) {
    return Column(
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
          value.isEmpty ? 'Not set' : value,
          style: const TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.bold,
            color: ModernTheme.darkGray,
          ),
        ),
      ],
    );
  }

  Widget _buildActionCard(
    IconData icon,
    String label,
    VoidCallback onTap,
    Color color,
  ) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: ModernTheme.cardDecoration,
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: color, size: 28),
            ),
            const SizedBox(height: 12),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: ModernTheme.darkGray,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLargeApplyCard({
    required String title,
    required String description,
    required String buttonText,
    required int delayMs,
  }) {
    return FadeInUp(
      delay: Duration(milliseconds: delayMs),
      duration: const Duration(milliseconds: 600),
      child: Container(
        margin: const EdgeInsets.fromLTRB(24, 0, 24, 20),
        padding: const EdgeInsets.all(26),
        decoration: BoxDecoration(
          gradient: ModernTheme.primaryGradient,
          borderRadius: BorderRadius.circular(26),
          boxShadow: ModernTheme.heavyShadow,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 24,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              description,
              style: TextStyle(
                color: Colors.white.withOpacity(0.92),
                fontSize: 14,
                height: 1.45,
              ),
            ),
            const SizedBox(height: 18),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () async {
                  final result = await Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => const student.InternshipApplyScreen(),
                    ),
                  );
                  if (result == true && mounted) {
                    _fetchData();
                  }
                },
                icon: const Icon(Icons.rocket_launch_rounded),
                label: Text(
                  buttonText,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: ModernTheme.primary,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
