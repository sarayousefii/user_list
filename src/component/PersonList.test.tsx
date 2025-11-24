import { render, screen, fireEvent } from '@testing-library/react';
import PersonList from './PersonList';
import { Iperson } from '../AppTypes';

const mockUsers: Iperson[] = [
  { id: 1, firstName: 'Sara', lastName: 'Yousefi', date: new Date(), image: '' },
  { id: 2, firstName: 'Ali', lastName: 'Ahmadi', date: new Date(), image: '' },
];

describe('PersonList Component', () => {
  test('renders empty message when no users', () => {
    render(<PersonList persons={[]} setPersons={jest.fn()} onEdit={jest.fn()} />);
    expect(screen.getByText(/لیست خالی است/i)).toBeInTheDocument();
  });

  test('renders users correctly', () => {
    render(<PersonList persons={mockUsers} setPersons={jest.fn()} onEdit={jest.fn()} />);
    expect(screen.getByText('Sara Yousefi')).toBeInTheDocument();
    expect(screen.getByText('Ali Ahmadi')).toBeInTheDocument();
  });

  test('deletes a user', () => {
    let persons: Iperson[] = [...mockUsers];

    const setPersons: React.Dispatch<React.SetStateAction<Iperson[]>> = (value) => {
      if (typeof value === 'function') {
        persons = value(persons);
      } else {
        persons = value;
      }
    };

    render(<PersonList persons={persons} setPersons={setPersons} onEdit={jest.fn()} />);
    
    // Mock window.confirm
    jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

    fireEvent.click(screen.getAllByText(/حذف/i)[0]);
    expect(persons.length).toBe(1);
  });
});
