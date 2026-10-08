import 'package:shared_preferences/shared_preferences.dart';

/// App version management service
class AppVersionService {
  static final AppVersionService _instance = AppVersionService._internal();
  static const String _versionKey = 'app_version';
  static const String _lastUpdateCheckKey = 'last_update_check';

  // Current app version - update this when releasing new versions
  static const String currentVersion = '1.0.0';

  AppVersionService._internal();

  factory AppVersionService() {
    return _instance;
  }

  /// Initialize app version on first launch
  Future<void> initialize() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey(_versionKey)) {
      await prefs.setString(_versionKey, currentVersion);
    }
  }

  /// Get current app version
  Future<String> getCurrentVersion() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_versionKey) ?? currentVersion;
  }

  /// Check if app is outdated
  Future<bool> isOutdated(String latestVersion) async {
    final current = await getCurrentVersion();
    return _compareVersions(latestVersion, current) > 0;
  }

  /// Compare two versions (returns 1 if v1 > v2, -1 if v1 < v2, 0 if equal)
  int _compareVersions(String v1, String v2) {
    final v1Parts = v1.split('.').map(int.parse).toList();
    final v2Parts = v2.split('.').map(int.parse).toList();

    for (int i = 0; i < 3; i++) {
      if (v1Parts[i] > v2Parts[i]) return 1;
      if (v1Parts[i] < v2Parts[i]) return -1;
    }
    return 0;
  }

  /// Update current version
  Future<void> updateVersion(String newVersion) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_versionKey, newVersion);
  }

  /// Get last update check timestamp
  Future<DateTime?> getLastUpdateCheck() async {
    final prefs = await SharedPreferences.getInstance();
    final timestamp = prefs.getInt(_lastUpdateCheckKey);
    if (timestamp == null) return null;
    return DateTime.fromMillisecondsSinceEpoch(timestamp);
  }

  /// Update last check timestamp
  Future<void> updateLastCheck() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(
      _lastUpdateCheckKey,
      DateTime.now().millisecondsSinceEpoch,
    );
  }

  /// Should check for updates (check every 24 hours)
  Future<bool> shouldCheckForUpdates() async {
    final lastCheck = await getLastUpdateCheck();
    if (lastCheck == null) return true;

    final now = DateTime.now();
    final difference = now.difference(lastCheck);
    return difference.inHours > 24;
  }

  /// Mock check for new version (replace with actual API call)
  Future<UpdateCheckResult?> checkForUpdates() async {
    // In real app, call your backend API here
    // For now, returning null (no update available)
    //
    // Example response:
    // {
    //   "hasUpdate": true,
    //   "latestVersion": "1.0.1",
    //   "isForced": false,
    //   "releaseNotes": "Bug fixes and performance improvements",
    //   "updateUrl": "https://play.google.com/store/apps/details?id=..."
    // }

    await updateLastCheck();
    return null;
  }
}

/// Update check result model
class UpdateCheckResult {
  final bool hasUpdate;
  final String latestVersion;
  final bool isForced;
  final String releaseNotes;
  final String updateUrl;

  UpdateCheckResult({
    required this.hasUpdate,
    required this.latestVersion,
    required this.isForced,
    required this.releaseNotes,
    required this.updateUrl,
  });

  factory UpdateCheckResult.fromJson(Map<String, dynamic> json) {
    return UpdateCheckResult(
      hasUpdate: json['hasUpdate'] ?? false,
      latestVersion: json['latestVersion'] ?? '',
      isForced: json['isForced'] ?? false,
      releaseNotes: json['releaseNotes'] ?? '',
      updateUrl: json['updateUrl'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'hasUpdate': hasUpdate,
      'latestVersion': latestVersion,
      'isForced': isForced,
      'releaseNotes': releaseNotes,
      'updateUrl': updateUrl,
    };
  }
}
