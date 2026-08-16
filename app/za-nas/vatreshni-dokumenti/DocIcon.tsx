export default function DocIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="m9 12 2 2 4-4" /></>,
    alert: <><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></>,
    home: <><path d="M3 11l9-7 9 7M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    handshake: <><path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.3-3.3a2 2 0 0 0 .3-2.4l-2.8-4.6" /><path d="m14 6-3-1-6 2-3 4 3 3 2-1 3 3" /></>,
    scroll: <><path d="M8 3h9a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6" /><path d="M4 6a2 2 0 0 1 4 0v0M9 8h6M9 12h6M9 16h4" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? paths.scroll}
    </svg>
  );
}
