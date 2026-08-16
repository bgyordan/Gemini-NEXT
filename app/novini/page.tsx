import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsClient from './NewsClient';
import { getAllNews } from './newsData';
import './novini.css';

export const metadata = {
  title: 'Новини и Блог — ЦСОП Варна',
  description:
    'Актуални събития, празници, терапевтични практики, съобщения и вдъхновяващи моменти от ежедневието на децата и екипа в ЦСОП – Варна.',
};

export default function NewsArchivePage() {
  const allPosts = getAllNews();

  return (
    <>
      <Header />
      <PageHero
        kicker="Блог и новини"
        title="Моменти, които разказват"
        intro="Актуални събития, творчески постижения, съобщения и вдъхновяващи истории от живота на децата и специалистите в ЦСОП – Варна."
        tone="em"
      />

      <NewsClient initialPosts={allPosts} />

      <Footer />
    </>
  );
}
