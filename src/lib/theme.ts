import { derived } from 'svelte/store';
import { localStorageWritable } from './localStore';

export const theme = localStorageWritable('theme', 'auto');

export const actualTheme = derived(
	theme,
	($theme) => {
		if (typeof window === 'undefined') return null;
		return $theme === 'auto'
			? window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
			: $theme;
	},
	''
);
