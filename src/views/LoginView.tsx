import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

// ── Mock user store (frontend-only, no backend) ───────────────────────────────
const SEED_USERS = [
  { email: 'admin@amw.com', password: 'amw2026',  name: 'Studio Admin' },
  { email: 'demo@amw.com',  password: 'demo1234', name: 'Demo User'    },
];

type AuthUsers = typeof SEED_USERS;

function getStoredUsers(): AuthUsers {
  try {
    const raw = localStorage.getItem('amw_users');
    return raw ? [...SEED_USERS, ...JSON.parse(raw)] : SEED_USERS;
  } catch {
    return SEED_USERS;
  }
}

function saveNewUser(user: { email: string; password: string; name: string }) {
  try {
    const raw = localStorage.getItem('amw_users');
    const existing: AuthUsers = raw ? JSON.parse(raw) : [];
    localStorage.setItem('amw_users', JSON.stringify([...existing, user]));
  } catch {}
}

// ── Shared input style helpers ────────────────────────────────────────────────
const base = 'w-full bg-[#f3ede1] border p-3 text-[#1d1c14] font-mono-custom text-xs focus:outline-none transition-colors placeholder-[#b0a89f]';
const ok   = 'border-[#1d1c14] focus:border-[#a53c1b]';
const err  = 'border-[#ba1a1a] bg-[#fff0ee]';

// ── FieldError small helper ───────────────────────────────────────────────────
const FieldError: React.FC<{ msg?: string }> = ({ msg }) =>
  msg ? (
    <p className="font-mono-custom text-[11px] text-[#ba1a1a] mt-1 flex items-center gap-1">
      <span className="material-symbols-outlined text-[13px]">error</span>
      {msg}
    </p>
  ) : null;

