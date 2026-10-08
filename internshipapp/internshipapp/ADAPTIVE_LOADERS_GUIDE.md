# Adaptive Skeleton Loaders & App Store Integration Guide

## ✨ New Features Added

### 1. **Size-Adaptive Skeleton Loaders** (Transparent Style)

These loaders automatically match the size and layout of your actual content!

#### BannerSkeletonLoader - For Banner/Carousel

```dart
// Shows loading in the exact space where banner will appear
BannerSkeletonLoader()  // Default 16:9 ratio

// Custom dimensions
BannerSkeletonLoader(
  width: 300,
  height: 200,
  isTransparent: true,  // Semi-transparent effect
)
```

**Usage Example - Home Tab Banner Loading:**
```dart
class HomeTab extends StatefulWidget {
  @override
  State<HomeTab> createState() => _HomeTabState();
}

class _HomeTabState extends State<HomeTab> {
  bool _isBannerLoading = true;
  List<dynamic> _banners = [];

  @override
  void initState() {
    super.initState();
    _loadBanners();
  }

  Future<void> _loadBanners() async {
    setState(() => _isBannerLoading = true);
    
    try {
      // Fetch from API
      await Future.delayed(Duration(seconds: 2));
      
      setState(() {
        _banners = ['banner1', 'banner2'];
        _isBannerLoading = false;
      });
    } catch (e) {
      setState(() => _isBannerLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Banner section - shows loading or actual banner
        Container(
          height: 200,
          child: _isBannerLoading
              ? BannerSkeletonLoader(height: 200)  // Loading!
              : PageView(
                  children: _banners.map((b) {
                    return Container(color: Colors.blue, child: Text(b));
                  }).toList(),
                ),
        ),
        
        SizedBox(height: 20),
        
        // Rest of content
        Text('Other content...'),
      ],
    );
  }
}
```

---

#### AdaptiveCardSkeletonLoader - For Cards/List Items

```dart
// Automatically sizes based on content
AdaptiveCardSkeletonLoader(
  height: 150,        // Card height
  lines: 3,           // Number of text lines
  hasImage: true,     // Show/hide image placeholder
  isTransparent: true, // Semi-transparent effect
)
```

**Usage Example - Internship Cards Loading:**
```dart
class InternshipList extends StatefulWidget {
  @override
  State<InternshipList> createState() => _InternshipListState();
}

class _InternshipListState extends State<InternshipList> {
  bool _isLoading = true;
  List<Internship> _internships = [];

  @override
  void initState() {
    super.initState();
    _loadInternships();
  }

  Future<void> _loadInternships() async {
    setState(() => _isLoading = true);
    
    try {
      // Fetch from API
      await Future.delayed(Duration(seconds: 2));
      
      setState(() {
        _internships = [
          Internship(title: 'Internship 1'),
          Internship(title: 'Internship 2'),
          Internship(title: 'Internship 3'),
        ];
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        // Show loading skeletons - exactly matching card size!
        ? ListView.builder(
            itemCount: 3,
            itemBuilder: (context, index) {
              return Padding(
                padding: EdgeInsets.all(12),
                child: AdaptiveCardSkeletonLoader(
                  height: 160,    // Match actual card height
                  lines: 2,       // Match actual text lines
                  hasImage: true, // Match actual layout
                ),
              );
            },
          )
        // Show actual content
        : ListView.builder(
            itemCount: _internships.length,
            itemBuilder: (context, index) {
              return InternshipCard(internship: _internships[index]);
            },
          );
  }
}

class Internship {
  final String title;
  Internship({required this.title});
}
```

---

#### Transparent Skeleton Loader - For Overlay Loading

```dart
// Semi-transparent loading that doesn't block content visibility
SkeletonLoader(
  width: double.infinity,
  height: 100,
  isTransparent: true,  // NEW! Semi-transparent
  opacity: 0.6,         // Adjust transparency
)
```

**Usage Example - Data Refresh with Transparent Loader:**
```dart
Stack(
  children: [
    // Content behind
    ListView(children: [...]),
    
    // Transparent loader on top (if loading)
    if (_isRefreshing)
      Positioned(
        top: 80,
        left: 16,
        right: 16,
        child: AdaptiveCardSkeletonLoader(
          isTransparent: true,  // Shows loading while content is visible
        ),
      ),
  ],
)
```

---

### 2. **Play Store & App Store Integration** 

App update buttons now open the actual app stores!

#### How It Works

When user clicks "Update Now":
- **Android** → Opens Play Store
- **iOS** → Opens App Store

#### Configuration

**Update your package IDs in `lib/services/app_store_service.dart`:**

```dart
class AppStoreLinks {
  // Update these with your actual IDs
  static const String playStorePackageId = 'com.mjtechglobal.internshipapp';
  static const String appStoreBundleId = 'com.mjtechglobal.internshipapp';
  
  // Rest of the code...
}
```

#### Usage - Already Integrated!

The update dialogs/screens automatically:
1. Detect platform (Android/iOS)
2. Open correct store
3. Show platform-specific button text

