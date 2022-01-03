<script lang="ts">
	import type { Newsletter, Result } from './types/prismic';
	export let newsletter: Result<Newsletter>;
	import PrismicDOM from 'prismic-dom';
</script>

<div
	class="
shadow-md hover:shadow-xl ease-in transition-shadow cursor-pointer rounded-lg
overflow-hidden w-[22rem] will-change-auto
"
>
	<a href="/newsletters/{newsletter.uid}">
		<div class="h-48 bg-gray-100 overflow-hidden">
			<img class="object-center" src={newsletter.data.header_image.url} alt="" />
		</div>
		<!-- Bottom of card -->
		<div class="p-5">
			<h2 class="text-primary font-semibold text-xl">
				{PrismicDOM.RichText.asText(newsletter.data.title)}
			</h2>
			<p class="mt-2 text-sm">
				{@html PrismicDOM.RichText.asText(
					newsletter.data.summary[0].text ? newsletter.data.summary : newsletter.data.content
				)}
			</p>
		</div>
	</a>
</div>
