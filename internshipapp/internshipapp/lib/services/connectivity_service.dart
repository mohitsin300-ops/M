import 'package:connectivity_plus/connectivity_plus.dart';

/// Connectivity service to check internet status
class ConnectivityService {
  static final ConnectivityService _instance = ConnectivityService._internal();
  final Connectivity _connectivity = Connectivity();

  ConnectivityService._internal();

  factory ConnectivityService() {
    return _instance;
  }

  /// Check if device is connected to internet
  Future<bool> isConnected() async {
    try {
      final result = await _connectivity.checkConnectivity();
      return result != ConnectivityResult.none;
    } catch (e) {
      return false;
    }
  }

  /// Get connection status stream
  Stream<bool> get connectionStatusStream {
    return _connectivity.onConnectivityChanged.map(
      (result) => result != ConnectivityResult.none,
    );
  }

  /// Get detailed connection result
  Future<ConnectivityResult> getConnectionStatus() async {
    try {
      return await _connectivity.checkConnectivity();
    } catch (e) {
      return ConnectivityResult.none;
    }
  }
}
