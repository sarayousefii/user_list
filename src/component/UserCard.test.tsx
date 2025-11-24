import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from './UserCard';
import '@testing-library/jest-dom';

const mockPerson = {
  id: 1,
  firstName: 'Sara',
  lastName: 'Yousefi',
  date: new Date('2025-01-01'),
  image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
};

describe('UserCard Component', () => {
  test('renders user name correctly', () => {
    render(<UserCard person={mockPerson} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Sara Yousefi')).toBeInTheDocument();
  });

  test('calls onEdit when Edit button clicked', () => {
    const onEditMock = jest.fn();
    render(<UserCard person={mockPerson} onEdit={onEditMock} onDelete={() => {}} />);
    fireEvent.click(screen.getByText(/ویرایش/i));
    expect(onEditMock).toHaveBeenCalledWith(mockPerson);
  });

  test('calls onDelete when Delete button clicked', () => {
    const onDeleteMock = jest.fn();
    render(<UserCard person={mockPerson} onEdit={() => {}} onDelete={onDeleteMock} />);
    fireEvent.click(screen.getByText(/حذف/i));
    expect(onDeleteMock).toHaveBeenCalledWith(mockPerson.id);
  });
});
