import type { CollectionEntry } from "astro:content";

export interface NavItem {
	href: string;
	mdHref: string;
	title: string;
}

export function routeIdForDocId(id: string): string {
	return id.endsWith("/index") ? id.slice(0, -"/index".length) : id;
}

export function hrefForDocId(id: string): string {
	const routeId = routeIdForDocId(id);
	return routeId === "index" ? "/" : `/${routeId}/`;
}

export function mdHrefForDocId(id: string): string {
	const routeId = routeIdForDocId(id);
	return routeId === "index" ? "/index.md" : `/${routeId}.md`;
}

export function navItemsForDocs(docs: CollectionEntry<"docs">[]): NavItem[] {
	return docs
		.toSorted((left, right) => {
			const orderDelta = left.data.order - right.data.order;
			if (orderDelta !== 0) {
				return orderDelta;
			}
			return left.data.title.localeCompare(right.data.title);
		})
		.map((doc) => ({
			href: hrefForDocId(doc.id),
			mdHref: mdHrefForDocId(doc.id),
			title: doc.data.title,
		}));
}
