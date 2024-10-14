export default {
  index: {
    title: "Homepage",
    type: "page",
    display: "hidden"
  },
  reference_api: {
    title: "API Reference",
    type: "page",
    private: {
      private: true,
      roles: ["user"]
    }
  },
  about: {
    title: "About Us",
    type: "page"
  },
  contact: {
    title: "Contact Us",
    type: "page"
  },
  github_link: {
    title: "Github",
    href: "https://github.com/shuding/nextra",
    newWindow: true,
    display: "hidden"
  }
};
