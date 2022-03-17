import React from 'react';

interface ComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: ComponentProps) => {
  return (
    <label className="block">
      <span className="block mb-2 text-sm font-semibold">{label}</span>
      <input
        className="w-full bg-gray-400 bg-opacity-30 rounded-lg px-2 py-4"
        {...props}
      />
    </label>
  );
};

export default Input;
