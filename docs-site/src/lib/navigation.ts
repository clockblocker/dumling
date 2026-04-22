import type { CollectionEntry } from "astro:content";

export interface NavItem {
	href: string;
	mdHref: string;
	title: string;
}

export function hrefForDocId(id: string): string {
	return id === "index" ? "/" : `/${id}/`;
}

export function mdHrefForDocId(id: string): string {
	return id === "index" ? "/index.md" : `/${id}.md`;
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
