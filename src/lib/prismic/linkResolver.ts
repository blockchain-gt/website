export default function LinkResolver(doc): string {
	console.log(doc);

	if (doc.type === 'page') {
		return `/${doc.uid}`;
	} else if (doc.type === 'newsletter') {
		return `/newsletter/${doc.uid}`;
	} else if (doc.type === 'event') {
		return `/events/${doc.uid}`;
	} else if (doc.type === 'home') {
		return '/';
	} else if (doc.type === 'events') {
		return '/events';
	}

	return '/';
}
