export interface Result<PageType> {
	id: string;
	uid?: string;
	url?: string;
	type: string;
	href: string;
	tags: any[];
	first_publication_date: string;
	last_publication_date: string;
	slugs: string[];
	linked_documents: any[];
	lang: string;
	alternate_languages: any[];
	data: PageType;
}

export interface SidebarSection {
	order: number;
	links: Link[];
}

export interface Event {
	uid: string;
	title: string;
	body: any;
	content: any;
	date: string;
	tags: string[];
	location: string;
}

export interface Newsletter {
	title: string;
	content: any;
	date: string;
	tags: any[];
	header_image: any;
	summary: any;
}
interface Link {
	link_title: string;
	url: Url;
}

interface Url {
	link_type: string;
	url: string;
}
