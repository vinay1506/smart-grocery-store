
// Environment variables utility

// This helper safely gets environment variables with fallbacks
export const getEnvVariable = (key: string, defaultValue: string = ''): string => {
  // For Vite applications, environment variables are prefixed with VITE_
  const envKey = `VITE_${key}`;
  return import.meta.env[envKey] || defaultValue;
};

// Database connection environment variables
export const dbConfig = {
  host: getEnvVariable('DB_HOST', 'localhost'),
  user: getEnvVariable('DB_USER', 'root'),
  password: getEnvVariable('DB_PASSWORD', ''),
  database: getEnvVariable('DB_NAME', 'grocery_store'),
};
