import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:url_launcher/url_launcher.dart';

class CertificateScreen extends StatefulWidget {
  final Map<String, dynamic>? studentData;
  const CertificateScreen({super.key, this.studentData});

  @override
  State<CertificateScreen> createState() => _CertificateScreenState();
}

class _CertificateScreenState extends State<CertificateScreen> {
  static const String _certificatePortalUrl =
      'https://www.mjtechglobal.com/dashboard';

  bool _isLoading = true;
  bool _isRequesting = false;

  Map<String, dynamic>? _application;
  Map<String, dynamic>? _certificate;
  String? _statusMessage;

  String _normalizeStatus(String? status) {
    final value = (status ?? 'Pending').trim();
    if (value.toLowerCase() == 'complete') return 'completed';
    if (value.toLowerCase() == 'aprovl') return 'approval';
    if (value.toLowerCase() == 'progreces') return 'progress';
    return value.toLowerCase();
  }

  String _displayStatus(String? status) {
    final normalized = _normalizeStatus(status);
    if (normalized.isEmpty) return 'Pending';
    return normalized[0].toUpperCase() + normalized.substring(1);
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
    _loadCertificateData();
  }

  Future<void> _loadCertificateData() async {
    setState(() {
      _isLoading = true;
      _statusMessage = null;
    });

    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user == null) {
        setState(() {
          _statusMessage = 'Please login to view certificate status.';
          _isLoading = false;
        });
        return;
      }

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

      final certSnapshots = await Future.wait([
        FirebaseFirestore.instance
            .collection('certificates')
            .where('user_id', isEqualTo: user.uid)
            .get(),
        if (user.email != null)
          FirebaseFirestore.instance
              .collection('certificates')
              .where('email', isEqualTo: user.email)
              .get(),
        if (user.email != null)
          FirebaseFirestore.instance
              .collection('certificates')
              .where('user_email', isEqualTo: user.email)
              .get(),
      ]);

      final latestApplications = <String, Map<String, dynamic>>{};
      for (final snapshot in appSnapshots) {
        for (final doc in snapshot.docs) {
          final item = doc.data();
          item['id'] = doc.id;
          latestApplications[doc.id] = item;
        }
      }

      final latestCertificates = <String, Map<String, dynamic>>{};
      for (final snapshot in certSnapshots) {
        for (final doc in snapshot.docs) {
          final item = doc.data();
          item['id'] = doc.id;
          latestCertificates[doc.id] = item;
        }
      }

      final applicationList = latestApplications.values.toList()
        ..sort((a, b) => _compareCreatedAt(b['created_at'], a['created_at']));
      final certificateList = latestCertificates.values.toList()
        ..sort((a, b) => _compareCreatedAt(b['created_at'], a['created_at']));

