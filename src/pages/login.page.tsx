import type { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from 'components/Button';
import { BackgroundContext } from 'components/Container';
import FlashNotice from 'components/FlashNotice';
import Input from 'components/Input';
import useSession from 'hooks/useSession';
import { login } from 'services/user';
interface FormInput {
  email: string;
  password: string;
}

const validateForm = (formInput: FormInput) => {
  const errors = [];

  if (!formInput.email) {
    errors.push("Email can't be blank");
  }
  if (!formInput.password) {
    errors.push("Password can't be blank");
  }

  return errors;
};

const Login: NextPage = () => {
  const router = useRouter();
  const { user } = useSession({ redirect: false });

  const [formInput, setformInput] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formSubmitted, setformSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const { setBgUrl } = useContext(BackgroundContext);

  useEffect(() => {
    setBgUrl('/auth-background.svg');
  }, [setBgUrl]);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

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

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setformSubmitted(true);

    const errors = validateForm(formInput);

    if (errors.length) {
      return setFormErrors(errors);
    }

    setFormLoading(true);

    login(formInput.email, formInput.password)
      .then(() => router.push('/'))
      .catch(() => {
        setFormErrors(['Invalid Credentials']);
        setFormLoading(false);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-80 text-center text-gray-400">
        <div className="w-40 h-10 mx-auto mb-4 relative">
          <Image src="/nimble.svg" alt="Nimble Logo" layout="fill" />
        </div>
        <p className="mb-8">Sign in to Nimble</p>
        <FlashNotice title="Error" messages={formErrors} type="warning" />
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
          <div className="relative">
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <Link href="/password-reset">
              <a className="absolute bottom-5 right-4 text-sm text-gray-400">
                Forgot?
              </a>
            </Link>
          </div>
          <Button label="Sign in" disabled={formLoading} />
        </form>
      </div>
    </div>
  );
};

export default Login;
