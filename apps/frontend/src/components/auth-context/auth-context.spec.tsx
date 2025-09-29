import { render } from '@testing-library/react';

import AuthContext from './auth-context';

describe('AuthContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthContext />);
    expect(baseElement).toBeTruthy();
  });
});
