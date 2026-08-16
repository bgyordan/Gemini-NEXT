'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '../../lib/supabaseClient';
import './vhod.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Грешен имейл или парола.');
      return;
    }
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="vhod-wrap">
      <div className="vhod-card">
        <div className="vhod-logo">
          <img src="/logo.jpg" alt="ЦСОП Варна" />
        </div>
        <h1>Вход за редактори</h1>
        <p className="vhod-sub">Управление на съдържанието на сайта</p>

        <form onSubmit={handleLogin} className="vhod-form">
          <label>
            <span>Имейл</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ime@csop-varna.bg"
              required
              autoComplete="email"
            />
          </label>
          <label>
            <span>Парола</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </label>

          {error && <div className="vhod-error">{error}</div>}

          <button type="submit" disabled={loading} className="vhod-btn">
            {loading ? 'Влизане…' : 'Вход'}
          </button>
        </form>

        <a href="/" className="vhod-back">← Обратно към сайта</a>
      </div>
    </div>
  );
}
