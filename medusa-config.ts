import { loadEnv, defineConfig, MedusaModuleProviderType, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Importing necessary modules
const path = require("path");

// Set Redis URL
const REDIS_URL = process.env.REDIS_URL || "redis://cache";
const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

// Set PostgreSQL URL
const POSTGRES_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL || "postgres://username:password@localhost:5432/medusa-docker";

module.exports = defineConfig({
  // plugins: [
  //   {
  //     resolve: "node_modules/@medusajs/file-local",
  //     options: {
  //       upload_dir: "static",
  //       backend_url: BACKEND_URL
  //     },
  //   }
  // ],

  modules: [
    {
      key: Modules.FILE,
      resolve: "@medusajs/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-local",
            id: "local",
            options: {
              upload_dir: "static",
              backend_url: `${BACKEND_URL}/static`,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
  ],
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
    redisPrefix: process.env.REDIS_URL || "kappal:",
    databaseDriverOptions: { ssl: false },
    sessionOptions: {
      name: process.env.SESSION_NAME || "kappal",
    },
    workerMode: process.env.WORKER_MODE === "shared" || process.env.WORKER_MODE === "worker" || process.env.WORKER_MODE === "server" ? process.env.WORKER_MODE : "shared",
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },

  },
  admin: {
    path: "/dashboard",
    backendUrl: BACKEND_URL
  },

})