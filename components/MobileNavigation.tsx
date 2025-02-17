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

interface Props {
  accountId: string;
  avatar: string;
  email: string;
  fullname: string;
}
function MobileNavigation({ accountId, avatar, email, fullname }: Props) {
  const [open, setopen] = useState(false);

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
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default MobileNavigation;
