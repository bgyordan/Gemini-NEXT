'use client';

import { useMemo, useState } from 'react';
import { TEAM, initials } from './teamData';

const TABS = [
  { id: 'all', label: 'Всички' },
  ...TEAM.map((g) => ({ id: g.label, label: g.label })),
];

export default function TeamBrowser() {
  const [tab, setTab] = useState('all');
  const [q, setQ] = useState('');

  const groups = useMemo(() => {
    const query = q.trim().toLowerCase();
    return TEAM
      .filter((g) => tab === 'all' || g.label === tab)
      .map((g) => ({
        ...g,
        members: g.members.filter(
          (m) =>
            query === '' ||
            m.name.toLowerCase().includes(query) ||
            m.role.toLowerCase().includes(query)
        ),
      }))
      .filter((g) => g.members.length > 0);
  }, [tab, q]);

  const shown = groups.reduce((n, g) => n + g.members.length, 0);

  return (
    <>
      <div className="team-controls">
        <div className="team-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Търсене по име или роля…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Търсене в екипа"
          />
          {q && (
            <button className="clear" onClick={() => setQ('')} aria-label="Изчисти">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="team-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`team-tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="team-empty">
          Няма съвпадения за „{q}“. Опитайте друго име или роля.
        </div>
      ) : (
        groups.map((group, gi) => (
          <section className="team-section" key={group.label}>
            <div className="team-head">
              <span className="team-label">{group.label.toUpperCase()}</span>
              <span className="team-count">{group.members.length}</span>
            </div>
            <div className={`team-grid ${group.compact ? 'compact' : ''}`}>
              {group.members.map((m) => (
                <div className="member" key={m.name}>
                  <span className={`avatar t-${m.tone}`}>{initials(m.name)}</span>
                  <span className="m-name">{m.name}</span>
                  <span className="m-role">{m.role}</span>
                </div>
              ))}
            </div>
            {gi < groups.length - 1 && <div className="team-divider" />}
          </section>
        ))
      )}
    </>
  );
}
