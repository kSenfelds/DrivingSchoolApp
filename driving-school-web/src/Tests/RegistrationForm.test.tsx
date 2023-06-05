import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { RegistrationForm } from '../Components/RegistrationForm';

describe('RegistrationForm', () => {
  const mockOnSave = jest.fn();

  beforeEach(() => {
    mockOnSave.mockClear();
  });

  test('renders form fields', () => {
    render(<RegistrationForm onSave={mockOnSave} />);
  
    // Assert form fields are rendered
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Training Category')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Year of Birth')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('shows error messages when form fields are empty', async () => {
    render(<RegistrationForm onSave={mockOnSave} />);

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // Assert error messages are shown
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Last Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Incorrect email')).toBeInTheDocument();
    expect(await screen.findByText('Incorrect phone number')).toBeInTheDocument();
    expect(await screen.findByText('City is required')).toBeInTheDocument();
    expect(await screen.findByText('Adress is required')).toBeInTheDocument();
    expect(await screen.findByText('Incorrect yearOfBirth')).toBeInTheDocument();
  });
  test('submits form data', async () => {
    const mockOnSave = jest.fn();
    render(<RegistrationForm onSave={mockOnSave} />);
  
    // Fill form fields
    fireEvent.input(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.input(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'testEmail@gmail.com' } });
    fireEvent.input(screen.getByLabelText('Phone Number'), { target: { value: '123456789' } });
    fireEvent.input(screen.getByLabelText('City'), { target: { value: 'TestCity' } });
    fireEvent.input(screen.getByLabelText('Address'), { target: { value: 'TestAddress' } });
    fireEvent.input(screen.getByLabelText('Year of Birth'), { target: { value: '1990' } });
    fireEvent.input(screen.getByLabelText('Training Category'), { target: { value: 'A' } });
  
    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  
    // Assert form data is submitted
    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'John',
      lastName: 'Doe',
      email: 'testEmail@gmail.com',
      phoneNumber: '123456789',
      city: 'TestCity',
      address: 'TestAddress',
      yearOfBirth: '1990',
      trainingCategory: 'A',
      dateOfRegistration: expect.any(Date),
    });

});
});