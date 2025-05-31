import {Colors} from "./constants/Colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
              primary: Colors.color.primary,
              secondary: Colors.color.secondary,
              background: Colors.color.background,
              disable: Colors.color.border,
              error: Colors.color.error,
              success: Colors.color.success,
              warning: Colors.color.warning,
              'text-primary': Colors.text.primary,
              'text-secondary': Colors.text.secondary,
            },
          },
    },
    plugins: [],
};
