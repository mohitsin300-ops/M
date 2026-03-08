"use client";
import { useState, useEffect, Suspense } from 'react';
import { supabase } from '../../lib/supabase';
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
        password: '',
        otp: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [resendTimer, setResendTimer] = useState(0);
    const [verifyType, setVerifyType] = useState('signup'); // 'signup' or 'recovery'

    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            if (mode === 'signup') {
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.name,
                            whatsapp_number: formData.whatsapp,
                        }
                    }
                });

                if (error) throw error;
                if (data?.user?.identities?.length === 0) {
                    throw new Error('This email is already registered.');
                }

                setMessage({ text: 'Signup successful! Please check your email for an 8-digit verification code.', type: 'success' });
                setVerifyType('signup');
                setMode('verify-otp');
                setResendTimer(60);
            }
            else if (mode === 'verify-otp') {
                const { data, error } = await supabase.auth.verifyOtp({
                    email: formData.email,
                    token: formData.otp,
                    type: verifyType, // dynamically 'signup' or 'recovery'
                });
                if (error) throw error;

                if (verifyType === 'signup') {
                    setMessage({ text: 'Email verified successfully! Logging you in...', type: 'success' });
                    setTimeout(() => router.push('/dashboard'), 1500);
                } else if (verifyType === 'recovery') {
                    setMessage({ text: 'OTP Verified! Please enter your new password.', type: 'success' });
                    setMode('update-password');
                }
            }
            else if (mode === 'update-password') {
                const { data, error } = await supabase.auth.updateUser({
                    password: formData.password
                });
                if (error) throw error;

                setMessage({ text: 'Password updated successfully! Logging you in...', type: 'success' });
                setTimeout(() => router.push('/dashboard'), 1500);
            }
            else if (mode === 'login') {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                router.push('/dashboard');
            }
            else if (mode === 'forgot-password') {
                const { data, error } = await supabase.auth.resetPasswordForEmail(formData.email);
                if (error) throw error;
                setMessage({ text: 'OTP sent to your email! Please enter it to reset your password.', type: 'success' });
                setVerifyType('recovery');
                setMode('verify-otp');
                setResendTimer(60);
            }
        } catch (error) {
            let errorMsg = error.message || 'An unexpected error occurred.';
            if (errorMsg.toLowerCase().includes('rate limit')) {
                errorMsg = 'Too many requests. Please wait a minute before trying again.';
            }
            setMessage({ text: errorMsg, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0) return;
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            if (verifyType === 'signup') {
                const { error } = await supabase.auth.resend({
                    type: 'signup',
                    email: formData.email,
                });
                if (error) throw error;
            } else if (verifyType === 'recovery') {
                const { error } = await supabase.auth.resetPasswordForEmail(formData.email);
                if (error) throw error;
            }

            setMessage({ text: 'A new 8-digit verification code has been sent to your email.', type: 'success' });
            setResendTimer(60);
        } catch (error) {
            let errorMsg = error.message || 'Failed to resend OTP.';
            if (errorMsg.toLowerCase().includes('rate limit')) {
                errorMsg = 'Too many requests. Please wait a minute before trying again.';
            }
            setMessage({ text: errorMsg, type: 'error' });
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

                {/* Left Side: Branding / Graphic */}
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

                {/* Right Side: Form */}
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
                                    {mode === 'verify-otp' && 'Verify Email'}
                                    {mode === 'update-password' && 'Create New Password'}
                                </h1>
                                <p className="formDesc">
                                    {mode === 'login' && 'Enter your credentials to access your account.'}
                                    {mode === 'signup' && 'Join us to get started with MJ Tech.'}
                                    {mode === 'forgot-password' && "Enter your email and we'll send an 8-digit OTP."}
                                    {mode === 'verify-otp' && "Enter the 8-digit code sent to your email."}
                                    {mode === 'update-password' && "Please set your new password below."}
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

                                {mode === 'verify-otp' ? (
                                    <>
                                        <div className="formGroup">
                                            <label className="formLabel">Verification Code (OTP)</label>
                                            <div className="inputWrapper">
                                                <Shield size={18} className="inputIcon" />
                                                <input
                                                    type="text" name="otp" required value={formData.otp} onChange={handleChange}
                                                    className="inputField"
                                                    placeholder="12345678"
                                                    maxLength={8}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-10px', marginBottom: '15px' }}>
                                            <button
                                                type="button"
                                                onClick={handleResendOtp}
                                                disabled={resendTimer > 0 || loading}
                                                className="forgotLink"
                                                style={{ fontSize: '0.85rem', opacity: resendTimer > 0 ? 0.6 : 1, cursor: resendTimer > 0 ? 'not-allowed' : 'pointer' }}
                                            >
                                                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                                            </button>
                                        </div>
                                    </>
                                ) : mode === 'update-password' ? (
                                    <div className="formGroup">
                                        <label className="formLabel">New Password</label>
                                        <div className="inputWrapper">
                                            <Lock size={18} className="inputIcon" />
                                            <input
                                                type="password" name="password" required value={formData.password} onChange={handleChange}
                                                className="inputField"
                                                placeholder="••••••••"
                                                minLength={6}
                                            />
                                        </div>
                                    </div>
                                ) : (
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
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

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
                                            {mode === 'forgot-password' && 'Send OTP'}
                                            {mode === 'verify-otp' && 'Verify OTP'}
                                            {mode === 'update-password' && 'Update Password'}
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
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
                                {(mode === 'signup' || mode === 'forgot-password' || mode === 'verify-otp' || mode === 'update-password') && (
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
