"use client";
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '../../lib/firebase';
import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Phone, ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import './Auth.css';

function AuthContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialMode = searchParams.get('mode') || 'login';

    const [mode, setMode] = useState(initialMode);

    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    const getAuthErrorMessage = (error) => {
        const code = error?.code || '';

        if (code === 'auth/email-already-in-use') return 'This email is already registered. Please log in instead.';
        if (code === 'auth/invalid-email') return 'Please enter a valid email address.';
        if (code === 'auth/weak-password') return 'Password should be at least 6 characters.';
        if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
            return 'Invalid email or password.';
        }
        if (code === 'auth/popup-closed-by-user') return 'Google sign-in popup was closed before completing sign-in.';
        if (code === 'auth/popup-blocked') return 'Popup was blocked by the browser. Please allow popups and try again.';
        if (code === 'auth/too-many-requests') return 'Too many requests. Please wait and try again.';

        return error?.message || 'An unexpected error occurred.';
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            if (mode === 'signup') {
                const credential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                await updateProfile(credential.user, { displayName: formData.name });
                await setDoc(doc(db, 'users', credential.user.uid), {
                    email: formData.email,
                    name: formData.name,
                    whatsapp: formData.whatsapp,
                    created_at: new Date().toISOString()
                }, { merge: true });
                await sendEmailVerification(credential.user);
                await signOut(auth);
                setMessage({ text: 'Signup successful! A verification email has been sent. Please verify your email, then log in.', type: 'success' });
                setMode('login');
            } else if (mode === 'login') {
                const credential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
                if (!credential.user.emailVerified) {
                    await sendEmailVerification(credential.user);
                    await signOut(auth);
                    throw new Error('Your email is not verified. A new verification email has been sent.');
                }
                router.push('/dashboard');
            } else if (mode === 'forgot-password') {
                const resetLink = typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined;
                await sendPasswordResetEmail(auth, formData.email, resetLink ? { url: resetLink, handleCodeInApp: true } : undefined);
                setMessage({ text: 'Password reset link has been sent to your email.', type: 'success' });
            }
        } catch (error) {
            setMessage({ text: getAuthErrorMessage(error), type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const provider = new GoogleAuthProvider();
            const credential = await signInWithPopup(auth, provider);
            const user = credential.user;

            // Do not block navigation on profile sync; write in background.
            void setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                name: user.displayName || 'Google User',
                whatsapp: user.phoneNumber || '',
                photo_url: user.photoURL || '',
                provider: 'google',
                created_at: new Date().toISOString()
            }, { merge: true }).catch((syncError) => {
                console.error('Google profile sync failed:', syncError);
            });

            router.push('/dashboard');
        } catch (error) {
            setMessage({ text: getAuthErrorMessage(error), type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } }
    };

    return (
        <div className="authContainer">
            <div className="authCard">
                <div className="authLeft">
                    <div className="authLeftGlow" />

                    <div className="authLeftContent">
                        <img src="/logo.png" alt="MJ Tech Global" className="authLogo" />
                        <h2 className="authTitle">
                            Welcome to the <br />
                            <span className="gradientText">
                                MJ Tech Core
                            </span>
                        </h2>
                        <p className="authDesc">
                            Manage your internship applications, download verified certificates, and connect with the MJ Tech ecosystem.
                        </p>
                    </div>

                    <div className="authFeatureCard">
                        <Shield color="#60a5fa" size={32} />
                        <h3 className="authFeatureTitle">Secure Authentication</h3>
                        <p className="authFeatureDesc">Powered by industry-standard encryption to keep your data safe and unified across our platforms.</p>
                    </div>
                </div>

                <div className="authRight">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="authFormWrapper"
                        >
                            <div className="formHeader">
                                <h1 className="formTitle">
                                    {mode === 'login' && 'Log In'}
                                    {mode === 'signup' && 'Create an Account'}
                                    {mode === 'forgot-password' && 'Reset Password'}
                                </h1>
                                <p className="formDesc">
                                    {mode === 'login' && 'Enter your credentials to access your account.'}
                                    {mode === 'signup' && 'Join us to get started with MJ Tech Global.'}
                                    {mode === 'forgot-password' && "Enter your email and we'll send a password reset link."}
                                </p>
                            </div>

                            {message.text && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`alertBox ${message.type === 'error' ? 'error' : 'success'}`}
                                >
                                    {message.text}
                                </motion.div>
                            )}

                            <form onSubmit={handleAuth}>
                                {mode === 'signup' && (
                                    <>
                                        <div className="formGroup">
                                            <label className="formLabel">Full Name</label>
                                            <div className="inputWrapper">
                                                <User size={18} className="inputIcon" />
                                                <input
                                                    type="text" name="name" required value={formData.name} onChange={handleChange}
                                                    className="inputField"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>
                                        <div className="formGroup">
                                            <label className="formLabel">WhatsApp Number</label>
                                            <div className="inputWrapper">
                                                <Phone size={18} className="inputIcon" />
                                                <input
                                                    type="tel" name="whatsapp" required value={formData.whatsapp} onChange={handleChange}
                                                    className="inputField"
                                                    placeholder="+91 9876543210"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <>
                                    <div className="formGroup">
                                        <label className="formLabel">Email Address</label>
                                        <div className="inputWrapper">
                                            <Mail size={18} className="inputIcon" />
                                            <input
                                                type="email" name="email" required value={formData.email} onChange={handleChange}
                                                className="inputField"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    {mode !== 'forgot-password' && (
                                        <div className="formGroup">
                                            <div className="formLabelRow">
                                                <label className="formLabel" style={{ marginBottom: 0 }}>Password</label>
                                                {mode === 'login' && (
                                                    <button type="button" onClick={() => { setMode('forgot-password'); setMessage({ text: '', type: '' }); }} className="forgotLink">
                                                        Forgot?
                                                    </button>
                                                )}
                                            </div>
                                            <div className="inputWrapper">
                                                <Lock size={18} className="inputIcon" />
                                                <input
                                                    type="password" name="password" required value={formData.password} onChange={handleChange}
                                                    className="inputField"
                                                    placeholder="********"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="submitBtn"
                                >
                                    {loading ? (
                                        <div className="spinner" />
                                    ) : (
                                        <>
                                            {mode === 'login' && 'Log In to Account'}
                                            {mode === 'signup' && 'Create Account'}
                                            {mode === 'forgot-password' && 'Send Reset Link'}
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>

                                {(mode === 'login' || mode === 'signup') && (
                                    <>
                                        <div className="authDivider">
                                            <span>or continue with</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleGoogleAuth}
                                            disabled={loading}
                                            className="googleBtn"
                                        >
                                            <svg viewBox="0 0 24 24" className="googleIcon" aria-hidden="true">
                                                <path d="M21.35 11.1H12v2.98h5.37c-.23 1.52-1.73 4.47-5.37 4.47-3.24 0-5.87-2.68-5.87-5.98S8.76 6.6 12 6.6c1.84 0 3.07.78 3.77 1.45l2.57-2.5C16.71 4.03 14.55 3 12 3 7.03 3 3 7.03 3 12s4.03 9 9 9c5.2 0 8.64-3.65 8.64-8.79 0-.59-.06-1.04-.14-1.49z" fill="currentColor" />
                                            </svg>
                                            {mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}
                                        </button>
                                    </>
                                )}
                            </form>

                            <div className="switchText">
                                {mode === 'login' && (
                                    <p>
                                        Don't have an account?{' '}
                                        <button onClick={() => { setMode('signup'); setMessage({ text: '', type: '' }); }} className="switchBtn">
                                            Sign Up
                                        </button>
                                    </p>
                                )}
                                {(mode === 'signup' || mode === 'forgot-password') && (
                                    <p>
                                        <button type="button" onClick={() => { setMode('login'); setMessage({ text: '', type: '' }); }} className="switchBtn">
                                            <ArrowLeft size={16} /> Back to Log In
                                        </button>
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="authContainer"><div className="spinner"></div></div>}>
            <AuthContent />
        </Suspense>
    );
}
