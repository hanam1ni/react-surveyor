import { useRouter } from 'next/router';

export const mockUseRouter = (options = {}) => {
  const push = jest.fn();
  const mockedUseRouter = useRouter as jest.Mock;

  mockedUseRouter.mockImplementation(() => ({ push, ...options }));

  return { push };
};
