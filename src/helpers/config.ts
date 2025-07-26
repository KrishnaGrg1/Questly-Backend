import { config } from 'dotenv';

config();

interface iEnv {
  [key: string]: string | undefined;
}

// Validate required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_Password',
  'PORT',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USERNAME',
  'SMTP_PASSWORD'
];

// Check for missing environment variables
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => {
    console.error(`   - ${envVar}`);
  });
  console.error('Please check your .env file and ensure all required variables are set.');
  process.exit(1);
}

const env = process.env as iEnv;
export default env;