      setState(() {
        _application = applicationList.isNotEmpty
            ? applicationList.first
            : null;
        _certificate = certificateList.isNotEmpty
            ? certificateList.first
            : null;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _statusMessage = 'Unable to load certificate details.';
        _isLoading = false;
      });
    }
  }

  String _internshipStatus() {
    return _displayStatus(_application?['status']?.toString());
  }

  String _normalizedStatus() {
    return _normalizeStatus(_internshipStatus());
  }

  bool _isEligibleForCertificate() {
    final status = _normalizedStatus();
    return status == 'completed' ||
        status == 'approved' ||
        status == 'approval' ||
        status == 'active' ||
        status == 'progress' ||
        _certificate != null;
  }

  String _certificateStatus() {
    if (_certificate != null) {
      return _displayStatus(_certificate?['status']?.toString());
    }
    if (_isEligibleForCertificate()) {
      return 'Eligible';
    }
    return 'Not Eligible Yet';
  }

  List<String> get _statusStages => const [
    'Pending',
    'Progress',
    'Active',
    'Approval',
    'Completed',
  ];

  int _currentStageIndex() {
    final current = _normalizedStatus();
    for (var i = 0; i < _statusStages.length; i++) {
      if (_statusStages[i].toLowerCase() == current) {
        return i;
      }
    }
    if (current == 'completed') return 4;
    if (current == 'approved') return 3;
    return 0;
  }

  Future<void> _requestCertificate() async {
    final user = FirebaseAuth.instance.currentUser;
    final app = _application;
    if (user == null || app == null) return;

    setState(() => _isRequesting = true);
    try {
      await FirebaseFirestore.instance.collection('certificate_requests').add({
        'user_id': user.uid,
        'email': user.email,
        'application_id': app['id'],
        'status': 'pending',
        'created_at': FieldValue.serverTimestamp(),
      });
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Certificate request submitted successfully.'),
          backgroundColor: Colors.green,
        ),
      );
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Unable to submit certificate request.'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      if (mounted) setState(() => _isRequesting = false);
    }
  }

  Future<void> _openWebsiteCertificatePortal() async {
    final uri = Uri.parse(_certificatePortalUrl);
    final opened = await launchUrl(uri, mode: LaunchMode.externalApplication);
    if (!opened && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Unable to open certificate portal website.'),
        ),
      );
    }
  }

  String _safe(dynamic value, {String fallback = 'N/A'}) {
    final text = (value ?? '').toString().trim();
    return text.isEmpty ? fallback : text;
  }

  String _dateValue(dynamic value) {
    if (value is Timestamp) {
      final d = value.toDate();
      return '${d.day}/${d.month}/${d.year}';
    }
    if (value is DateTime) {
      return '${value.day}/${value.month}/${value.year}';
    }
    return _safe(value);
  }

  @override
  Widget build(BuildContext context) {
    final shouldOpenWebsite =
        _certificate != null || _isEligibleForCertificate();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text(
          'My Certificate',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        backgroundColor: const Color(0xFF673AB7),
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadCertificateData,
          ),
        ],
      ),
      body: _isLoading
          ? const Center(
              child: CircularProgressIndicator(color: Color(0xFF673AB7)),
            )
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  if (_statusMessage != null)
                    Container(
                      margin: const EdgeInsets.only(bottom: 12),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.red.shade50,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        _statusMessage!,
                        style: const TextStyle(color: Colors.red),
                      ),
                    ),

                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.06),
                          blurRadius: 16,
                          offset: const Offset(0, 6),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'Certificate Status',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 10,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                color: _isEligibleForCertificate()
                                    ? Colors.green.withValues(alpha: 0.12)
                                    : Colors.orange.withValues(alpha: 0.14),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                _certificateStatus(),
                                style: TextStyle(
                                  color: _isEligibleForCertificate()
                                      ? Colors.green.shade700
                                      : Colors.orange.shade700,
                                  fontWeight: FontWeight.w700,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 14),
                        _infoRow('Internship Status', _internshipStatus()),
                        _infoRow('Domain', _safe(_application?['skills'])),
                        _infoRow('Duration', _safe(_application?['duration'])),
                        _infoRow(
                          'Applied On',
                          _dateValue(_application?['created_at']),
                        ),
                        _infoRow(
                          'Certificate ID',
                          _safe(_certificate?['certificate_id']),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Certificate Flow',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Row(
                          children: List.generate(
                            _statusStages.length * 2 - 1,
                            (index) {
                              if (index.isOdd) {
                                return Expanded(
                                  child: Container(
                                    height: 2,
                                    color: index ~/ 2 < _currentStageIndex()
                                        ? Colors.green
                                        : Colors.grey.shade300,
                                  ),
                                );
                              }

                              final stageIndex = index ~/ 2;
                              final isActive =
                                  stageIndex <= _currentStageIndex();
                              final label = _statusStages[stageIndex];

                              return Column(
                                children: [
                                  CircleAvatar(
                                    radius: 10,
                                    backgroundColor: isActive
                                        ? Colors.green
                                        : Colors.grey.shade300,
                                    child: isActive
                                        ? const Icon(
                                            Icons.check,
                                            size: 12,
                                            color: Colors.white,
                                          )
                                        : const SizedBox.shrink(),
                                  ),
                                  const SizedBox(height: 6),
                                  Text(
                                    label,
                                    style: TextStyle(
                                      fontSize: 10,
                                      fontWeight: FontWeight.w600,
                                      color: isActive
                                          ? Colors.green.shade700
                                          : Colors.grey.shade500,
                                    ),
                                  ),
                                ],
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  if (shouldOpenWebsite) ...[
                    ElevatedButton.icon(
                      onPressed: _openWebsiteCertificatePortal,
                      icon: const Icon(Icons.open_in_new_rounded),
                      label: const Text(
                        'Download Certificate From Website',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF1565C0),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                  ] else
                    ElevatedButton.icon(
                      onPressed: (_application == null || _isRequesting)
                          ? null
                          : _requestCertificate,
                      icon: _isRequesting
                          ? const SizedBox(
                              width: 16,
                              height: 16,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                          : const Icon(Icons.request_page_rounded),
                      label: Text(
                        _isRequesting ? 'Requesting...' : 'Request Certificate',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF673AB7),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),

                  const SizedBox(height: 12),
                  const Text(
                    'Certificate download is managed on website. App redirects you to the certificate portal.',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.black54, fontSize: 12),
                  ),
                ],
              ),
            ),
    );
  }

  Widget _infoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          SizedBox(
            width: 130,
            child: Text(
              label,
              style: const TextStyle(
                color: Colors.black54,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const Text(': '),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(
                color: Colors.black87,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
