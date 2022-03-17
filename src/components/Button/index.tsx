import React from 'react';

interface ComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...props }: ComponentProps) => {
  return (
    <button
      className="w-full py-4 bg-white text-black font-semibold rounded-lg disabled:opacity-20 disabled:pointer-events-none hover:bg-indigo-800 hover:text-white focus:bg-indigo-900 focus:text-white transition-all duration-150"
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
