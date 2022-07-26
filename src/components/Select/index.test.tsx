import { fireEvent, render } from '@testing-library/react';

import Select from '.';

describe('Select', () => {
  it('renders the select input with options', () => {
    const options = [
      {
        label: 'First option',
        value: '1',
      },
      {
        label: 'Second option',
        value: '2',
      },
    ];

    const { container, getByText } = render(
      <Select options={options} className="select" />
    );

    fireEvent.keyDown(container.querySelector('.select')!, {
      key: 'ArrowDown',
    });

    expect(getByText('First option')).toBeInTheDocument();
    expect(getByText('Second option')).toBeInTheDocument();
  });
});
