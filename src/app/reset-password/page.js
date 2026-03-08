"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isSessionActive, setIsSessionActive] = useState(false);

    useEffect(() => {
        // Supabase will automatically handle the #access_token in the URL.
        // We just verify that a session was established.
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsSessionActive(true);
            }
        };
        checkSession();

        // Optional listener in case it takes a moment to persist
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                setIsSessionActive(true);
            }
        });

        return () => {
            if (authListener?.subscription) {
                authListener.subscription.unsubscribe();
            }
        };
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage({ text: 'Passwords do not match.', type: 'error' });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const { data, error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) {
                setMessage({ text: error.message, type: 'error' });
            } else {
                setMessage({
                    text: 'Password successfully updated!',
                    type: 'success'
                });
                setTimeout(() => router.push('/dashboard'), 2000);
            }
        } catch (error) {
            setMessage({ text: 'An unexpected error occurred.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-32">
            <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">Update Password</h1>
                    <p className="text-zinc-400">Please enter a new, secure password</p>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-lg mb-6 ${message.type === 'error' ? 'bg-red-500/10 border border-red-500/50 text-red-400' : 'bg-green-500/10 border border-green-500/50 text-green-400'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">New Password *</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Confirm New Password *</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isSessionActive}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] disabled:opacity-50"
                    >
                        {loading ? 'Updating Password...' : 'Save New Password'}
                    </button>
                    {!isSessionActive && !message.text && (
                        <p className="text-red-400 text-sm mt-2 text-center">
                            Invalid or expired reset link.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
