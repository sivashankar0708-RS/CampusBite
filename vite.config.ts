import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          menu: path.resolve(__dirname, 'menu.html'),
          cart: path.resolve(__dirname, 'cart.html'),
          checkout: path.resolve(__dirname, 'checkout.html'),
          orders: path.resolve(__dirname, 'orders.html'),
          tracking: path.resolve(__dirname, 'tracking.html'),
          profile: path.resolve(__dirname, 'profile.html'),
          login: path.resolve(__dirname, 'login.html'),
          register: path.resolve(__dirname, 'register.html'),
          adminDashboard: path.resolve(__dirname, 'admin/dashboard.html'),
          adminOrders: path.resolve(__dirname, 'admin/orders.html'),
          adminMenu: path.resolve(__dirname, 'admin/menu.html'),
          adminReports: path.resolve(__dirname, 'admin/reports.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

