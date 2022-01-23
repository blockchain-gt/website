<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';

	export const load = async ({ params }) => {
		const page = await Client.getByUID('newsletter', params.pageId, {});

		const authors = page.data.author;

		// TODO: authors, backend for forms
		const promises = authors.map(async (author) => {
			const authorData = await Client.getByUID('person', author.uid, {});
			console.log(authorData);
			return {
				...author,
				...authorData.data
			};
		});

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
	$: authors = page.author.map((a) => a);
	// $: console.log(authors);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div>
	{#if page}
		<!-- <h3 class="uppercase font-bold text-xs mb-2 text-primary">January 2 2022 • Author Name</h3> -->
		<h1 class="page-title !text-5xl max-w-xl">
			{pageTitle}
		</h1>
		<!-- <a href="" class="text-gray-400 underline font-semibold">Download as a PDF</a> -->
		<div class="prose my-8 prose-img:mx-auto">
			{@html PrismicDOM.RichText.asHtml(page.content)}
		</div>
	{/if}
</div>
