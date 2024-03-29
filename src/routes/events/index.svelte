<script context="module" lang="ts">
	import EventPreview from '$lib/EventPreview.svelte';

	import Client from '$lib/prismic/client';
	import type { Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';

	export const load = async () => {
		const pagePromise = Client.getSingle('events_home', {});
		const eventsPromise = Client.query(Prismic.Predicates.at('document.type', 'event'), {
			orderings: '[my.event.date]',
			pageSize: 50
		});

		const [page, events] = await Promise.all([pagePromise, eventsPromise]);

		return {
			props: {
				pageResult: page,
				eventsResults: events.results
			}
		};
	};
</script>

<script lang="ts">
	import type { Event } from '$lib/types/prismic';

	import { prerendering } from '$app/env';

	export let pageResult: Result<any>;
	export let eventsResults: Result<Event>[];

	let page = pageResult.data;

	const now = Date.now();
	let upcomingEvents = eventsResults.filter((event) => {
		return new Date(event.data.date).getTime() > now;
	});
	let pastEvents = eventsResults.filter((event) => {
		return new Date(event.data.date).getTime() < now;
	});
</script>

<div>
	<h1 class="page-title">{PrismicDOM.RichText.asText(page.title)}</h1>
	<div class="prose my-8">
		{@html PrismicDOM.RichText.asHtml(page.body)}
	</div>
	<div class="upcoming-events mt-2 mb-6 ">
		<h2 class="page-subtitle">Upcoming Events</h2>
		<div class="flex flex-row flex-wrap space-x-8 mt-4 mb-8">
			{#each upcomingEvents as upcomingEvent}
				<EventPreview event={upcomingEvent.data} uid={upcomingEvent.uid} />
			{/each}
		</div>
	</div>
	<div class="past-events mt-2 mb-6">
		<h2 class="page-subtitle">Past Events</h2>
		<div class="flex flex-row flex-wrap gap-8 mt-4 mb-8">
			{#each pastEvents.reverse().slice(0, 6) as pastEvent}
				<EventPreview event={pastEvent.data} uid={pastEvent.uid} />
			{/each}
		</div>
	</div>
	<h2 class="page-subtitle mt-16 mb-6">Archive</h2>
	<div class="space-y-3">
		{#each pastEvents.slice(6) as events}
			<a
				sveltekit:prefetch
				href="/events/{events.uid}"
				class="antialiased text-gray-600 font-medium flex justify-between"
			>
				<span class="underline">
					{PrismicDOM.RichText.asText(events.data.title)}
				</span>
				<time class="opacity-50 no-underline">
					{#if !prerendering}
						{new Date(events.data.date).toLocaleDateString(undefined, {
							dateStyle: 'medium'
						})}
					{/if}
				</time>
			</a>
		{/each}
	</div>
</div>
