module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      width: {
        930: "61.25rem",
      },
      flex: {
        id: "0 40px",
        title: "0 530px",
      },
      grid: {
        player: "1fr 300px",
      },
    },
  },
  plugins: [],
};
