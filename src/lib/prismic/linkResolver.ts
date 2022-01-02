export default function linkResolver(doc): string {
	if (doc.type === 'page') return `/${doc.uid}`;
	else if (doc.type === 'newsletter') return `/newsletter/${doc.uid}`;
	else if (doc.type === 'event') return `/events/${doc.uid}`;
	else if (doc.type === 'home') return '/';
	else if (doc.type === 'events_home') return '/events';
	else if (doc.type === 'contact') return '/contact';
	else if (doc.type === 'newsletter_home') return '/newsletters';
	return '/';
}
