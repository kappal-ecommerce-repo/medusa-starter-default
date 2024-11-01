// Importing necessary modules
const path = require("path");

// Set Redis URL
const REDIS_URL = process.env.REDIS_URL || "redis://cache";

// Set PostgreSQL URL
const POSTGRES_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL || "postgres://username:password@localhost:5432/medusa-docker";

// Define plugins used in the Medusa project
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: path.resolve(__dirname, "uploads"), // Store uploads in a directory relative to the config file
    },
  },
  {
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false", // Open browser based on the environment variable
      },
    },
  },
];

// Feature flags for Medusa
const featureFlags = {
  medusa_v2: true, // Enable Medusa v2 features
};

// Define modules for Medusa services
const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis", // Using Redis for the event bus
    options: {
      redisUrl: REDIS_URL,
    },
  },
  cacheService: {
    resolve: "@medusajs/cache-redis", // Using Redis for caching
    options: {
      redisUrl: REDIS_URL,
    },
  },
  pricingService: {
    resolve: "@medusajs/pricing", // Pricing service
  },
  productService: {
    resolve: "@medusajs/product", // Product service
  },
};

// Project configuration including database and security settings
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET || "default_jwt_secret", // Default JWT secret for development
  cookieSecret: process.env.COOKIE_SECRET || "default_cookie_secret", // Default cookie secret for development
  store_cors: process.env.STORE_CORS || "http://localhost:8000", // CORS settings for the store
  admin_cors: process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001", // CORS settings for the admin
  redis_url: REDIS_URL, // Redis URL for cache and event bus
  database_database: "medusa-docker", // Database name
  database_type: "postgres", // Database type
  database_url: POSTGRES_URL, // PostgreSQL connection URL
};

// Export the configuration module
module.exports = {
  projectConfig,
  plugins,
  modules,
  featureFlags,
};
