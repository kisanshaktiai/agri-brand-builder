import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: 'var(--ks-gutter)',
			screens: { '2xl': '1216px' }
		},
		screens: {
			xs: '360px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1440px',
			'2xl': '1600px'
		},
		extend: {
			fontFamily: {
				sans: ['var(--ks-font-text)'],
				display: ['var(--ks-font-display)'],
				mono: ['var(--ks-font-mono)'],
				/* Scoped to the /founder page. */
				founder: ['"Manrope"', '"Noto Sans Devanagari"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				'founder-display': ['"Sora"', 'ui-sans-serif', 'system-ui', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
				secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
				destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
				muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
				accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
				popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
				card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				/* Site system */
				ks: {
					paper: 'hsl(var(--ks-paper))',
					'paper-2': 'hsl(var(--ks-paper-2))',
					white: 'hsl(var(--ks-white))',
					ink: 'hsl(var(--ks-ink))',
					'ink-2': 'hsl(var(--ks-ink-2))',
					'ink-3': 'hsl(var(--ks-ink-3))',
					'ink-4': 'hsl(var(--ks-ink-4))',
					line: 'hsl(var(--ks-line))',
					'line-strong': 'hsl(var(--ks-line-strong))',
					field: 'hsl(var(--ks-field))',
					'field-deep': 'hsl(var(--ks-field-deep))',
					'field-soft': 'hsl(var(--ks-field-soft))',
					'field-ink': 'hsl(var(--ks-field-ink))',
					leaf: 'hsl(var(--ks-leaf))',
					lime: 'hsl(var(--ks-lime))',
					night: 'hsl(var(--ks-night))',
					'night-2': 'hsl(var(--ks-night-2))',
					signal: 'hsl(var(--ks-signal))',
					'signal-soft': 'hsl(var(--ks-signal-soft))',
					danger: 'hsl(var(--ks-danger))',
					tatva: 'hsl(var(--ks-tatva))',
					tarka: 'hsl(var(--ks-tarka))',
					riitu: 'hsl(var(--ks-riitu))',
					pahra: 'hsl(var(--ks-pahra))',
					rukh: 'hsl(var(--ks-rukh))'
				},
				/* Founder page palette — see :root in src/index.css */
				founder: {
					paper: 'hsl(var(--founder-paper))',
					ink: 'hsl(var(--founder-ink))',
					muted: 'hsl(var(--founder-muted))',
					faint: 'hsl(var(--founder-faint))',
					field: 'hsl(var(--founder-field))',
					'field-soft': 'hsl(var(--founder-field-soft))',
					accent: 'hsl(var(--founder-accent))',
					leaf: 'hsl(var(--founder-leaf))',
					aptech: 'hsl(var(--founder-aptech))',
					learnixa: 'hsl(var(--founder-learnixa))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'ks-sm': 'var(--ks-radius-sm)',
				'ks-md': 'var(--ks-radius-md)',
				'ks-lg': 'var(--ks-radius-lg)'
			},
			boxShadow: {
				'ks-1': 'var(--ks-shadow-1)',
				'ks-2': 'var(--ks-shadow-2)',
				'ks-device': 'var(--ks-shadow-device)'
			},
			transitionTimingFunction: {
				'ks-out': 'var(--ks-ease-out)',
				'ks-in-out': 'var(--ks-ease-in-out)'
			},
			maxWidth: { ks: 'var(--ks-container)', prose: '38rem' },
			keyframes: {
				'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
				'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
