import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import SideBare from '@/components/SideBare';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react';

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const current_user = await getCurrentUser();
  if (!current_user) redirect('/sign-in');
  return (
    <main className='flex h-screen'>
      {' '}
      <SideBare {...current_user} />{' '}
      <section className='flex h-full flex-1 flex-col'>
        {' '}
        <MobileNavigation {...current_user} /> <Header />{' '}
        <div className='main-content'>{children}</div>{' '}
      </section>
    </main>
  );
}

export default layout;
