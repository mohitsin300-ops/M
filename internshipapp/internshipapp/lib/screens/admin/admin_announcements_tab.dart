import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AdminAnnouncementsTab extends StatefulWidget {
  const AdminAnnouncementsTab({super.key});

  @override
  State<AdminAnnouncementsTab> createState() => _AdminAnnouncementsTabState();
}

class _AdminAnnouncementsTabState extends State<AdminAnnouncementsTab> {
  final _msgController = TextEditingController();
  final _titleController = TextEditingController();
  bool _isLoading = false;
  bool _isListLoading = true;
  List<dynamic> _recentAnnouncements = [];

  @override
  void initState() {
    super.initState();
    _fetchRecentAnnouncements();
  }

  Future<void> _fetchRecentAnnouncements() async {
    setState(() => _isListLoading = true);
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('announcements')
          .orderBy('created_at', descending: true)
          .limit(5)
          .get();
      final data = snapshot.docs.map((doc) {
        final item = doc.data();
        item['id'] = doc.id;
        return item;
      }).toList();
      if (!mounted) return;
      setState(() {
        _recentAnnouncements = data;
        _isListLoading = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _recentAnnouncements = [];
        _isListLoading = false;
      });
    }
  }

  void _postAnnouncement() async {
    if (_msgController.text.isEmpty || _titleController.text.isEmpty) return;
    setState(() => _isLoading = true);
    
    try {
      await FirebaseFirestore.instance.collection('announcements').add({
        'title': _titleController.text.trim(),
        'message': _msgController.text.trim(),
        'created_at': FieldValue.serverTimestamp(),
      });

      if (mounted) {
        setState(() {
          _isLoading = false;
          _titleController.clear();
          _msgController.clear();
        });
        _fetchRecentAnnouncements();
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text('Announcement Posted Successfully!'),
          backgroundColor: Colors.green,
        ));
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isLoading = false);
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Error: ${e.toString()}'),
          backgroundColor: Colors.red,
        ));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: FadeInUp(
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20)],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Row(
                children: [
                  Icon(Icons.campaign, color: Colors.orange, size: 30),
                  SizedBox(width: 10),
                  Text('Broadcast Update', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.black87)),
                ],
              ),
              const SizedBox(height: 24),
              TextField(
                controller: _titleController,
                decoration: InputDecoration(
                  hintText: 'Announcement Title',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                  filled: true,
                  fillColor: Colors.grey.shade50,
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _msgController,
                maxLines: 5,
                decoration: InputDecoration(
                  hintText: 'Type your message here... This will be visible to all students on their dashboard.',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                  filled: true,
                  fillColor: Colors.grey.shade50,
                ),
              ),
              const SizedBox(height: 30),
              ElevatedButton.icon(
                onPressed: _isLoading ? null : _postAnnouncement,
                icon: _isLoading ? const SizedBox() : const Icon(Icons.send),
                label: _isLoading 
                    ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Post Announcement', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.orange,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                  elevation: 2,
                ),
              ),
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Recent Announcements',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                      color: Colors.black87,
                    ),
                  ),
                  TextButton(
                    onPressed: _fetchRecentAnnouncements,
                    child: const Text('Refresh'),
                  ),
                ],
              ),
              if (_isListLoading)
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 16),
                  child: Center(child: CircularProgressIndicator()),
                )
              else if (_recentAnnouncements.isEmpty)
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Text(
                    'No announcements posted yet.',
                    style: TextStyle(color: Colors.black54),
                  ),
                )
              else
                ..._recentAnnouncements.map((item) {
                  final msg = (item['message'] ?? item['content'] ?? '').toString();
                  return Container(
                    width: double.infinity,
                    margin: const EdgeInsets.only(top: 10),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade50,
                      border: Border.all(color: Colors.grey.shade200),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          (item['title'] ?? 'Announcement').toString(),
                          style: const TextStyle(
                            fontWeight: FontWeight.w700,
                            color: Colors.black87,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          msg,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(color: Colors.black54),
                        ),
                      ],
                    ),
                  );
                }),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _msgController.dispose();
    _titleController.dispose();
    super.dispose();
  }
}
