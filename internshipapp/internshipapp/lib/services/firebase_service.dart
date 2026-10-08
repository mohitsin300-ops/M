import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:google_sign_in/google_sign_in.dart';
import '../firebase_options.dart';

class FirebaseService {
  static Future<void> initialize() async {
    if (Firebase.apps.isNotEmpty) {
      return;
    }
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  }

  static FirebaseAuth get auth => FirebaseAuth.instance;
  static FirebaseFirestore get db => FirebaseFirestore.instance;

  static User? get currentUser => auth.currentUser;

  static Future<bool> isAdminUser(User user) async {
    try {
      final token = await user.getIdTokenResult(true);
      if (token.claims?['admin'] == true) {
        return true;
      }

      final profile = await getUserProfile(user.uid);
      final role = (profile?['role'] ?? '').toString().toLowerCase();
      return role == 'admin';
    } catch (_) {
      return false;
    }
  }

  static Future<UserCredential> signInWithGoogle() async {
    if (kIsWeb) {
      final provider = GoogleAuthProvider();
      return auth.signInWithPopup(provider);
    }

    final googleUser = await GoogleSignIn().signIn();
    if (googleUser == null) {
      throw FirebaseAuthException(
        code: 'google-sign-in-cancelled',
        message: 'Google sign-in was cancelled.',
      );
    }

    final googleAuth = await googleUser.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );

    return auth.signInWithCredential(credential);
  }

  static Future<void> ensureUserProfile(User user) async {
    final docRef = db.collection('users').doc(user.uid);
    final snapshot = await docRef.get();

    final payload = <String, dynamic>{
      'uid': user.uid,
      'email': user.email ?? '',
      'full_name': user.displayName ?? '',
      'updated_at': FieldValue.serverTimestamp(),
      'created_at': FieldValue.serverTimestamp(),
    };

    if (!(snapshot.data()?.containsKey('role') ?? false)) {
      payload['role'] = 'student';
    }

    await docRef.set(payload, SetOptions(merge: true));
  }

  static Future<Map<String, dynamic>?> getUserProfile(String uid) async {
    final doc = await db.collection('users').doc(uid).get();
    return doc.data();
  }

  static Future<void> upsertUserProfile({
    required String uid,
    required String email,
    required String fullName,
    required String whatsapp,
  }) async {
    final docRef = db.collection('users').doc(uid);
    final snapshot = await docRef.get();

    final payload = <String, dynamic>{
      'uid': uid,
      'email': email,
      'full_name': fullName,
      'whatsapp_number': whatsapp,
      'updated_at': FieldValue.serverTimestamp(),
      'created_at': FieldValue.serverTimestamp(),
    };

    if (!(snapshot.data()?.containsKey('role') ?? false)) {
      payload['role'] = 'student';
    }

    await docRef.set(payload, SetOptions(merge: true));
  }
}
