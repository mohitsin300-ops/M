# Home Tab Implementation Example

## Complete Example: Home Tab with Adaptive Skeleton Loaders

This is how to implement the transparent adaptive loading in your `home_tab.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:animate_do/animate_do.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/modern_theme.dart';
import '../widgets/index.dart';  // This includes all loaders!
import '../services/connectivity_service.dart';
import 'student/project_submission_screen.dart' as student;

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
  bool _isBannerLoading = false;      // NEW!
  bool _isAnnouncementLoading = false; // NEW!
  bool _hasError = false;
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

  Future<void> _fetchData({bool showLoader = true}) async {
    // Check internet first
    final hasInternet = await ConnectivityService().isConnected();
    if (!hasInternet) {
      if (mounted) {
        setState(() => _hasError = true);
      }
      return;
    }

    if (showLoader) {
      setState(() => _isLoading = true);
    }

    try {
      // Fetch banners separately for better UX
      _fetchBanners();
      
      // Fetch announcements separately
      _fetchAnnouncements();

      // Fetch other data
      await Future.delayed(Duration(seconds: 2)); // Simulate API call
      
      if (mounted) {
        setState(() {
          _userName = 'Mohit Thakur';
          _internshipStatus = 'Active';
          _isLoading = false;
          _hasError = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _hasError = true;
        });
      }
    }
  }

  // NEW! Fetch banners with separate loading state
  Future<void> _fetchBanners() async {
    setState(() => _isBannerLoading = true);
    
    try {
      // Simulate API call
      await Future.delayed(Duration(seconds: 1));
      
      if (mounted) {
        setState(() {
          _banners = [
            {'title': 'Banner 1', 'image': 'assets/banner1.png'},
            {'title': 'Banner 2', 'image': 'assets/banner2.png'},
            {'title': 'Banner 3', 'image': 'assets/banner3.png'},
          ];
          _isBannerLoading = false;
          
          // Setup auto-scroll
          _setupBannerAutoScroll();
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isBannerLoading = false);
      }
    }
  }

  // NEW! Fetch announcements with separate loading state
  Future<void> _fetchAnnouncements() async {
    setState(() => _isAnnouncementLoading = true);
    
    try {
      // Simulate API call
      await Future.delayed(Duration(seconds: 1.5));
      
      if (mounted) {
        setState(() {
          _announcements = [
            {'title': 'New Internship Posted', 'date': 'Today'},
            {'title': 'Application Deadline Extended', 'date': 'Yesterday'},
            {'title': 'Certificate Released', 'date': '2 days ago'},
          ];
          _isAnnouncementLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isAnnouncementLoading = false);
      }
    }
  }

  void _setupBannerAutoScroll() {
    _bannerTimer?.cancel();
    
    if (_banners.isNotEmpty) {
      _bannerTimer = Timer.periodic(Duration(seconds: 5), (timer) {
        if (_pageController.hasClients) {
          final nextPage = (_currentPageNotifier.value + 1) % _banners.length;
          _pageController.animateToPage(
            nextPage,
            duration: Duration(milliseconds: 500),
            curve: Curves.easeInOut,
          );
        }
      });
    }
  }

  void _handleRetry() {
    _fetchData(showLoader: true);
  }

  @override
  Widget build(BuildContext context) {
    if (_hasError) {
      return NoInternetScreen(
        onRetry: _handleRetry,
        isFullScreen: false,
      );
    }

    if (_isLoading) {
      return _buildLoadingState();
    }

    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ===== BANNER SECTION =====
          Padding(
            padding: EdgeInsets.all(16),
            child: _buildBannerSection(),
          ),

          SizedBox(height: 20),

          // ===== WELCOME SECTION =====
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: FadeInUp(
              duration: Duration(milliseconds: 600),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Welcome back, $_userName! 👋',
                    style: ModernTheme.heading3,
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Status: $_internshipStatus',
                    style: ModernTheme.body2,
                  ),
                ],
              ),
            ),
          ),

          SizedBox(height: 20),

          // ===== ANNOUNCEMENTS SECTION =====
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Latest Announcements',
                  style: ModernTheme.heading3,
                ),
                SizedBox(height: 12),
                _buildAnnouncementSection(),
              ],
            ),
          ),

          SizedBox(height: 20),

          // ===== OTHER CONTENT =====
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: FadeInUp(
              duration: Duration(milliseconds: 800),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Quick Actions',
                    style: ModernTheme.heading3,
                  ),
                  SizedBox(height: 12),
                  ElevatedButton(
                    onPressed: onNavigateToTasks,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.task_alt),
                        SizedBox(width: 8),
                        Text('View Tasks'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          SizedBox(height: 30),
        ],
      ),
    );
  }

  // ===== BANNER SECTION BUILD =====
  Widget _buildBannerSection() {
    return Column(
      children: [
        Container(
          height: 180,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 10,
                spreadRadius: 2,
              ),
            ],
          ),
          child: _isBannerLoading
              // ✨ SHOW TRANSPARENT LOADING - EXACTLY MATCHING BANNER SIZE
              ? BannerSkeletonLoader(
                  height: 180,
                  isTransparent: true,  // Semi-transparent!
                )
              : _banners.isEmpty
                  ? Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(16),
                        color: ModernTheme.lightGray,
                      ),
                      child: Center(
                        child: Text('No banners available'),
                      ),
                    )
                  : PageView.builder(
                      controller: _pageController,
                      onPageChanged: (index) {
                        _currentPageNotifier.value = index;
                      },
                      itemCount: _banners.length,
                      itemBuilder: (context, index) {
                        return Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(16),
                            gradient: ModernTheme.primaryGradient,
                          ),
                          child: Center(
                            child: Text(
                              _banners[index]['title'],
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        );
                      },
                    ),
        ),
        SizedBox(height: 12),
        // Page indicator
        ValueListenableBuilder<int>(
          valueListenable: _currentPageNotifier,
          builder: (context, currentPage, _) {
            return Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                _banners.length,
                (index) => Container(
                  width: currentPage == index ? 24 : 8,
                  height: 8,
                  margin: EdgeInsets.symmetric(horizontal: 4),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(4),
                    color: currentPage == index
                        ? ModernTheme.primary
                        : ModernTheme.lightGray,
                  ),
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  // ===== ANNOUNCEMENT SECTION BUILD =====
  Widget _buildAnnouncementSection() {
    return _isAnnouncementLoading
        // ✨ SHOW TRANSPARENT LOADING - EXACTLY MATCHING CARD SIZE
        ? ListView.builder(
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            itemCount: 3,
            itemBuilder: (context, index) {
              return Padding(
                padding: EdgeInsets.only(bottom: 12),
                child: AdaptiveCardSkeletonLoader(
                  height: 100,
                  lines: 2,
                  hasImage: false,
                  isTransparent: true,  // Semi-transparent loading!
                  spacing: 8,
                ),
              );
            },
          )
        : _announcements.isEmpty
            ? Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: ModernTheme.lightGray,
                ),
                child: Text('No announcements'),
              )
            : ListView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                itemCount: _announcements.length,
                itemBuilder: (context, index) {
                  final announcement = _announcements[index];
                  return FadeInUp(
                    delay: Duration(milliseconds: index * 100),
                    duration: Duration(milliseconds: 600),
                    child: Card(
                      margin: EdgeInsets.only(bottom: 12),
                      child: Padding(
                        padding: EdgeInsets.all(12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              announcement['title'],
                              style: ModernTheme.body1.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              announcement['date'],
                              style: ModernTheme.caption,
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              );
  }

  // ===== LOADING STATE =====
  Widget _buildLoadingState() {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Banner loading
          Padding(
            padding: EdgeInsets.all(16),
            child: Container(
              height: 180,
              child: BannerSkeletonLoader(
                height: 180,
                isTransparent: true,
              ),
            ),
          ),

          SizedBox(height: 20),

          // Header loading
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SkeletonLoader(height: 24, width: 200),
                SizedBox(height: 12),
                SkeletonLoader(height: 16, width: 150),
              ],
            ),
          ),

          SizedBox(height: 20),

          // Announcements loading
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SkeletonLoader(height: 24, width: 200),
                SizedBox(height: 12),
                ListView.builder(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemCount: 3,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: EdgeInsets.only(bottom: 12),
                      child: AdaptiveCardSkeletonLoader(
                        height: 100,
                        lines: 2,
                        hasImage: false,
                        isTransparent: true,
                      ),
                    );
                  },
                ),
              ],
            ),
          ),

          SizedBox(height: 30),
        ],
      ),
    );
  }
}
```

