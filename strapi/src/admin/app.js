import PluginIcon from './extensions/AnalyticsPage/icon.jsx';
//import Analytics from './extensions/AnalyticsPage/index.jsx';
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
  app.addMenuLink({
    to: '/analytics/',
    icon: PluginIcon,
    intlLabel: {
      id: 'msy.analytics',
      defaultMessage: 'Analytics',
    },
    Component: async () => {
      const component = await import('./extensions/AnalyticsPage/index.jsx');

      return component;
    },
    permissions: [], // permissions to apply to the link
  });
};

export default {
  config,
  bootstrap,
};
