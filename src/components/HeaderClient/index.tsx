'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header'; // seu header atual

export default function HeaderClient() {
  const pathname = usePathname();

  // esconder quando estiver em /home ou qualquer rota dentro de /home
  if (pathname && pathname.startsWith('/home')) {
    return null;
  }

  return <Header />;
}