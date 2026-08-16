import { createSupabaseServer } from '../../lib/supabaseServer';
import { redirect } from 'next/navigation';
import AdminClient from './AdminClient';
import './admin.css';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/vhod');

  // Проверка дали е редактор
  const { data: profile } = await supabase
    .from('staff_profiles')
    .select('first_name, last_name, role')
    .eq('user_id', user.id)
    .single();

  const isEditor =
    profile && ['admin', 'director', 'zdud', 'secretary'].includes(profile.role);

  if (!isEditor) {
    return (
      <div className="admin-denied">
        <h1>Нямате достъп</h1>
        <p>Този раздел е само за редактори на сайта.</p>
        <a href="/">← Обратно към сайта</a>
      </div>
    );
  }

  const name = `${profile.first_name} ${profile.last_name}`;

  return <AdminClient userName={name} />;
}
