import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Frontend Tests', () => {
  it('renders the app component', () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello, World!/i);
    expect(linkElement).toBeInTheDocument();
  });
});

