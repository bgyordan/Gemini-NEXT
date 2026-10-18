'use client';

import { useEffect, useState } from 'react';
import './contactform.css';

const T = {
  bg: {
    h: 'Пишете ни', sub: 'Ще ви отговорим на посочения имейл, обикновено до два работни дни.',
    name: 'Име и фамилия', email: 'Имейл', phone: 'Телефон', opt: 'по желание', topic: 'Тема', msg: 'Съобщение',
    topics: { general: 'Общ въпрос', admission: 'Прием', donation: 'Дарение', site: 'Сайт / технически проблем', other: 'Друго' },
    consent: 'Съгласен/съгласна съм данните ми да се използват само за отговор на това запитване.',
    privacy: 'Лични данни', send: 'Изпрати', sending: 'Изпращане…',
    ok: 'Благодарим! Съобщението е изпратено — ще ви отговорим скоро.', again: 'Ново съобщение',
    err: 'Съобщението не беше изпратено. Опитайте отново или пишете на', rate: 'Изпратихте няколко съобщения за кратко време. Опитайте след малко.',
    invalid: 'Проверете името, имейла и съобщението.',
  },
  en: {
    h: 'Write to us', sub: 'We will reply to the e-mail you give, usually within two working days.',
    name: 'Full name', email: 'E-mail', phone: 'Phone', opt: 'optional', topic: 'Topic', msg: 'Message',
    topics: { general: 'General question', admission: 'Admission', donation: 'Donation', site: 'Website / technical problem', other: 'Other' },
    consent: 'I agree that my data will be used only to reply to this enquiry.',
    privacy: 'Privacy', send: 'Send', sending: 'Sending…',
    ok: 'Thank you! Your message has been sent — we will reply soon.', again: 'New message',
    err: 'The message could not be sent. Please try again or write to', rate: 'You sent several messages in a short time. Please try again later.',
    invalid: 'Please check your name, e-mail and message.',
  },
};

// Контактна форма → /api/kontakt → писмо от eis@ до tech@ (Reply-To = подателя)
export default function ContactForm({ lang = 'bg', email, topic = 'general' }: { lang?: 'bg' | 'en'; email: string; topic?: string }) {
  const t = T[lang];
  const [t0, setT0] = useState(0);
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  useEffect(() => { setT0(Date.now()); }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState('sending'); setMsg('');
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'), email: f.get('email'), phone: f.get('phone'), topic: f.get('topic'),
          message: f.get('message'), consent: f.get('consent') === 'on', website: f.get('website'), t: t0, lang,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (j.ok) { setState('ok'); return; }
      setState('error');
      setMsg(j.error === 'rate' ? t.rate : j.error === 'invalid' ? t.invalid : '');
    } catch {
      setState('error'); setMsg('');
    }
  }

  if (state === 'ok') {
    return (
      <div className="cf cf-done" role="status">
        <span className="cf-tick" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>
        <p>{t.ok}</p>
        <button type="button" className="btn btn-ghost" onClick={() => { setState('idle'); setT0(Date.now()); }}>{t.again}</button>
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={submit} noValidate={false}>
      <div className="cf-head">
        <h2>{t.h}</h2>
        <p className="muted">{t.sub}</p>
      </div>
      <div className="cf-grid">
        <label className="cf-f">
          <span>{t.name}</span>
          <input name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label className="cf-f">
          <span>{t.email}</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
        <label className="cf-f">
          <span>{t.phone} <i>({t.opt})</i></span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </label>
        <label className="cf-f">
          <span>{t.topic}</span>
          <select name="topic" defaultValue={topic}>
            {Object.entries(t.topics).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label className="cf-f cf-wide">
          <span>{t.msg}</span>
          <textarea name="message" required minLength={5} maxLength={5000} rows={6} />
        </label>
        {/* капан за ботове — скрито за хората */}
        <label className="cf-hp" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="cf-consent">
        <input type="checkbox" name="consent" required />
        <span>{t.consent} <a href="/za-nas/zashtita-na-lichnite-danni" target="_blank" rel="noopener">{t.privacy}</a></span>
      </label>
      {state === 'error' && (
        <p className="cf-err" role="alert">{msg || <>{t.err} <a href={`mailto:${email}`}>{email}</a>.</>}</p>
      )}
      <button type="submit" className="btn btn-dark cf-send" disabled={state === 'sending'}>
        {state === 'sending' ? t.sending : t.send}
      </button>
    </form>
  );
}
