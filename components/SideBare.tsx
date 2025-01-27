'use client';
import { avatarPlaceholderUrl, navitems } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SideBare = () => {
  const pathname = usePathname();
  return (
    <aside className='sidebar'>
      <Link href={'/'}>
        {' '}
        <Image
          src='/assets/icons/logo-full-brand.svg'
          alt='src'
          width={160}
          height={50}
          className='hidden h-auto lg:block'
        />{' '}
        <Image
          src='/assets/icons/logo-brand.svg'
          alt='src'
          width={52}
          height={52}
          className='lg:hidden'
        />
      </Link>
      <nav className='sidebar-nav'>
        {' '}
        <ul className='flex flex-1 flex-col gap-6'>
          {navitems.map(({ icon, name, url }) => (
            <Link key={name} href={url} className='lg:w-full'>
              <li
                className={cn(
                  'sidebar-nav-item',
                  pathname === url && 'shad-active',
                )}
              >
                <Image
                  alt={name}
                  src={icon}
                  width={24}
                  height={24}
                  className={cn(
                    'nav-icon',
                    pathname === url && 'nav-icon-active',
                  )}
                />
                <p className='hidden lg:block'>{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src='/assets/images/files-2.png'
        alt='logo'
        width={506}
        height={418}
        className='w-full'
      ></Image>
      <div className='sidebar-user-info'>
        <Image
          src={avatarPlaceholderUrl}
          alt='avatar'
          className='sidebar-user-avatar'
          width={44}
          height={44}
        ></Image>
      </div>
    </aside>
  );
};

export default SideBare;
