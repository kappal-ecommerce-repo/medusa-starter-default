const fs = require("fs");
const path = require("path");

// File paths to copy
const filesToCopy = [
  {
    src: path.resolve(__dirname, "./src/admin/custom-translations/en.json"),
    dest: path.resolve(
      __dirname,
      "./node_modules/@medusajs/dashboard/src/i18n/translations/en.json"
    ),
  },
  {
    src: path.resolve(__dirname, "./src/admin/custom-translations/$schema.json"),
    dest: path.resolve(
      __dirname,
      "./node_modules/@medusajs/dashboard/src/i18n/translations/$schema.json"
    ),
  },
];

// Copy each file
filesToCopy.forEach(({ src, dest }) => {
  fs.copyFile(src, dest, (err) => {
    if (err) {
      console.error(`Error copying ${path.basename(src)}:`, err);
      process.exit(1); // Exit with an error code
    } else {
      console.log(`${path.basename(src)} copied successfully to ${dest}!`);
    }
  });
});
