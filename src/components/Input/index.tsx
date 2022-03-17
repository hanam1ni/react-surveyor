import React from 'react';

interface ComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: ComponentProps) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold">{label}</label>
      <input
        className="w-full bg-gray-400 bg-opacity-30 rounded-lg px-2 py-4"
        {...props}
      ></input>
    </div>
  );
};

export default Input;
