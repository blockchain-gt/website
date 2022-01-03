<script context="module" lang="ts">
	import EventPreview from '$lib/EventPreview.svelte';

	import Client from '$lib/prismic/client';
	import type { Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';

	export const load = async () => {
		const page = await Client.getSingle('events_home', {});

		return {
			props: {
				pageResult: page
			}
		};
	};
</script>

<script lang="ts">
	export let pageResult: Result<any>;
	let page = pageResult.data;
</script>

<div>
	<h1 class="page-title">{PrismicDOM.RichText.asText(page.title)}</h1>
	<div class="prose my-8">
		{@html PrismicDOM.RichText.asHtml(page.body)}
	</div>
	<div class="upcoming-events mt-2 mb-6 ">
		<h2 class="page-subtitle">Upcoming Events</h2>
		<div class="flex flex-row flex-wrap space-x-8">
			<EventPreview />
			<EventPreview />
			<EventPreview />
		</div>
	</div>
	<div class="past-events mt-2 mb-6">
		<h2 class="page-subtitle">Past Events</h2>
	</div>
</div>
