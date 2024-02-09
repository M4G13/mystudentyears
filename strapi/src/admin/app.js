import favicon from "../../favicon.png";
import msyLogoSmall from "../../msyLogoSmall.png";
import msyLogoLarge from "../../msyLogoLarge.png";

const config = {
  locales: ["en"],
  auth: {
    logo: msyLogoLarge,
  },
  menu: {
    logo: msyLogoSmall,
  },
  head: {
    favicon: favicon,
  },
  notifications: {
    releases: false,
  },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
