<script lang="ts">
	import { actualTheme, theme } from './theme';

	const setAppearance = (val: string) => {
		$theme = val;

		// @ts-ignore
		window.checkTheme();
	};

	const opts = [
		{
			value: 'light',
			svg: `<svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground)"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>`
		},
		{
			value: 'dark',
			svg: `<svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground)"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`
		},
		{
			value: 'auto',
			svg: `<svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground)"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`
		}
	];
</script>

{#if $theme}
	<button
		aria-label="Change theme"
		on:click={() => {
			const currIndex = opts.findIndex((opt) => opt.value === $theme);
			const nextIndex = (currIndex + 1) % opts.length;
			setAppearance(opts[nextIndex].value);
		}}
		class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
	>
		{@html opts.find((opt) => opt.value === $theme).svg}
		<p class="sr-only">Current theme: {$theme}</p>
	</button>
{/if}
