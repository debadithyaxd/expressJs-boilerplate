import z from "zod";

export const configSchema = z.object({
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  port: z.coerce.number().default(3000),
  databaseUrl: z.url(),
  redis: z.object({
    host: z.string().min(1).default('127.0.0.1'),
    port: z.coerce.number().default(6379),
    db: z.coerce.number().default(0),
  }),
  jwt: z.object({
    secret: z.string().min(32).default('default-secret-change-in-production'),
    expiresIn: z.string().default('7d'),
  }),
  bcryptRounds: z.coerce.number().int().default(12),
  rateLimit: z.object({
    windowMs: z.coerce.number().int().default(900000),
    maxRequests: z.coerce.number().int().default(100),
  }),
  logLevel: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info'),
  corsOrigin: z.string().default('http://localhost:3000'),
});

const parsed = configSchema.safeParse(process.env);

if(!parsed.success){
  console.error("❌ Invalid or missing environment variables:");
  console.log(parsed.error.message);
  process.exit(1)
}
const config = parsed.data;

export default config;