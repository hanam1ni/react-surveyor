import type { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import BackNavigation from 'components/BackNavigation';
import Button from 'components/Button';
import { BackgroundContext } from 'components/Container';
import FlashNotice from 'components/FlashNotice';
import Input from 'components/Input';
import useSession from 'hooks/useSession';
import { resetPassword } from 'services/user';
import { StoreContext } from 'store';

interface FormInput {
  email: string;
}

const validateForm = (formInput: FormInput) => {
  const errors = [];

  if (!formInput.email) {
    errors.push("Email can't be blank");
  }

  return errors;
};

const PasswordReset: NextPage = () => {
  const router = useRouter();
  useSession({ redirect: false });

  const [formInput, setformInput] = useState({ email: '' });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const { setBgUrl } = useContext(BackgroundContext);
  const {
    store: { userProfile },
  } = useContext(StoreContext);

  useEffect(() => {
    setBgUrl('/auth-background.svg');
  }, [setBgUrl]);

  useEffect(() => {
    if (userProfile) {
      router.push('/');
    }
  }, [userProfile, router]);

  useEffect(() => {
    if (!formSubmitted) {
      return;
    }

    const errors = validateForm(formInput);
    setFormErrors(errors);
  }, [formSubmitted, formInput]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setformInput({ ...formInput, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setFormSubmitted(true);
    setFormSuccess(false);

    const errors = validateForm(formInput);

    if (errors.length) {
      return setFormErrors(errors);
    }

    setFormLoading(true);

    const resetPasswordSucceed = () => {
      setFormSuccess(true);
      setFormErrors([]);
      setFormLoading(false);
    };

    const resetPasswordRejected = () => {
      setFormErrors(['Something went wrong. Please try again later']);
      setFormLoading(false);
    };

    resetPassword(formInput.email).then(
      resetPasswordSucceed,
      resetPasswordRejected
    );
  };

  return (
    <div className="h-full flex justify-center items-center text-gray-400">
      <BackNavigation path="/login" />
      <div className="w-80">
        <div className="w-80 text-center">
          <div className="w-40 h-10 mx-auto mb-4 relative">
            <Image src="/nimble.svg" alt="Nimble Logo" layout="fill" />
          </div>
        </div>
        <p className="mb-8 text-center">
          Enter your email to receive instructions for resetting your password.
        </p>
        <FlashNotice title="Error" messages={formErrors} type="warning" />
        {formSuccess && (
          <FlashNotice
            title="Check your email."
            messages={[
              "We've emailed you instructions to reset your password.",
            ]}
            type="success"
          />
        )}
        <form
          className="text-left text-gray-300 space-y-4"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
          />
          <Button
            label="Send Recovery Email"
            disabled={formLoading}
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
