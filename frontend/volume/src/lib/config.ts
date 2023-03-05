interface Config {
  backendUrl: string;
}

export const config: Config = {
  backendUrl: ''
};

if (import.meta.env.VITE_APP_MODE === 'development') {
  // Use hardcoded backend URL in development mode
  config.backendUrl = 'http://localhost:3000';
}
else {
//   // Load backend URL from environment variable in production mode
//   import('../../config.json').then((data) => {
//     config.backendUrl = data.backendUrl;
//   }).catch((err) => {
// 	console.error('Failed to load config.json', err);
//   });
	config.backendUrl = import.meta.env.VITE_BACKEND_URL; // replaced the above code because vite doesn't support dynamic imports in production mode
}
