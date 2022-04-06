<script lang="ts">
	import type { SidebarSection, Result } from './types/prismic';
	export let sections: Result<SidebarSection>[];
	import PrismicDOM from 'prismic-dom';
	import linkResolver from './prismic/linkResolver';

	// Odd workaround because $page doesn't contain a `path`, only `url`
	$: w = typeof window === 'undefined' ? null : window;
</script>

<div class="w-full p-8 pt-16 m-4 max-h-[90vh] overflow-y-scroll">
	<h4 class="font-bold mb-4"><a sveltekit:prefetch href="/">Blockchain @ GT</a></h4>

	{#each sections.sort((a, b) => a.data.order - b.data.order) as section}
		<div class="mb-6">
			{#each section.data.links as link}
				<a
					sveltekit:prefetch
					class="my-2 p-1.5 px-2.5 rounded-md block {w &&
					PrismicDOM.Link.url(link.url, linkResolver) === w.location.pathname
						? 'bg-gray-100'
						: ''}"
					href={PrismicDOM.Link.url(link.url, linkResolver)}
				>
					{link.link_title}
				</a>
			{/each}
		</div>
	{/each}
</div>
