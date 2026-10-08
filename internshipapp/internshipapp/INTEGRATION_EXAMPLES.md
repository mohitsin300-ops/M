# Integration Examples - Loading & Animation System

## Practical Examples for Your App

---

## 1. Home Tab with Loading & Skeleton

```dart
import 'package:flutter/material.dart';
import 'package:internshipapp/widgets/index.dart';
import 'package:internshipapp/services/connectivity_service.dart';

class HomeTabWithLoading extends StatefulWidget {
  const HomeTabWithLoading({super.key});

  @override
  State<HomeTabWithLoading> createState() => _HomeTabWithLoadingState();
}

class _HomeTabWithLoadingState extends State<HomeTabWithLoading> {
  bool _isLoading = false;
  bool _hasError = false;
  List<dynamic> _banners = [];

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    // Check internet connection first
    final hasInternet = await ConnectivityService().isConnected();
    if (!hasInternet) {
      if (mounted) {
        setState(() => _hasError = true);
      }
      return;
    }

    setState(() => _isLoading = true);
    try {
      // Fetch your data here
      await Future.delayed(Duration(seconds: 2)); // Simulate API call
      setState(() {
        _isLoading = false;
        _banners = [1, 2, 3]; // Mock data
      });
    } catch (e) {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _hasError = true;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return ListView(
        padding: EdgeInsets.all(16),
        children: [
          CardSkeletonLoader(height: 150),
          SizedBox(height: 16),
          CardSkeletonLoader(height: 100),
          SizedBox(height: 16),
          CardSkeletonLoader(height: 100),
        ],
      );
    }

    if (_hasError) {
      return Center(
        child: NoInternetScreen(
          onRetry: _fetchData,
          isFullScreen: false,
        ),
      );
    }

    return ListView(
      children: [
        // Your actual content here
        Text('Loaded content: ${_banners.length} banners'),
      ],
    );
  }
}
```

---

## 2. Dashboard with Smooth Transitions

```dart
import 'package:flutter/material.dart';
import 'package:internshipapp/widgets/page_transition.dart';
import 'package:internshipapp/screens/profile_tab.dart';

class DashboardWithTransitions extends StatelessWidget {
  const DashboardWithTransitions({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          // Internship Card with navigation
          GestureDetector(
            onTap: () {
              // Use smooth transition
              PageTransitions.slideFromRight(
                context,
                InternshipDetailsScreen(),
              );
            },
            child: Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('View Internship'),
                    Icon(Icons.arrow_forward),
                  ],
                ),
              ),
            ),
          ),

          SizedBox(height: 16),

          // Profile Card with different transition
          GestureDetector(
            onTap: () {
              PageTransitions.fadeInScale(
                context,
                ProfileTab(),
              );
            },
            child: Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Text('View Profile'),
              ),
            ),
          ),

          SizedBox(height: 16),

          // Tasks with slide from bottom
          GestureDetector(
            onTap: () {
              PageTransitions.slideFromBottom(
                context,
                TasksTab(),
              );
            },
            child: Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Text('View Tasks'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

---

## 3. API Call with Loading Indicator

```dart
import 'package:flutter/material.dart';
import 'package:internshipapp/widgets/loading_spinner.dart';
import 'package:internshipapp/services/connectivity_service.dart';

class TaskListWithLoading extends StatefulWidget {
  const TaskListWithLoading({super.key});

  @override
  State<TaskListWithLoading> createState() => _TaskListWithLoadingState();
}

class _TaskListWithLoadingState extends State<TaskListWithLoading> {
  bool _isLoading = false;
  List<Task> _tasks = [];

  Future<void> _loadTasks() async {
    // Show loading indicator at top
    if (mounted) {
      setState(() => _isLoading = true);
    }

    try {
      // Simulate API call
      await Future.delayed(Duration(seconds: 2));
      
      if (mounted) {
        setState(() {
          _tasks = [
            Task(id: '1', title: 'Task 1'),
            Task(id: '2', title: 'Task 2'),
          ];
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isLoading = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error loading tasks')),
        );
      }
    }
  }

  @override
  void initState() {
    super.initState();
    _loadTasks();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Loading bar at top (like YouTube)
        if (_isLoading) MinimalLoadingBar(),

        Expanded(
          child: _tasks.isEmpty && !_isLoading
              ? Center(child: Text('No tasks'))
              : ListView.builder(
                  itemCount: _tasks.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(_tasks[index].title),
                    );
                  },
                ),
        ),
      ],
    );
  }
}

