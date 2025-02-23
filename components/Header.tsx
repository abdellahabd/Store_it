import Image from 'next/image';
import { Button } from './ui/button';
import { SingoutUser } from '@/lib/actions/user.actions';
import FileUploader from './FileUploader';

const Header = () => {
  return (
    <header className='header'>
      Search
      <div className='header-wrapper'>
        <FileUploader />{' '}
        <form
          action={async () => {
            'use server';
            await SingoutUser();
          }}
        >
          {' '}
          <Button className='sign-out-button' type='submit'>
            <Image
              src='/assets/icons/logout.svg'
              alt='logout'
              width={24}
              height={24}
              className='w-6'
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
