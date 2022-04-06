import { useRouter } from 'next/router';

export const mockUseRouter = () => {
  const push = jest.fn();
  const mockedUseRouter = useRouter as jest.Mock;

  mockedUseRouter.mockImplementation(() => ({ push }));

  return { push };
};
