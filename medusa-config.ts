import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Importing necessary modules
const path = require("path");

// Set Redis URL
const REDIS_URL = process.env.REDIS_URL || "redis://cache";

// Set PostgreSQL URL
const POSTGRES_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL || "postgres://username:password@localhost:5432/medusa-docker";

module.exports = defineConfig({
  modules: [
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    // {
    //   resolve: "@medusajs/file-local",
    //   options: {
    //     upload_dir: "./uploads",
    //   },
    // },
    // {
    //   resolve: "@medusajs/admin",
    //   options: {
    //     autoRebuild: false,
    //     develop: {},
    //   },
    // },
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
    databaseDriverOptions: {},
    // databaseDriverOptions: process.env.NODE_ENV !== "development" ?
    //   { ssl: { rejectUnauthorized: false } } : {},
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
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  },
  
})

// // Define plugins used in the Medusa project
// const plugins = [
//   `medusa-fulfillment-manual`,
//   `medusa-payment-manual`,
//   {
//     resolve: `@medusajs/file-local`,
//     options: {
//       upload_dir: path.resolve(__dirname, "uploads"), // Store uploads in a directory relative to the config file
//     },
//   },
//   {
//     resolve: "@medusajs/admin",
//     options: {
//       autoRebuild: true,
//       develop: {
//         open: process.env.OPEN_BROWSER !== "false", // Open browser based on the environment variable
//       },
//     },
//   },
// ];

// Feature flags for Medusa
const featureFlags = {
  medusa_v2: true, // Enable Medusa v2 features
};

// // Define modules for Medusa services
// const modules = {
//   eventBus: {
//     resolve: "@medusajs/event-bus-redis", // Using Redis for the event bus
//     options: {
//       redisUrl: REDIS_URL,
//     },
//   },
//   cacheService: {
//     resolve: "@medusajs/cache-redis", // Using Redis for caching
//     options: {
//       redisUrl: REDIS_URL,
//     },
//   },
//   pricingService: {
//     resolve: "@medusajs/pricing", // Pricing service
//   },
//   productService: {
//     resolve: "@medusajs/product", // Product service
//   },
// };

// Project configuration including database and security settings
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET || "default_jwt_secret", // Default JWT secret for development
  cookieSecret: process.env.COOKIE_SECRET || "default_cookie_secret", // Default cookie secret for development
  store_cors: process.env.STORE_CORS || "http://localhost:8000", // CORS settings for the store
  //store_cors: process.env.STORE_CORS || "/http:\\/\\/*/",
  admin_cors: process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001", // CORS settings for the admin
  redis_url: REDIS_URL, // Redis URL for cache and event bus
  database_database: "medusa-docker", // Database name
  database_type: "postgres", // Database type
  database_url: POSTGRES_URL, // PostgreSQL connection URL
};

// // Export the configuration module
// module.exports = {
//   projectConfig,
//   plugins,
//   modules,
//   featureFlags,
// };