class Task {
  final String id;
  final String title;

  Task({required this.id, required this.title});
}
```

---

## 4. Form Submission with Loading

```dart
import 'package:flutter/material.dart';
import 'package:internshipapp/widgets/loading_spinner.dart';
import 'package:internshipapp/theme/modern_theme.dart';

class InternshipApplicationForm extends StatefulWidget {
  const InternshipApplicationForm({super.key});

  @override
  State<InternshipApplicationForm> createState() =>
      _InternshipApplicationFormState();
}

class _InternshipApplicationFormState extends State<InternshipApplicationForm> {
  bool _isSubmitting = false;
  final _formKey = GlobalKey<FormState>();

  Future<void> _submitApplication() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isSubmitting = true);

    try {
      // Submit to API
      await Future.delayed(Duration(seconds: 2));

      if (mounted) {
        setState(() => _isSubmitting = false);

        // Show success message
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Application submitted successfully!'),
            backgroundColor: ModernTheme.success,
          ),
        );

        // Navigate back
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isSubmitting = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            decoration: InputDecoration(labelText: 'Name'),
            validator: (value) =>
                value?.isEmpty ?? true ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            decoration: InputDecoration(labelText: 'Email'),
            validator: (value) =>
                value?.isEmpty ?? true ? 'Required' : null,
          ),
          SizedBox(height: 32),
          // Submit button with loading state
          if (_isSubmitting)
            LoadingSpinner(
              size: 40,
              label: 'Submitting...',
            )
          else
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _submitApplication,
                child: Text('Submit Application'),
              ),
            ),
        ],
      ),
    );
  }
}
```

---

## 5. Nested Loading States

```dart
import 'package:flutter/material.dart';
import 'package:internshipapp/widgets/skeleton_loader.dart';
import 'package:internshipapp/theme/modern_theme.dart';

class ProfileScreenWithNesting extends StatefulWidget {
  const ProfileScreenWithNesting({super.key});

  @override
  State<ProfileScreenWithNesting> createState() =>
      _ProfileScreenWithNestingState();
}

class _ProfileScreenWithNestingState extends State<ProfileScreenWithNesting> {
  bool _profileLoading = false;
  bool _certificatesLoading = false;

  @override
  void initState() {
    super.initState();
    _loadProfile();
    _loadCertificates();
  }

  Future<void> _loadProfile() async {
    setState(() => _profileLoading = true);
    await Future.delayed(Duration(seconds: 1));
    setState(() => _profileLoading = false);
  }

  Future<void> _loadCertificates() async {
    setState(() => _certificatesLoading = true);
    await Future.delayed(Duration(seconds: 2));
    setState(() => _certificatesLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            // Profile Section
            if (_profileLoading)
              ProfileSkeletonLoader()
            else
              _buildProfileSection(),

            SizedBox(height: 32),

            // Certificates Section
            Text(
              'Certificates',
              style: ModernTheme.heading3,
            ),
            SizedBox(height: 16),

            if (_certificatesLoading)
              ListSkeletonLoader(itemCount: 3)
            else
              _buildCertificatesList(),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileSection() {
    return Column(
      children: [
        CircleAvatar(radius: 60, backgroundColor: ModernTheme.primary),
        SizedBox(height: 16),
        Text('John Doe', style: ModernTheme.heading3),
        Text('Student', style: ModernTheme.subtitle2),
      ],
    );
  }

  Widget _buildCertificatesList() {
    return ListView.builder(
      shrinkWrap: true,
      physics: NeverScrollableScrollPhysics(),
      itemCount: 3,
      itemBuilder: (context, index) {
        return Card(
          margin: EdgeInsets.only(bottom: 12),
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text('Certificate ${index + 1}'),
          ),
        );
      },
    );
  }
}
```

---

## 6. Retry Logic with Error Handling

```dart
import 'package:flutter/material.dart';
import 'package:internshipapp/screens/error_screen.dart';
import 'package:internshipapp/widgets/skeleton_loader.dart';

class DataWithRetry extends StatefulWidget {
  const DataWithRetry({super.key});

