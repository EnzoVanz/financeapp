export function validateEnv() {
  const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'FRONTEND_URL'
  ];

  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  // Validate URL format
  try {
    new URL(process.env.DATABASE_URL!);
    new URL(process.env.FRONTEND_URL!);
  } catch (error) {
    throw new Error('Invalid URL format in environment variables');
  }

  // Validate JWT secret length
  if (process.env.JWT_SECRET!.length < 32) {
    throw new Error('JWT_SECRET should be at least 32 characters long');
  }
} 