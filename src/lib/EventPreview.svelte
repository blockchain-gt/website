<script lang="ts">
	import type { Event } from './types/prismic';
	import PrismicDOM from 'prismic-dom';

	export let event: Event;
	export let uid: string;

	const eventDate = PrismicDOM.Date(event.date);
	const dateString = eventDate.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric'
	});
	const timeString = eventDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
</script>

<a href="/events/{uid}">
	<div
		class="!aspect-square !w-64 p-6
    shadow-md hover:shadow-xl ease-in transition-shadow cursor-pointer rounded-lg flex-none overflow-hidden flex flex-col justify-between dark:bg-gray-800"
	>
		<div>
			<h5 class="uppercase text-xs font-semibold text-secondary filter brightness-90">
				{dateString} • {timeString}
			</h5>
			<h3 class="w-full text-lg mt-0.5 font-semibold text-primary line-clamp-2">
				{PrismicDOM.RichText.asText(event.title)}
			</h3>
			<p class="text-xs mt-1 text-gray-600 line-clamp-5">
				{PrismicDOM.RichText.asText(event.body)}
			</p>
		</div>
		{#if event.location}
			<div class="text-gray-600 text-sm flex flex-row space-x-1">
				<div>
					<i class="far fa-map-marker-alt text-secondary mr-1" />
				</div>
				<div class="line-clamp-2">
					{event.location}
				</div>
			</div>
		{/if}
	</div>
</a>