// =============================================================================
// LoginView — combined Login + Sign Up page
// =============================================================================
export const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, setCursorText } = useShop();

  // Which tab is active
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  // ── Login state ───────────────────────────────────────────────────────────
  const [loginEmail,    setLoginEmail]    = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginShowPwd,  setLoginShowPwd]  = useState(false);
  const [rememberMe,    setRememberMe]    = useState(false);
  const [loginLoading,  setLoginLoading]  = useState(false);
  const [loginErrors,   setLoginErrors]   = useState<{email?:string; password?:string; general?:string}>({});

  // ── Sign-up state ─────────────────────────────────────────────────────────
  const [signupName,     setSignupName]     = useState('');
  const [signupEmail,    setSignupEmail]    = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm,  setSignupConfirm]  = useState('');
  const [signupShowPwd,  setSignupShowPwd]  = useState(false);
  const [signupLoading,  setSignupLoading]  = useState(false);
  const [signupErrors,   setSignupErrors]   = useState<{name?:string; email?:string; password?:string; confirm?:string; general?:string}>({});

  // Pre-fill remembered email
  useEffect(() => {
    const rem = localStorage.getItem('amw_remembered_email');
    if (rem) { setLoginEmail(rem); setRememberMe(true); }
  }, []);

  // ── Login validation ──────────────────────────────────────────────────────
  const validateLogin = () => {
    const e: typeof loginErrors = {};
    if (!loginEmail.trim())                                      e.email    = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail))   e.email    = 'Enter a valid email.';
    if (!loginPassword)                                          e.password = 'Password is required.';
    else if (loginPassword.length < 6)                           e.password = 'Minimum 6 characters.';
    setLoginErrors(e);
    return !Object.keys(e).length;
  };

  // ── Sign-up validation ────────────────────────────────────────────────────
  const validateSignup = () => {
    const e: typeof signupErrors = {};
    if (!signupName.trim())                                        e.name     = 'Full name is required.';
    if (!signupEmail.trim())                                       e.email    = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail))    e.email    = 'Enter a valid email.';
    if (!signupPassword)                                           e.password = 'Password is required.';
    else if (signupPassword.length < 6)                            e.password = 'Minimum 6 characters.';
    if (signupPassword !== signupConfirm)                          e.confirm  = 'Passwords do not match.';
    setSignupErrors(e);
    return !Object.keys(e).length;
  };

  // ── Handle login submit ───────────────────────────────────────────────────
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoginLoading(true);
    setLoginErrors({});
    setTimeout(() => {
      const users = getStoredUsers();
      const user  = users.find(u => u.email === loginEmail.trim().toLowerCase() && u.password === loginPassword);
      if (user) {
        if (rememberMe) localStorage.setItem('amw_remembered_email', loginEmail.trim().toLowerCase());
        else            localStorage.removeItem('amw_remembered_email');
        localStorage.setItem('amw_session', JSON.stringify({ name: user.name, email: user.email }));
        showToast('Welcome Back', `Signed in as ${user.name}.`);
        navigate('/home');
      } else {
        setLoginErrors({ general: 'Email or password is incorrect. Check demo credentials below.' });
      }
      setLoginLoading(false);
    }, 800);
  };

  // ── Handle signup submit ──────────────────────────────────────────────────
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;

    const users = getStoredUsers();
    if (users.find(u => u.email === signupEmail.trim().toLowerCase())) {
      setSignupErrors({ email: 'An account with this email already exists.' });
      return;
    }

    setSignupLoading(true);
    setTimeout(() => {
      const newUser = { email: signupEmail.trim().toLowerCase(), password: signupPassword, name: signupName.trim() };
      saveNewUser(newUser);
      localStorage.setItem('amw_session', JSON.stringify({ name: newUser.name, email: newUser.email }));
      showToast('Account Created', `Welcome, ${newUser.name}! Your archive is ready.`);
      navigate('/home');
      setSignupLoading(false);
    }, 800);
  };

  // ── Social auth (mock) ────────────────────────────────────────────────────
  const handleSocial = (provider: 'Google') => {
    setLoginLoading(true);
    setTimeout(() => {
      const name = 'Google User';
      localStorage.setItem('amw_session', JSON.stringify({ name, email: `${provider.toLowerCase()}@mock.com` }));
      showToast('Signed In', `Continued with ${provider}. Welcome to AMW.`);
      navigate('/home');
      setLoginLoading(false);
    }, 900);
  };

  const isLoading = loginLoading || signupLoading;

  // ── Left panel feature list ───────────────────────────────────────────────
  const features = [
    { icon: 'favorite',         text: 'Saved wishlist & curated picks'      },
    { icon: 'local_shipping',   text: 'Real-time order & shipment tracking'  },
    { icon: 'receipt_long',     text: 'Full order history & invoice PDFs'   },
    { icon: 'lock',             text: 'Secure checkout & saved addresses'   },
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-10 pb-24 bg-[#fff9ed]">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 border-2 border-[#1d1c14] shadow-[8px_8px_0px_0px_rgba(29,28,20,1)]">

        {/* ── Left: dark editorial panel (desktop only) ── */}
        <div className="hidden lg:flex flex-col justify-between bg-[#1d1c14] p-10 xl:p-14 relative overflow-hidden">
          {/* Texture lines */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff9ed 0,#fff9ed 1px,transparent 1px,transparent 36px)' }}
          />
          {/* EST tag */}
          <div className="absolute bottom-0 right-0 bg-[#a53c1b] px-4 py-2">
            <span className="font-mono-custom text-[10px] text-white uppercase tracking-widest">EST. 1994</span>
          </div>

          <div className="relative z-10">
            <button onClick={() => navigate('/')} className="mb-10 text-left group">
              <h1 className="font-headline text-2xl xl:text-3xl font-bold uppercase tracking-[0.08em] text-white group-hover:opacity-80 transition-opacity">
                AMAR MEN'S WEAR
              </h1>
              <span className="font-mono-custom text-[10px] tracking-widest text-[#7e766f] uppercase block mt-0.5">
                GANDHI CHOWK · VARANGAON
              </span>
            </button>

            <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-[#a53c1b] block mb-3">
              // ARCHIVE ACCESS
            </span>
            <h2 className="font-editorial text-4xl xl:text-5xl font-bold text-white tracking-tight leading-[1.05] mb-4">
              {tab === 'login' ? (
                <>Sign in to your<br /><span className="italic font-normal text-[#fe7e57]">wardrobe archive.</span></>
              ) : (
                <>Create your<br /><span className="italic font-normal text-[#fe7e57]">archive account.</span></>
              )}
            </h2>
            <p className="font-body-custom text-sm text-[#cfc5bd] leading-relaxed max-w-xs">
              {tab === 'login'
                ? 'Access your saved garments, track live shipments and manage your bespoke tailoring history.'
                : 'Join the AMW archive. Get exclusive access to new drops, order tracking and a personal saved wishlist.'}
            </p>
          </div>

          <div className="relative z-10 border-t border-white/10 pt-8 space-y-3">
            {features.map(({ icon, text }) => (
              <div key={icon} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#a53c1b] text-base">{icon}</span>
                <span className="font-mono-custom text-[11px] text-[#cfc5bd] uppercase tracking-wide">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: form panel ── */}
        <div className="bg-[#fff9ed] p-6 sm:p-10 xl:p-12 flex flex-col">

          {/* Mobile brand */}
          <div className="lg:hidden mb-6 pb-5 border-b border-[#cfc5bd] flex items-center justify-between">
            <button onClick={() => navigate('/')} className="font-headline text-xl font-bold uppercase tracking-[0.08em] text-[#1d1c14]">
              AMAR MEN'S WEAR
            </button>
            <span className="font-mono-custom text-[9px] uppercase tracking-widest text-[#7e766f]">EST. 1994</span>
          </div>

          {/* ── Tab switcher ── */}
          <div className="flex border-2 border-[#1d1c14] mb-7 flex-shrink-0">
            {(['login', 'signup'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 font-body-custom text-xs uppercase tracking-widest font-bold transition-colors ${
                  tab === t
                    ? 'bg-[#1d1c14] text-white'
                    : 'bg-[#f3ede1] text-[#4c4640] hover:bg-[#e8e2d6]'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* ── Social buttons (shared for both tabs) ── */}
          <div className="mb-5">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSocial('Google')}
              onMouseEnter={() => setCursorText('GOOGLE')}
              onMouseLeave={() => setCursorText('')}
              className="w-full flex items-center justify-center gap-2 border border-[#cfc5bd] bg-[#f9f3e7] hover:border-[#1d1c14] hover:bg-[#f3ede1] transition-colors py-3 px-3 font-mono-custom text-xs uppercase tracking-wide disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#cfc5bd]" />
            <span className="font-mono-custom text-[10px] uppercase tracking-widest text-[#7e766f]">or</span>
            <div className="flex-1 h-px bg-[#cfc5bd]" />
          </div>

          {/* ── Animated form panel ── */}
          <AnimatePresence mode="wait">
            {tab === 'login' ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                noValidate
                className="space-y-4 flex-1"
              >
                {/* General error */}
                {loginErrors.general && (
                  <div className="p-3 bg-[#fff0ee] border border-[#ba1a1a] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-sm mt-0.5 flex-shrink-0">error</span>
                    <p className="font-mono-custom text-[11px] text-[#ba1a1a] leading-relaxed">{loginErrors.general}</p>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block font-mono-custom text-[11px] uppercase text-[#7e766f] mb-1.5 tracking-wider">Email *</label>
                  <input
                    type="email" autoComplete="email" placeholder="your@email.com"
                    value={loginEmail}
                    onChange={e => { setLoginEmail(e.target.value); setLoginErrors(p => ({...p, email:undefined, general:undefined})); }}
                    className={`${base} ${loginErrors.email ? err : ok}`}
                  />
                  <FieldError msg={loginErrors.email} />
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="font-mono-custom text-[11px] uppercase text-[#7e766f] tracking-wider">Password *</label>
                    <button type="button"
                      onClick={() => showToast('Forgot Password', 'Please contact admin@amw.com to reset your password.', 'info')}
                      className="font-mono-custom text-[11px] text-[#a53c1b] hover:underline uppercase tracking-wide">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={loginShowPwd ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••"
                      value={loginPassword}
                      onChange={e => { setLoginPassword(e.target.value); setLoginErrors(p => ({...p, password:undefined, general:undefined})); }}
                      className={`${base} pr-11 ${loginErrors.password ? err : ok}`}
                    />
                    <button type="button" onClick={() => setLoginShowPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7e766f] hover:text-[#1d1c14]"
                      aria-label={loginShowPwd ? 'Hide' : 'Show'}>
                      <span className="material-symbols-outlined text-[18px]">{loginShowPwd ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                  <FieldError msg={loginErrors.password} />
                </div>

                {/* Remember me */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div onClick={() => setRememberMe(v => !v)}
                    className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${rememberMe ? 'bg-[#1d1c14] border-[#1d1c14]' : 'bg-[#f3ede1] border-[#cfc5bd] group-hover:border-[#1d1c14]'}`}>
                    {rememberMe && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                  </div>
                  <span className="font-mono-custom text-[11px] uppercase tracking-wide text-[#4c4640] select-none">Remember me</span>
                </label>

                {/* Submit */}
                <button type="submit" disabled={loginLoading}
                  onMouseEnter={() => setCursorText('SIGN IN')} onMouseLeave={() => setCursorText('')}
                  className="w-full bg-[#a53c1b] text-white font-body-custom text-sm uppercase tracking-widest py-4 font-bold hover:bg-[#1d1c14] transition-all border border-[#a53c1b] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)] disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer">
                  {loginLoading
                    ? <><span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"/><span>SIGNING IN...</span></>
                    : <><span className="material-symbols-outlined text-base">login</span><span>SIGN IN TO ARCHIVE</span></>}
                </button>

                {/* Demo credentials */}
                <div className="p-3 bg-[#f3ede1] border border-[#e8e2d6]">
                  <p className="font-mono-custom text-[10px] font-bold text-[#1d1c14] uppercase tracking-wider mb-1">// Demo Credentials</p>
                  <p className="font-mono-custom text-[11px] text-[#7e766f]">
                    <span className="text-[#a53c1b]">admin@amw.com</span> / amw2026
                  </p>
                </div>

                <p className="font-mono-custom text-[11px] text-center text-[#7e766f]">
                  No account?{' '}
                  <button type="button" onClick={() => setTab('signup')} className="text-[#a53c1b] font-bold hover:underline uppercase tracking-wide">
                    Create one →
                  </button>
                </p>
              </motion.form>

            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSignup}
                noValidate
                className="space-y-4 flex-1"
              >
                {/* General error */}
                {signupErrors.general && (
                  <div className="p-3 bg-[#fff0ee] border border-[#ba1a1a] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-sm mt-0.5 flex-shrink-0">error</span>
                    <p className="font-mono-custom text-[11px] text-[#ba1a1a] leading-relaxed">{signupErrors.general}</p>
                  </div>
                )}

                {/* Full name */}
                <div>
                  <label className="block font-mono-custom text-[11px] uppercase text-[#7e766f] mb-1.5 tracking-wider">Full Name *</label>
                  <input
                    type="text" autoComplete="name" placeholder="Your full name"
                    value={signupName}
                    onChange={e => { setSignupName(e.target.value); setSignupErrors(p => ({...p, name:undefined})); }}
                    className={`${base} ${signupErrors.name ? err : ok}`}
                  />
                  <FieldError msg={signupErrors.name} />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono-custom text-[11px] uppercase text-[#7e766f] mb-1.5 tracking-wider">Email Address *</label>
                  <input
                    type="email" autoComplete="email" placeholder="your@email.com"
                    value={signupEmail}
                    onChange={e => { setSignupEmail(e.target.value); setSignupErrors(p => ({...p, email:undefined})); }}
                    className={`${base} ${signupErrors.email ? err : ok}`}
                  />
                  <FieldError msg={signupErrors.email} />
                </div>

                {/* Password */}
                <div>
                  <label className="block font-mono-custom text-[11px] uppercase text-[#7e766f] mb-1.5 tracking-wider">Password *</label>
                  <div className="relative">
                    <input
                      type={signupShowPwd ? 'text' : 'password'} autoComplete="new-password" placeholder="Min. 6 characters"
                      value={signupPassword}
                      onChange={e => { setSignupPassword(e.target.value); setSignupErrors(p => ({...p, password:undefined})); }}
                      className={`${base} pr-11 ${signupErrors.password ? err : ok}`}
                    />
                    <button type="button" onClick={() => setSignupShowPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7e766f] hover:text-[#1d1c14]">
                      <span className="material-symbols-outlined text-[18px]">{signupShowPwd ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                  <FieldError msg={signupErrors.password} />
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block font-mono-custom text-[11px] uppercase text-[#7e766f] mb-1.5 tracking-wider">Confirm Password *</label>
                  <input
                    type={signupShowPwd ? 'text' : 'password'} autoComplete="new-password" placeholder="Repeat password"
                    value={signupConfirm}
                    onChange={e => { setSignupConfirm(e.target.value); setSignupErrors(p => ({...p, confirm:undefined})); }}
                    className={`${base} ${signupErrors.confirm ? err : ok}`}
                  />
                  <FieldError msg={signupErrors.confirm} />
                </div>

                {/* Terms note */}
                <p className="font-mono-custom text-[10px] text-[#7e766f] leading-relaxed">
                  By creating an account you agree to AMW's terms of service and privacy policy.
                </p>

                {/* Submit */}
                <button type="submit" disabled={signupLoading}
                  onMouseEnter={() => setCursorText('JOIN')} onMouseLeave={() => setCursorText('')}
                  className="w-full bg-[#1d1c14] text-white font-body-custom text-sm uppercase tracking-widest py-4 font-bold hover:bg-[#a53c1b] transition-all border border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)] disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer">
                  {signupLoading
                    ? <><span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"/><span>CREATING ACCOUNT...</span></>
                    : <><span className="material-symbols-outlined text-base">person_add</span><span>CREATE ARCHIVE ACCOUNT</span></>}
                </button>

                <p className="font-mono-custom text-[11px] text-center text-[#7e766f]">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setTab('login')} className="text-[#a53c1b] font-bold hover:underline uppercase tracking-wide">
                    Sign in →
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Browse without login */}
          <button type="button" onClick={() => navigate('/shop')}
            className="mt-5 font-mono-custom text-[11px] text-center text-[#7e766f] hover:text-[#1d1c14] uppercase tracking-wide transition-colors cursor-pointer">
            ← Continue browsing without signing in
          </button>
        </div>
      </div>
    </div>
  );
};
