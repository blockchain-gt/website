<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';

	export const load = async ({ params }) => {
		const page = await Client.getByUID('newsletter', 'first-edition', {});

		return {
			props: {
				pageResult: page
			}
		};
	};
</script>

<script lang="ts">
	export let pageResult: Result<any>;
	$: page = pageResult ? pageResult.data : {};

	$: pageTitle = PrismicDOM.RichText.asText(page.title);
</script>

<svelte:head>
	<title>Blockchain at Georgia Tech</title>
	<meta
		property="og:image"
		content="https://prismic-io.s3.amazonaws.com/blockchaingt/53b53dfc-ec9b-4d1d-83b4-c32a2ac358c6_Screen+Shot+2022-01-11+at+2.16.22+PM.png"
		name="image"
	/>
</svelte:head>

<div>
	{#if page}
		<h1 class="page-title !text-5xl max-w-xl">
			{pageTitle}
		</h1>
		<h3 class=" font-medium text-md mb-2 text-primary mt-2">
			January 19, 2022 • Pruitt Martin, Cole Schendl, and Rob Schleusner
		</h3>

		<div class="prose my-8 prose-img:mx-auto">
			{@html PrismicDOM.RichText.asHtml(page.content)}
		</div>
	{/if}
</div>
