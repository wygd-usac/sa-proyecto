import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sah.app',
  appName: 'coreui-free-angular-admin-template',
  webDir: 'dist/coreui-free-angular-admin-template',
  bundledWebRuntime: false,
  "server": {
	"androidScheme": "https",
	 "cleartext": true,
	"url": "34.132.139.69:5000"
	},
  
};

export default config;
