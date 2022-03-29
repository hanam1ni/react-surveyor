import { useRouter } from 'next/router';

export const mockUseRouter = () => {
  const push = jest.fn();
  useRouter.mockImplementation(() => ({ push }));

  return { push };
};
