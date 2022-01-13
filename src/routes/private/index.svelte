<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Newsletter, Result } from '$lib/types/prismic';

	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';

	export const load = async ({ params }) => {
		const pagePromise = Client.getSingle('home', {});
		const newslettersPromise = Client.query(Prismic.Predicates.at('document.type', 'newsletter'), {
			pageSize: 10
		});
		const eventsPromise = Client.query(Prismic.Predicates.at('document.type', 'event'), {
			pageSize: 10
		});

		const [page, newsletters, events] = await Promise.all([
			pagePromise,
			newslettersPromise,
			eventsPromise
		]);

		return {
			props: {
				pageResult: page,
				newslettersResult: newsletters.results,
				eventsResult: events.results.filter(
					(event) => PrismicDOM.Date(event.data.date).getTime() > Date.now()
				)
			}
		};
	};
</script>

<script lang="ts">
	import NewsletterPreview from '$lib/NewsletterPreview.svelte';
	import type { Event } from '$lib/types/prismic';
	import EventPreview from '$lib/EventPreview.svelte';

	export let newslettersResult: Result<Newsletter>[];
	export let eventsResult: Result<Event>[];
</script>

<div>
	<h1 class=" text-5xl font-bold mb-1">Blockchain</h1>
	<h1 class=" text-4xl font-normal">at Georgia Tech</h1>

	<div class="my-8 ml-3 flex flex-wrap space-x-8">
		{#each newslettersResult as newsletter}
			<NewsletterPreview {newsletter} />
		{/each}
		<!-- <h2 class="page-subtitle">Newsletters</h2> -->
	</div>
	<div class="mt-4 mb-8">
		<h2 class="page-subtitle">Upcoming Events</h2>
		<div class="flex flex-row flex-wrap space-x-8 mt-4 mb-8">
			{#each eventsResult as upcomingEvent}
				<EventPreview event={upcomingEvent.data} />
			{/each}
		</div>
	</div>
	<div class="mt-4 mb-8">
		<h2 class="page-subtitle">Our Services</h2>
		<div class="grid grid-cols-2 gap-8 mt-4 mb-8">
			<div
				class="shadow-md p-8 rounded-lg hover:shadow-xl ease-in transition-shadow cursor-pointer"
			>
				<h3 class=" text-primary text-xl font-semibold mb-2">For Students</h3>
				<p class=" leading-snug">
					Our services lorem ipsum dolor sit amte lorem ipsum dolor sit amtelorem ipsum dolor sit
					amtelorem ipsum dolor sit amte
				</p>
			</div>
			<div
				class="shadow-md p-8 rounded-lg hover:shadow-xl ease-in transition-shadow cursor-pointer"
			>
				<h3 class="text-primary text-xl font-semibold mb-2">For Companies</h3>
				<p class="leading-snug">
					Our services lorem ipsum dolor sit amte lorem ipsum dolor sit amtelorem ipsum dolor sit
					amtelorem ipsum dolor sit amte
				</p>
			</div>
		</div>
	</div>
	<!-- <div class="mt-4 mb-8">
		<h2 class="page-subtitle">Upcoming Events</h2>
		<div class="flex flex-row flex-wrap space-x-8 mt-4 mb-8" />
	</div> -->
</div>