---

## 🔑 Key Features Implemented

### 1. **Separate Loading States**
```dart
bool _isBannerLoading = false;       // Just banners
bool _isAnnouncementLoading = false; // Just announcements
bool _isLoading = false;             // Overall loading
```

### 2. **Transparent Skeleton Loaders**
```dart
BannerSkeletonLoader(
  height: 180,
  isTransparent: true,  // Shows shimmer but transparent
)

AdaptiveCardSkeletonLoader(
  height: 100,
  isTransparent: true,  // Transparent card loading
)
```

### 3. **Size-Matched Loaders**
- Banner loader: 16:9 ratio (matches actual banner)
- Card loader: Customizable height (matches actual card)
- Both show exactly where content will appear

### 4. **Proper Lifecycle**
- Load starts with `_isBannerLoading = true`
- Loader displays while fetching
- Switches to actual content when ready
- Clean error handling

---

## 🎯 Copy-Paste Ready Values

For your `home_tab.dart`:

```dart
// Replace these values in your implementation
const BANNER_HEIGHT = 180.0;           // Banner height
const BANNER_LOADING_LINES = 2;        // Text lines on loading
const ANNOUNCEMENT_HEIGHT = 100.0;     // Card height
const ANNOUNCEMENT_LOADING_LINES = 2;  // Card text lines
const ANNOUNCEMENT_ITEM_COUNT = 3;     // Number of visible items
const AUTO_SCROLL_DURATION = Duration(seconds: 5);  // Banner scroll time
```

---

## ✅ Results

### Before (Without Loaders)
```
[White space or "Loading..."]
↓ (2 seconds later)
[Content appears suddenly]
```

### After (With Adaptive Loaders) ✨
```
[Transparent loading shape exactly matching content]
↓ (Shimmer effect shows activity)
↓ (2 seconds later)
[Content smoothly appears in the same space]
```

User sees exactly where content will be, and it loads smoothly! 🎉

---

**Now your home_tab has professional adaptive loading! Ready to use!**
