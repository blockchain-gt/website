<script lang="ts">
	import { onMount } from 'svelte';

	import { actualTheme, theme } from './theme';

	const setAppearance = (val: string) => {
		$theme = val;

		// @ts-ignore
		window.checkTheme();
	};

	const light = {
		value: 'light',
		svg: `<svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground)"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>`
	};

	const dark = {
		value: 'dark',
		svg: `<svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground)"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`
	};

	const auto = {
		value: 'auto',
		svg: `<svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground)"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`
	};

	let allOptions = [light, dark, auto];

	const setSvg = () => {
		const svg = allOptions.find((opt) => {
			return opt.value === $theme;
		}).svg;
		if (typeof document !== 'undefined') {
			console.log(document.getElementById('inner-svg'), svg);

			document.getElementById('inner-svg').innerHTML = svg;
			console.log(document.getElementById('inner-svg').innerHTML);
		}
	};
	$: {
		$theme;
		setSvg();
	}

	onMount(setSvg);
</script>

{#if $theme}
	<button
		aria-label="Change theme"
		on:click={() => {
			const currIndex = allOptions.findIndex((opt) => opt.value === $theme);

			const nextIndex = (currIndex + 1) % allOptions.length;
			setAppearance(allOptions[nextIndex].value);
		}}
		class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
	>
		<!-- Had to do this bc of svelte bug -->
		<span id="inner-svg" />
		<p class="sr-only">Current theme: {$theme}</p>
	</button>
{/if}
