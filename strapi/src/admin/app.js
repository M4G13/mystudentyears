import PluginIcon from './extensions/AnalyticsPage/icon.jsx';
import Analytics from './extensions/AnalyticsPage/index.jsx';

const config = {
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
