export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e6f0ff',
          200: '#cfe0ff',
          300: '#a9cbff',
          400: '#6fa6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#08103a',
        },
        accent: {
          50: '#fffaf0',
          100: '#fff2cc',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        soft: '#f8fafc',
      },
      boxShadow: {
        card: '0 8px 30px rgba(14, 19, 40, 0.08)',
        glow: '0 6px 24px rgba(59,130,246,0.06)',
      },
      borderRadius: {
        'lg-2': '1.25rem',
      },
    },
  },
  plugins: [],
};
