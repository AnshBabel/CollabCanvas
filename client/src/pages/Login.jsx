import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login, isLoading, error, token, clearError } = useAuthStore();

    useEffect(() => {
        // 1. CATCH TOKEN: Handle the redirect from Google
        const tokenFromUrl = searchParams.get('token');
        
        if (tokenFromUrl) {
            localStorage.setItem('token', tokenFromUrl);
            useAuthStore.setState({ 
                token: tokenFromUrl, 
                isAuthenticated: true,
                isLoading: false,
                error: null 
            });
            navigate('/dashboard', { replace: true });
            return;
        }

        if (token) {
            navigate('/dashboard');
        }
        
        return () => clearError();
    }, [token, navigate, clearError, searchParams]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    const handleGoogleLogin = () => {
        // Points to your backend port 5000
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

    return (
        <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600 z-10" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />

            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative z-20 transition-all">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
                        Welcome back
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                        Continue where your team left off.
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {error && (
                        <div className="bg-slate-50 border border-slate-200 text-slate-600 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-white border border-slate-200 py-3 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] mb-4 shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs font-bold uppercase">
                            <span className="bg-white px-2 text-slate-400 tracking-widest">or continue with email</span>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 ring-1 ring-slate-200 bg-slate-50/50 outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                                placeholder="you@company.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 ring-1 ring-slate-200 bg-slate-50/50 outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all"
                        >
                            {isLoading ? 'Signing in...' : 'Log In'}
                        </button>
                    </form>

                    <div className="text-center pt-2 mt-6 border-t border-slate-100">
                        <p className="text-sm text-slate-500 font-medium">
                            New here? <Link to="/register" className="font-bold text-indigo-600">Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;