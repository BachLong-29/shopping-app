import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			poppins: ['Poppins', 'sans-serif'],
  			display: ['var(--font-instrument-serif)', '"Instrument Serif"', '"Times New Roman"', 'serif'],
  			mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
  			popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
  			primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
  			secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
  			muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
  			accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
  			destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: { '1': 'hsl(var(--chart-1))', '2': 'hsl(var(--chart-2))', '3': 'hsl(var(--chart-3))', '4': 'hsl(var(--chart-4))', '5': 'hsl(var(--chart-5))' },
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))',
  			},
  			halo: {
  				violet: '#7c3aed',
  				pink: '#ec4899',
  				amber: '#f59e0b',
  				sky: '#0ea5e9',
  				lime: '#84cc16',
  				rose: '#f43f5e',
  				emerald: '#10b981',
  			},
  		},
  		backgroundImage: {
  			aurora: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)',
  			'grad-violet': 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)',
  			'grad-sunset': 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
  			'grad-ocean': 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
  			'grad-lime': 'linear-gradient(135deg, #84cc16 0%, #10b981 100%)',
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': { transform: 'translate(0, 0) scale(1)' },
  				'50%': { transform: 'translate(20px, -30px) scale(1.05)' },
  			},
  			'reveal-up': {
  				from: { opacity: '0', transform: 'translateY(16px)' },
  				to: { opacity: '1', transform: 'translateY(0)' },
  			},
  			shimmer: {
  				'0%': { backgroundPosition: '200% 0' },
  				'100%': { backgroundPosition: '-200% 0' },
  			},
  			shine: { to: { transform: 'translateX(100%)' } },
  		},
  		animation: {
  			float: 'float 10s ease-in-out infinite',
  			'reveal-up': 'reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
  			shimmer: 'shimmer 1.4s linear infinite',
  			shine: 'shine 1.6s linear infinite',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
