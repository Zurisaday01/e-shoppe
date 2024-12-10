import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

type ThemeOptions = 'light' | 'dark' | 'system';

interface ThemeContextType {
	theme: ThemeOptions;
	toggleTheme: (newTheme: ThemeOptions) => void;
}

// Theme context
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | null>(null);

// Theme context provider
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	// Retrieve theme from localStorage or default to 'system'

	const [theme, setTheme] = useState<ThemeOptions>(() => {
		const savedTheme = localStorage.getItem(
			'theme-challenge'
		) as ThemeOptions | null;
		if (savedTheme) return savedTheme;
		return 'system';
	});
	

	const applyTheme = useCallback((themeToApply: ThemeOptions) => {
		if (themeToApply === 'system') {
			const systemPrefersDark = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches;
			document.body.classList.toggle('dark', systemPrefersDark);
		} else {
			document.body.classList.toggle('dark', themeToApply === 'dark');
		}
	}, []);

	const toggleTheme = useCallback(
		(newTheme: ThemeOptions) => {
			setTheme(newTheme);
			localStorage.setItem('theme-challenge', newTheme); // Save theme preference to localStorage
			applyTheme(newTheme);
		},
		[applyTheme]
	);

	useEffect(() => {
		// Sync with system theme changes when `theme` is `system`
		const handleSystemThemeChange = (e: MediaQueryListEvent) => {
			if (theme === 'system') {
				document.body.classList.toggle('dark', e.matches);
			}
		};

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', handleSystemThemeChange);

		// Apply the current theme on mount
		applyTheme(theme);

		return () => {
			mediaQuery.removeEventListener('change', handleSystemThemeChange);
		};
	}, [theme, applyTheme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

// Custom hook to use the theme context
// eslint-disable-next-line react-refresh/only-export-components
export default function useTheme() {
	const context = useContext(ThemeContext);
	if (context === null) {
		throw new Error('Context must be used within a context provider');
	}

	return context;
}
