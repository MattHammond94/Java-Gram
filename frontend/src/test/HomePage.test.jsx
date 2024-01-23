import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";

import HomePage from "../pages/HomePage";

describe ('HomePage', () => {
  it('Should render Log In and Sign Up buttons', () => {
    const mockStore = configureStore();
    const store = mockStore({
      auth: {
        userInfo: null,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    const logInButton = getByText('Log In');
    console.log(logInButton)
    expect(logInButton).toBeInTheDocument();
  
    const signUpButton = getByText('Sign Up');
    console.log(signUpButton);
    expect(signUpButton).toBeInTheDocument();
  });
});