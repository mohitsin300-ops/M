import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AdminBannersTab extends StatefulWidget {
  const AdminBannersTab({super.key});

  @override
  State<AdminBannersTab> createState() => _AdminBannersTabState();
}

class _AdminBannersTabState extends State<AdminBannersTab> {
  List<dynamic> _banners = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchBanners();
  }

  Future<void> _fetchBanners() async {
    setState(() => _isLoading = true);
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('banners')
          .orderBy('created_at', descending: true)
          .get();
      final data = snapshot.docs.map((doc) {
        final item = doc.data();
        item['id'] = doc.id;
        return item;
      }).toList();
      if (mounted) {
        setState(() {
          _banners = data;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _toggleBannerStatus(String id, bool currentStatus) async {
    try {
      await FirebaseFirestore.instance
          .collection('banners')
          .doc(id)
          .set({'is_active': !currentStatus}, SetOptions(merge: true));
      _fetchBanners();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  Future<void> _deleteBanner(String id) async {
    try {
       await FirebaseFirestore.instance.collection('banners').doc(id).delete();
       _fetchBanners();
    } catch (e) {
       ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  void _showAddBannerDialog() {
    final imageUrlController = TextEditingController();
    final linkUrlController = TextEditingController();

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Add Promo Banner'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: imageUrlController,
              decoration: const InputDecoration(labelText: 'Banner Image URL (Required)', border: OutlineInputBorder()),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: linkUrlController,
              decoration: const InputDecoration(labelText: 'Target Link URL (Optional)', border: OutlineInputBorder()),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              if (imageUrlController.text.trim().isEmpty) return;
              try {
                await FirebaseFirestore.instance.collection('banners').add({
                  'image_url': imageUrlController.text.trim(),
                  'link_url': linkUrlController.text.trim(),
                  'is_active': true,
                  'created_at': FieldValue.serverTimestamp(),
                });
                if (mounted) {
                  Navigator.pop(context);
                  _fetchBanners();
                }
              } catch (e) {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
              }
            },
            child: const Text('Add Banner'),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddBannerDialog,
        backgroundColor: const Color(0xFF1565C0),
        child: const Icon(Icons.add_photo_alternate, color: Colors.white),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _banners.isEmpty
              ? const Center(child: Text('No banners available. Add one!'))
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _banners.length,
                  itemBuilder: (context, index) {
                    final banner = _banners[index];
                    final isActive = banner['is_active'] as bool? ?? false;

                    return Card(
                      elevation: 2,
                      margin: const EdgeInsets.only(bottom: 16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          ClipRRect(
                            borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                            child: SizedBox(
                              height: 140,
                              width: double.infinity,
                              child: Image.network(
                                banner['image_url'],
                                fit: BoxFit.cover,
                                errorBuilder: (context, error, stackTrace) {
                                  return Container(
                                    color: Colors.grey.shade300,
                                    child: const Center(
                                      child: Column(
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        children: [
                                          Icon(Icons.broken_image, color: Colors.grey),
                                          SizedBox(height: 4),
                                          Text('Invalid Image Link', style: TextStyle(color: Colors.grey, fontSize: 12)),
                                        ],
                                      ),
                                    ),
                                  );
                                },
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(12),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Text(
                                    banner['link_url']?.isNotEmpty == true ? banner['link_url'] : 'No link provided',
                                    style: const TextStyle(color: Colors.grey, fontSize: 13),
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                                Row(
                                  children: [
                                    const Text('Active: ', style: TextStyle(fontWeight: FontWeight.bold)),
                                    Switch(
                                      value: isActive,
                                      activeColor: Colors.green,
                                      onChanged: (val) => _toggleBannerStatus(banner['id'], isActive),
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.delete, color: Colors.red),
                                      onPressed: () => _deleteBanner(banner['id']),
                                    )
                                  ],
                                )
                              ],
                            ),
                          )
                        ],
                      ),
                    );
                  },
                ),
    );
  }
}
