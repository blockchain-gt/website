<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';

	export const load = async ({ params }) => {
		const page = await Client.getByUID('newsletter', 'treasuredao', {});

		const authorsData = page.data.author;

		console.log(authorsData);

		// TODO: authors, backend for forms
		const promises = authorsData.map(async (author) => {
			const authorData = await Client.getByID(author.person.id, {});
			console.log(authorData);
			return {
				...author,
				...authorData.data
			};
		});

		const authors = await Promise.all(promises);
		console.log(authors);

		return {
			props: {
				pageResult: page,
				authors
			}
		};
	};
</script>

<script lang="ts">
	export let pageResult: Result<any>;
	$: page = pageResult ? pageResult.data : {};

	$: pageTitle = PrismicDOM.RichText.asText(page.title);
	export let authors: any[] = [];
	$: authorNames = authors.map((a) => PrismicDOM.RichText.asText(a.name));
	$: console.log(page);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div>
	{#if page}
		<h3 class="uppercase font-bold text-xs mb-2 text-primary">
			{page.date} • {#each authorNames as name, i}
				{name}{#if i < authorNames.length - 1},&nbsp;{/if}
			{/each}
		</h3>
		<h1 class="page-title !text-5xl max-w-xl">
			{pageTitle}
		</h1>
		<!-- <a href="" class="text-gray-400 underline font-semibold">Download as a PDF</a> -->
		<div class="prose my-8 prose-img:mx-auto">
			{@html PrismicDOM.RichText.asHtml(page.content)}
		</div>
	{/if}
</div>
