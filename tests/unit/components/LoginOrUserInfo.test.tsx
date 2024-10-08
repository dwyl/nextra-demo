import { render, screen } from "@testing-library/react";
import LoginOrUserInfo from "@/src/components/LoginOrUserInfo";
import { DefaultSession } from "next-auth";
import { fireEvent } from "@testing-library/react";
import { signOut, signIn } from "next-auth/react";

// Mocking `signIn` and `signOut` API calls
jest.mock("next-auth/react", () => {
  return {
    signIn: jest.fn(() => "signed in"),
    signOut: jest.fn(() => "signed out"),
  };
});

describe("LoginOrUserInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('shows "Sign In" button when no session is found', () => {
    const session: DefaultSession = {
      expires: "",
    };

    render(<LoginOrUserInfo session={session} />);
    const button = screen.getByRole("button", { name: "SIGN IN" });
    button.click();
    expect(button).toBeDefined();
  });

  it('shows "Sign Out" button and user info when session is found', () => {
    const username = "AlpheyaUsername";
    const session: DefaultSession = {
      user: {
        name: username,
      },
      expires: Date.now().toString(),
    };

    render(<LoginOrUserInfo session={session} />);
    const button = screen.getByRole("button", { name: "SIGN OUT" });
    button.click();
    expect(button).toBeDefined();
    expect(screen.getByText(username)).toBeDefined();
  });
});
