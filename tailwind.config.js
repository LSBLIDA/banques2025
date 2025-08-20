module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./*.html"],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Banking Authority
        primary: {
          50: "#eff6ff", // blue-50
          100: "#dbeafe", // blue-100
          200: "#bfdbfe", // blue-200
          300: "#93c5fd", // blue-300
          400: "#60a5fa", // blue-400
          500: "#3b82f6", // blue-500
          600: "#2563eb", // blue-600
          700: "#1d4ed8", // blue-700
          800: "#1e3a8a", // blue-800
          900: "#1e40af", // blue-900
          DEFAULT: "#1e3a8a", // blue-800
        },
        // Secondary Colors - Supporting Hierarchy
        secondary: {
          50: "#eff6ff", // blue-50
          100: "#dbeafe", // blue-100
          200: "#bfdbfe", // blue-200
          300: "#93c5fd", // blue-300
          400: "#60a5fa", // blue-400
          500: "#3b82f6", // blue-500
          600: "#2563eb", // blue-600
          700: "#1d4ed8", // blue-700
          800: "#1e3a8a", // blue-800
          900: "#1e40af", // blue-900
          DEFAULT: "#3b82f6", // blue-500
        },
        // Accent Colors - Conversion CTAs
        accent: {
          50: "#ecfeff", // cyan-50
          100: "#cffafe", // cyan-100
          200: "#a5f3fc", // cyan-200
          300: "#67e8f9", // cyan-300
          400: "#22d3ee", // cyan-400
          500: "#06b6d4", // cyan-500
          600: "#0891b2", // cyan-600
          700: "#0e7490", // cyan-700
          800: "#155e75", // cyan-800
          900: "#164e63", // cyan-900
          DEFAULT: "#06b6d4", // cyan-500
        },
        // Background Colors
        background: "#ffffff", // white
        surface: "#f8fafc", // slate-50
        // Text Colors
        "text-primary": "#1f2937", // gray-800
        "text-secondary": "#6b7280", // gray-500
        // Status Colors
        success: {
          50: "#ecfdf5", // emerald-50
          100: "#d1fae5", // emerald-100
          500: "#10b981", // emerald-500
          600: "#059669", // emerald-600
          DEFAULT: "#10b981", // emerald-500
        },
        warning: {
          50: "#fffbeb", // amber-50
          100: "#fef3c7", // amber-100
          500: "#f59e0b", // amber-500
          600: "#d97706", // amber-600
          DEFAULT: "#f59e0b", // amber-500
        },
        error: {
          50: "#fef2f2", // red-50
          100: "#fee2e2", // red-100
          500: "#ef4444", // red-500
          600: "#dc2626", // red-600
          DEFAULT: "#ef4444", // red-500
        },
        // Border Colors
        border: "#e5e7eb", // gray-200
        "border-focus": "#06b6d4", // cyan-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      boxShadow: {
        'executive': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      backgroundImage: {
        'banking-gradient': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        'banking-gradient-reverse': 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
      },
    },
  },
  plugins: [],
}