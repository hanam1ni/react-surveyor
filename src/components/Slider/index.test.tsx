import { fireEvent, render } from '@testing-library/react';

import Slider from '.';

const ARROW_LEFT_KEYCODE = 37;
const ARROW_RIGHT_KEYCODE = 39;

describe('Slider', () => {
  describe('given labels', () => {
    test('renders slider with label for each step', () => {
      const { getByRole, getByText, queryByText } = render(
        <Slider max={2} labels={['First label', 'Second label']} />
      );

      const slider = getByRole('slider');

      expect(getByText('First label')).toBeInTheDocument();
      expect(queryByText('Second label')).not.toBeInTheDocument();

      fireEvent.keyDown(slider, {
        keyCode: ARROW_RIGHT_KEYCODE,
        charCode: ARROW_RIGHT_KEYCODE,
      });

      expect(queryByText('First label')).not.toBeInTheDocument();
      expect(getByText('Second label')).toBeInTheDocument();
    });
  });

  describe('when changing slider value', () => {
    test('calls given onChange callback with index', () => {
      const onChange = jest.fn();

      const { getByRole } = render(<Slider max={3} onChange={onChange} />);

      const slider = getByRole('slider');

      fireEvent.keyDown(slider, {
        keyCode: ARROW_RIGHT_KEYCODE,
      });

      fireEvent.keyDown(slider, {
        keyCode: ARROW_LEFT_KEYCODE,
      });

      expect(onChange).toHaveBeenNthCalledWith(1, 1);
      expect(onChange).toHaveBeenNthCalledWith(2, 0);
    });
  });
});
