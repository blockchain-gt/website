<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Event, Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';

	export const load = async ({ params }) => {
		const page = await Client.getByUID('event', params.pageId, {});

		return {
			props: {
				pageResult: page
			}
		};
	};
</script>

<script lang="ts">
	export let pageResult: Result<Event>;
	let page = pageResult.data;

	$: pageTitle = PrismicDOM.RichText.asText(page.title);

	const eventDate = PrismicDOM.Date(page.date);
	const dateString = eventDate.toLocaleDateString('en-US', {
		// weekday: 'short',
		month: 'long',
		day: 'numeric'
	});

	const timeString = eventDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div>
	{#if page}
		<div class=" text-secondary font-bold uppercase text-sm tracking-wide mt-4 mb-1">
			{dateString} • {timeString} • {page.location}
		</div>
		<h1 class="page-title !text-5xl max-w-xl">
			{pageTitle}
		</h1>
		<div class="prose my-8 prose-img:mx-auto">
			{@html PrismicDOM.RichText.asHtml(page.content || page.body)}
		</div>
	{/if}
</div>
