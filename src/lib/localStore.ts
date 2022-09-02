import { writable as internalWritable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';

const stores: Record<string, Writable<any>> = {};

export function localStorageWritable(key: string, initialValue: string): Writable<string> {
	const isBrowser = typeof window != 'undefined' && typeof localStorage != 'undefined';

	function updateInLocalStorage(key: string, value: string) {
		if (!isBrowser) return;

		localStorage.setItem(key, value);
	}

	if (!stores[key]) {
		const store = internalWritable(initialValue, (set) => {
			const val = isBrowser ? localStorage[key] : null;

			if (val) {
				set(val);
			}

			if (isBrowser) {
				const handleStorageUpdate = (event: StorageEvent) => {
					if (event.key === key) {
						set(event.newValue ? event.newValue : null);
					}
				};

				window.addEventListener('storage', handleStorageUpdate);

				return () => window.removeEventListener('storage', handleStorageUpdate);
			}
		});

		const { subscribe, set } = store;

		stores[key] = {
			set(value: string) {
				updateInLocalStorage(key, value);
				set(value);
			},
			update(updater: (curr: string) => string) {
				const value = updater(get(store));

				updateInLocalStorage(key, value);
				set(value);
			},
			subscribe
		};
	}

	return stores[key];
}
