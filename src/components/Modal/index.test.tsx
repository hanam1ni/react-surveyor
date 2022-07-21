import { fireEvent, render } from '@testing-library/react';

import Modal from 'components/Modal';

describe('Modal', () => {
  describe('given show is true', () => {
    it('displays overlay and modal', () => {
      const Greeting = () => <div>Welcome John Doe</div>;

      const { getByRole, getByTestId, getByText } = render(
        <Modal show={true}>
          <Greeting />
        </Modal>
      );

      expect(getByTestId('modal-overlay')).toHaveClass('opacity-100 z-40');
      expect(getByRole('dialog')).toHaveClass('opacity-100 z-50');
      expect(getByText('Welcome John Doe')).toBeInTheDocument();
    });
  });

  describe('given show is false', () => {
    it('hides overlay and modal', () => {
      const Greeting = () => <div>Welcome John Doe</div>;

      const { getByRole, getByTestId, getByText } = render(
        <Modal show={false}>
          <Greeting />
        </Modal>
      );

      expect(getByTestId('modal-overlay')).toHaveClass('opacity-0 -z-50');
      expect(getByRole('dialog')).toHaveClass('opacity-0 -z-50');
      expect(getByText('Welcome John Doe')).toBeInTheDocument();
    });
  });

  describe('when clicking on the overlay', () => {
    it('calls onOverlayClick callback', () => {
      const Greeting = () => <div>Welcome John Doe</div>;
      const onOverlayClick = jest.fn();

      const { getByTestId } = render(
        <Modal show={false} onOverlayClick={onOverlayClick}>
          <Greeting />
        </Modal>
      );

      fireEvent.click(getByTestId('modal-overlay'));

      expect(onOverlayClick).toBeCalled();
    });
  });
});
