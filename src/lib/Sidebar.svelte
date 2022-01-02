<script lang="ts">
	import type { SidebarSection, Result } from './types/prismic';
	export let sections: Result<SidebarSection>[];
	import PrismicDOM from 'prismic-dom';
	import LinkResolver from './prismic/linkResolver';
</script>

<div class="w-full p-8 pt-16 m-4">
	<h4 class="font-bold mb-4">Blockchain @ GT</h4>
	{#each sections.sort((a, b) => a.data.order - b.data.order) as section}
		<div class="mb-6">
			{#each section.data.links as link}
				<div class="my-2">
					<a href={PrismicDOM.Link.url(link.url, LinkResolver)}>
						{link.link_title}
					</a>
				</div>
			{/each}
		</div>
	{/each}
</div>
