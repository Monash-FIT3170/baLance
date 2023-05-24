import React from 'react';
import { render, screen } from '@testing-library/react';
import UnitPage from '../src/pages/UnitHomePage.jsx';

test('renders Unit Home Page', () => {
  render(<UnitPage />);
  
  // Verify the presence of the heading
  const headingElement = screen.getByText('Unit Home Page');
  expect(headingElement).toBeInTheDocument();
  
  // Add more assertions as needed for other elements and behaviors
});
