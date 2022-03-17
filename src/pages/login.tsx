import type { NextPage } from 'next';
import React, { useState } from 'react';
import Image from 'next/image';

import ErrorFlash from 'components/ErrorFlash';
import Input from 'components/Input';
import Button from 'components/Button';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<string[] | []>([]);

  const validateForm = () => {
    const errors = [];

    if (!email) {
      errors.push("Email can't be blank");
    }
    if (!password) {
      errors.push("Password can't be blank");
    }

    return errors;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const errors = validateForm();

    if (errors.length) {
      return setFormErrors(errors);
    }
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
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button label="Sign in" />
      </form>
    </div>
  );
};

export default Login;
