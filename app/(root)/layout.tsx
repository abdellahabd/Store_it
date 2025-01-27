import Header from '@/components/Header';
import SideBare from '@/components/SideBare';
import React from 'react';

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex h-screen'>
      {' '}
      <SideBare />{' '}
      <section className='flex h-full flex-1 flex-col'>
        {' '}
        MobileNavigation <Header />{' '}
        <div className='main-content'>{children}</div>{' '}
      </section>
    </main>
  );
}

export default layout;
