import { render } from "@testing-library/react";
import App from "@/src/pages/_app";
import { type NextComponentType } from "next";
import { type Router } from "next/router";

describe("_app", () => {
  it('renders app component', () => {
    const comp: NextComponentType = () => {
        return null
      }
    const pageProps = {
        ssg: {
          session: {
            user: {
              name: "username",
              email: "email@email.com",
              image: "image_url",
              role: "user",
            },
            expires: "2024-08-01T23:21:31.337Z",
          },
        },
      }

    const app = <App {...{Component: comp, pageProps: pageProps, router: undefined as unknown as Router}} />
    render(app);
    expect(app).toBeDefined();
  });
});
