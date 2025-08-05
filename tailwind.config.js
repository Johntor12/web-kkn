const config = {
  theme: {
    extend: {
      content: [
        "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust based on your project structure and file types
      ],
      colors: {
        primary: "#02401",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        HankenGrotesk: ["Hanken_Grotesk"],
      },
    },
  },
};

module.exports = config;
