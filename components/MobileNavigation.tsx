'use client';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { Separator } from './ui/separator';
import { navitems } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { SingoutUser } from '@/lib/actions/user.actions';

interface Props {
  accountId: string;
  avatar: string;
  email: string;
  fullname: string;
}
function MobileNavigation({ accountId, avatar, email, fullname }: Props) {
  const [open, setopen] = useState(false);
  const pathname = usePathname();

  return (
    <header className='mobile-header'>
      <Image
        src={'/assets/icons/logo-full-brand.svg'}
        alt='logo'
        width={120}
        height={52}
        className='h-auto'
      ></Image>
      <Sheet open={open} onOpenChange={setopen}>
        <SheetTrigger>
          <Image
            src={'/assets/icons/menu.svg'}
            alt='search'
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className='shad-sheet h-screen px-3'>
          <SheetTitle>
            <div className='header-user'>
              {' '}
              <Image
                src={avatar}
                alt='avatar'
                width={44}
                height={44}
                className='header-user-avatar'
              ></Image>
              <div className='sm:hidden lg:block'>
                <p className='subtitle-2 capitalize'>{fullname}</p>
                <p className='caption'>{email}</p>
              </div>
            </div>
            <Separator className='mb-4 bg-light-200/20' />
          </SheetTitle>
          <nav className='mobile-nav'>
            {' '}
            <ul className='mobile-nav-list'>
              {navitems.map(({ icon, name, url }) => (
                <Link key={name} href={url} className='lg:w-full'>
                  <li
                    className={cn(
                      'mobile-nav-item',
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
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className='mb-4 bg-light-200/20' />
          <div className='flex flex-col justify-between gap-6 pb-5'>
            Filenameuploader
            <Button
              className='mobile-sign-out-button'
              type='submit'
              onClick={SingoutUser}
            >
              <Image
                src='/assets/icons/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default MobileNavigation;
