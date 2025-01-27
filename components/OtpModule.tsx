import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Image from 'next/image';
import { Button } from './ui/button';
import { verfaySecrut } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

function OtpModule({
  email,
  accountId,
}: {
  email: string;
  accountId: string | null;
}) {
  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setisOpen] = useState(true);
  const [password, setPassword] = useState('');
  const router = useRouter();
  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const sessionId = await verfaySecrut({ accountId, password });
      if (sessionId) router.push('/');
    } catch (error) {}
    setisLoading(false);
  };
  const handleResendOtp = async () => {};
  return (
    <AlertDialog open={isOpen} onOpenChange={setisOpen}>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader className='relative flex justify-center'>
          <AlertDialogTitle className='h2 text-center'>
            Enter Your OTP
            <Image
              src='/assets/icons/close-dark.svg'
              alt='close'
              width={20}
              height={20}
              onClick={() => setisOpen(false)}
              className='otp-close-button'
            />
          </AlertDialogTitle>
          <AlertDialogDescription className='subtitle-2 text-center text-light-100'>
            We&apos;ve sent a code to{' '}
            <span className='pl-1 text-brand'>{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className='shad-otp'>
            <InputOTPSlot index={0} className='shad-otp-slot' />
            <InputOTPSlot index={1} className='shad-otp-slot' />
            <InputOTPSlot index={2} className='shad-otp-slot' />
            <InputOTPSlot index={3} className='shad-otp-slot' />
            <InputOTPSlot index={4} className='shad-otp-slot' />
            <InputOTPSlot index={5} className='shad-otp-slot' />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className='flex w-full flex-col gap-4'>
            <AlertDialogAction
              onClick={submitHandler}
              className='shad-submit-btn h-12'
              type='button'
            >
              Submit
              {isLoading && (
                <Image
                  src='/assets/icons/loader.svg'
                  alt='loader'
                  width={24}
                  height={24}
                  className='ml-2 animate-spin'
                />
              )}
            </AlertDialogAction>

            <div className='subtitle-2 mt-2 text-center text-light-100'>
              Didn&apos;t get a code?
              <Button
                type='button'
                variant='link'
                className='pl-1 text-brand'
                onClick={handleResendOtp}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default OtpModule;
