import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { register, isLoading, error, token, clearError } = useAuthStore();

    useEffect(() => {
        // 1. PRIORITY: Handle the Token if user signs up via Google
        const tokenFromUrl = searchParams.get('token');
        
        if (tokenFromUrl) {
            // Save to LocalStorage immediately
            localStorage.setItem('token', tokenFromUrl);
            
            // Update the Zustand store state
            useAuthStore.setState({ 
                token: tokenFromUrl, 
                isAuthenticated: true,
                isLoading: false,
                error: null 
            });

            // Redirect to dashboard
            navigate('/dashboard', { replace: true });
            return;
        }

        // 2. Normal Auth Check (if token already exists in store)
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
        await register(formData);
    };

    const handleGoogleLogin = () => {
        // Hits the backend endpoint - Passport handles both Login & Register
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

    return (
        <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600 z-10" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />

            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative z-20 transition-all">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
                        Create your workspace
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                        Start a persistent space for your team’s ideas.
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {error && (
                        <div className="bg-slate-50 border border-slate-200 text-slate-600 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    {/* Google Sign up Button */}
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
                        Sign up with Google
                    </button>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs font-bold uppercase">
                            <span className="bg-white px-2 text-slate-400 tracking-widest">or sign up with email</span>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                            <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="relative block w-full rounded-xl border-0 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-50/50 transition-all outline-none"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                            <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full rounded-xl border-0 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-50/50 transition-all outline-none"
                                placeholder="you@company.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                            <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full rounded-xl border-0 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-50/50 transition-all outline-none"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-xl bg-indigo-600 py-3.5 px-4 text-sm font-bold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98] mb-3"
                            >
                                {isLoading ? 'Creating account...' : 'Sign up'}
                            </button>
                            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                                Free to start • No credit card required
                            </p>
                        </div>
                    </form>

                    <div className="text-center mt-6 pt-2 border-t border-slate-100">
                        <p className="text-sm text-slate-500 font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;