  @override
  State<DataWithRetry> createState() => _DataWithRetryState();
}

class _DataWithRetryState extends State<DataWithRetry> {
  bool _isLoading = false;
  bool _hasError = false;
  String? _errorMessage;
  List<String> _data = [];
  int _retryCount = 0;

  Future<void> _fetchData() async {
    setState(() {
      _isLoading = true;
      _hasError = false;
      _errorMessage = null;
    });

    try {
      // Simulate API call that fails randomly
      await Future.delayed(Duration(seconds: 1));
      
      if (_retryCount == 0) {
        throw Exception('Network error');
      }

      if (mounted) {
        setState(() {
          _isLoading = false;
          _data = ['Item 1', 'Item 2', 'Item 3'];
          _retryCount = 0;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _hasError = true;
          _errorMessage = e.toString();
        });
      }
    }
  }

  Future<void> _handleRetry() async {
    setState(() => _retryCount++);
    await _fetchData();
  }

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return ListView(
        padding: EdgeInsets.all(16),
        children: [
          CardSkeletonLoader(),
          SizedBox(height: 12),
          CardSkeletonLoader(),
          SizedBox(height: 12),
          CardSkeletonLoader(),
        ],
      );
    }

    if (_hasError) {
      return ErrorScreen(
        title: 'Failed to Load Data',
        message: _errorMessage ?? 'Please try again',
        icon: Icons.error_outline,
        onRetry: _handleRetry,
        isFullScreen: false,
      );
    }

    return ListView.builder(
      itemCount: _data.length,
      itemBuilder: (context, index) {
        return Card(
          margin: EdgeInsets.all(8),
          child: ListTile(
            title: Text(_data[index]),
          ),
        );
      },
    );
  }
}
```

---

## 7. Stream-based Loading with Connectivity

```dart
import 'package:flutter/material.dart';
import 'package:internshipapp/services/connectivity_service.dart';
import 'package:internshipapp/widgets/loading_spinner.dart';
import 'package:internshipapp/screens/error_screen.dart';

class StreamBasedContent extends StatefulWidget {
  const StreamBasedContent({super.key});

  @override
  State<StreamBasedContent> createState() => _StreamBasedContentState();
}

class _StreamBasedContentState extends State<StreamBasedContent> {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<bool>(
      stream: ConnectivityService().connectionStatusStream,
      builder: (context, connectivity) {
        final isOnline = connectivity.data ?? false;

        if (!isOnline) {
          return NoInternetScreen(
            onRetry: () {},
            isFullScreen: true,
          );
        }

        // Your normal content when online
        return ListView(
          children: [
            // Your components
          ],
        );
      },
    );
  }
}
```

---

## 🎯 Key Integration Points

1. **For every API call**: Use LoadingSpinner or skeleton loader
2. **For page navigation**: Use PageTransitions for smooth animations
3. **For error handling**: Use ErrorScreen or NoInternetScreen
4. **For initialization**: Use AppInitializer in main.dart
5. **For connectivity**: Listen to ConnectivityService stream

---

## 📌 Common Patterns

### Pattern 1: Load-Display-Error

```dart
if (isLoading) {
  return SkeletonLoader();
} else if (hasError) {
  return ErrorScreen(...);
} else {
  return Content();
}
```

### Pattern 2: Overlay Loading

```dart
Stack(
  children: [
    Content(),
    if (isLoading)
      Center(child: LoadingSpinner()),
  ],
);
```

### Pattern 3: Transition Navigation

```dart
PageTransitions.slideFromRight(context, NextScreen());
```

---

These examples cover the most common scenarios in your app. Adapt them as needed!