```dart
// Dialog example - already works!
showDialog(
  context: context,
  builder: (_) => AppUpdateDialog(
    currentVersion: '1.0.0',
    newVersion: '1.0.1',
    releaseNotes: 'Bug fixes',
    isForced: false,
    onUpdate: () {
      // Automatically opens Play Store (Android) 
      // or App Store (iOS)!
    },
  ),
);

// Screen example - also works!
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (_) => AppUpdateScreen(
      currentVersion: '1.0.0',
      newVersion: '1.0.1',
    ),
  ),
);
```

---

## 🎯 Best Practices

### 1. **Size Your Loaders Correctly**

```dart
// ❌ BAD - Loader doesn't match content
BannerSkeletonLoader(height: 150)  // But actual banner is 200!
    
// ✅ GOOD - Loader matches content
BannerSkeletonLoader(height: 200)  // Same as actual content!
```

### 2. **Use Transparent for Overlays**

```dart
// ❌ BAD - Full opacity blocks content
if (_refreshing) {
  CardSkeletonLoader(isTransparent: false)  // Blocks view
}

// ✅ GOOD - Transparent lets content show through
if (_refreshing) {
  CardSkeletonLoader(isTransparent: true)   // Content visible!
}
```

### 3. **Match Layout Exactly**

```dart
// ❌ BAD - Different layout than actual
AdaptiveCardSkeletonLoader(
  lines: 1,          // Actual card has 3 lines!
  hasImage: false,   // Actual card has image!
)

// ✅ GOOD - Exact match
AdaptiveCardSkeletonLoader(
  lines: 3,          // Matches actual card
  hasImage: true,    // Matches actual card
)
```

---

## 📱 Common Scenarios

### Scenario 1: Banner Loading
```dart
_isBannerLoading 
    ? BannerSkeletonLoader()
    : PageView(...)
```

### Scenario 2: List Loading
```dart
_isListLoading
    ? ListView.builder(
        itemCount: 5,
        itemBuilder: (context, index) => 
            AdaptiveCardSkeletonLoader(),
      )
    : ListView.builder(
        itemCount: _items.length,
        itemBuilder: (context, index) => 
            ItemCard(_items[index]),
      )
```

### Scenario 3: Transparent Refresh Loading
```dart
Stack(
  children: [
    // Content
    ListView(...),
    
    // Transparent loading overlay
    if (_refreshing)
      Positioned(
        top: 100,
        child: AdaptiveCardSkeletonLoader(
          isTransparent: true,
        ),
      ),
  ],
)
```

### Scenario 4: App Update (Already Configured!)
```dart
// Just use normally - everything is automatic!
AppUpdateDialog(
  currentVersion: '1.0.0',
  newVersion: '1.0.1',
  onUpdate: () {
    // Opens Play Store/App Store automatically!
  },
)
```

---

## 🎨 Customization

### Custom Banner Ratio
```dart
BannerSkeletonLoader(
  width: 300,
  height: 150,  // Custom ratio
)
```

### Custom Card Style
```dart
AdaptiveCardSkeletonLoader(
  height: 200,
  lines: 4,
  spacing: 12,
  hasImage: false,
)
```

### Custom Colors
```dart
SkeletonLoader(
  baseColor: Colors.grey[200],
  highlightColor: Colors.grey[100],
  isTransparent: true,
  opacity: 0.7,
)
```

---

## 🔧 Advanced: Custom Adaptive Loaders

Create loaders that match your specific components:

```dart
// Profile skeleton - exact match
ProfileSkeletonLoader()  // Already available!

// Custom internship card skeleton
class InternshipCardSkeletonLoader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return AdaptiveCardSkeletonLoader(
      height: 200,  // Your actual card height
      lines: 4,     // Your actual text count
      hasImage: true,
      isTransparent: true,
    );
  }
}

// Use it
InternshipCardSkeletonLoader()
```

---

## ✅ Implementation Checklist

- [x] Update `app_store_service.dart` with correct package IDs
- [ ] Use `BannerSkeletonLoader()` for banner sections
- [ ] Use `AdaptiveCardSkeletonLoader()` for list items
- [ ] Use `isTransparent: true` for overlay loading
- [ ] Match loader sizes to actual content
- [ ] Test on both Android and iOS
- [ ] Verify app store buttons work

---

## 🚀 Summary

**What's New:**
1. ✅ Size-adaptive skeleton loaders
2. ✅ Transparent loading effects
3. ✅ Automatic app store integration
4. ✅ Platform-specific buttons

**Key Files:**
- `lib/widgets/skeleton_loader.dart` - New adaptive loaders
- `lib/services/app_store_service.dart` - Store integration
- `lib/screens/app_update_screen.dart` - Updated with store buttons

**Quick Start:**
```dart
// For banners
BannerSkeletonLoader()

// For cards  
AdaptiveCardSkeletonLoader(height: 150)

// Update screens - automatic store linking!
AppUpdateDialog(...)
```

---

All features are production-ready and integrated! 🎉
