<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';

	export const load = async ({ params }) => {
		const page = await Client.getByUID('newsletter', params.pageId, {});

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
	<title>{pageTitle}</title>
</svelte:head>

<div>
	{#if page}
		<h1 class="page-title !text-5xl max-w-xl">
			{pageTitle}
		</h1>
		<h3 class=" font-medium  text-md mb-2 text-primary mt-2">January 2 2022 • Author Name</h3>
		<!-- <a href="" class="text-gray-400 underline font-semibold">Download as a PDF</a> -->
		<div class="prose my-8">
			{@html PrismicDOM.RichText.asHtml(page.content)}
		</div>
	{/if}
</div>
