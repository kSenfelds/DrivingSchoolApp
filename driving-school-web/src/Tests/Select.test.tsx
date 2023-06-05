import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../Components/Select';

describe('Select', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const label = 'Select Option';
  const onChange = jest.fn();
  const selectedValue = 'Option 2';

  beforeEach(() => {
    render(
      <Select
        options={options}
        label={label}
        onChange={onChange}
        selectedValue={selectedValue}
      />
    );
  });

  test('renders select options', () => {
    const selectElement = screen.getByLabelText(label);
    expect(selectElement).toBeInTheDocument();

    options.forEach((option) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test('calls onChange when option is selected', () => {
    const selectElement = screen.getByLabelText(label);
    fireEvent.change(selectElement, { target: { value: 'Option 3' } });

    expect(onChange).toHaveBeenCalledWith('Option 3');
  });

  test('displays selected value', () => {
    const selectElement = screen.getByLabelText(label);
    expect(selectElement).toHaveValue(selectedValue);
  });
});