import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Галерия | ЦСОП – Варна',
  description:
    'Снимки и видео архив от събития, творчески ателиета, празници и учебния процес в ЦСОП – Варна.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
