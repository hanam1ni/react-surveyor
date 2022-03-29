import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from 'components/Button';
import ErrorFlash from 'components/ErrorFlash';
import Input from 'components/Input';
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

  const [formInput, setformInput] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formSubmitted, setformSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

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
    <div className="w-80 text-center text-gray-400">
      <div className="w-40 h-10 mx-auto mb-4 relative">
        <Image src="/nimble.svg" alt="Nimble Logo" layout="fill" />
      </div>
      <p className="mb-8">Sign in to Nimble</p>
      <ErrorFlash errors={formErrors} />
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
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <Button label="Sign in" disabled={formLoading} />
      </form>
    </div>
  );
};

export default Login;
