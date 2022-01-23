<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Newsletter, Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';

	export const prerender = true;

	export const load = async ({ params }) => {
		const pagePromise = Client.getSingle('newsletter_home', {});
		const newslettersPromise = Client.query(Prismic.Predicates.at('document.type', 'newsletter'), {
			pageSize: 2
		});

		const [page, newsletters] = await Promise.all([pagePromise, newslettersPromise]);

		return {
			props: {
				pageResult: page,
				newslettersResult: newsletters.results
			}
		};
	};
</script>

<script lang="ts">
	import NewsletterPreview from '$lib/NewsletterPreview.svelte';

	export let pageResult: Result<any>;
	export let newslettersResult: Result<Newsletter>[];

	let page = pageResult.data;
	let newsletters = newslettersResult;
</script>

<div>
	<h1 class="page-title">{PrismicDOM.RichText.asText(page.title)}</h1>
	<div class="prose my-8 ">
		{@html PrismicDOM.RichText.asHtml(page.body)}
	</div>
	<div class="flex flex-wrap space-x-8 ml-3">
		{#each newsletters as newsletter}
			<NewsletterPreview {newsletter} />
		{/each}
	</div>
	<h2 class="page-subtitle mt-16 mb-6">Archive</h2>
	<div class="space-y-3">
		{#each newsletters as newsletter}
			<a
				sveltekit:prefetch
				href="/newsletters/{newsletter.uid}"
				class="block antialiased underline text-gray-600 font-medium"
			>
				{PrismicDOM.RichText.asText(newsletter.data.title)}
			</a>
		{/each}
	</div>
</div>
