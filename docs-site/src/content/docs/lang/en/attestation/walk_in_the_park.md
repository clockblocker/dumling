---
title: English attestation - walk in the park
description: Valid dumling objects and IDs for the walk in the park contrast.
order: 35
---

# English attestation: walk in the park

This attestation records two learner-facing classifications for the same selected spelling, **walk**.

## Noun lexeme walk

Sentence:

- *During my **walk** in a park, I saw a squirrel.*

Classification:

- `Full` **Selection**
- noun **Lexeme**
- **Lemma** *"walk"*

```ts
import type { Selection } from "dumling/types";

export const walkNounSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "walk",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "walk",
		surfaceKind: "Lemma",
		lemma: {
			canonicalLemma: "walk",
			inherentFeatures: {},
			language: "en",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			meaningInEmojis: "🚶",
		},
	},
} satisfies Selection<"en", "Standard", "Lemma", "Lexeme", "NOUN">;

export const walkNounSelectionId =
	"dumling:eyJlbnRpdHlLaW5kIjoiU2VsZWN0aW9uIiwibGFuZ3VhZ2UiOiJlbiIsImRhdGEiOnsibGFuZ3VhZ2UiOiJlbiIsIm9ydGhvZ3JhcGhpY1N0YXR1cyI6IlN0YW5kYXJkIiwic2VsZWN0aW9uQ292ZXJhZ2UiOiJGdWxsIiwic3BlbGxlZFNlbGVjdGlvbiI6IndhbGsiLCJzcGVsbGluZ1JlbGF0aW9uIjoiQ2Fub25pY2FsIiwic3VyZmFjZSI6eyJsYW5ndWFnZSI6ImVuIiwibm9ybWFsaXplZEZ1bGxTdXJmYWNlIjoid2FsayIsInN1cmZhY2VLaW5kIjoiTGVtbWEiLCJsZW1tYSI6eyJjYW5vbmljYWxMZW1tYSI6IndhbGsiLCJpbmhlcmVudEZlYXR1cmVzIjp7fSwibGFuZ3VhZ2UiOiJlbiIsImxlbW1hS2luZCI6IkxleGVtZSIsImxlbW1hU3ViS2luZCI6Ik5PVU4iLCJtZWFuaW5nSW5FbW9qaXMiOiLwn5q2In19fX0" as const;
```

## Idiomatic phraseme walk in the park

Sentence:

- *This exam was a **walk** in the park.*

Classification:

- `Partial` **Selection**
- idiomatic **Phraseme**
- **Lemma** *"walk in the park"*

```ts
import type { Selection } from "dumling/types";

export const walkInTheParkPartialSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "walk",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "walk in the park",
		surfaceKind: "Lemma",
		lemma: {
			canonicalLemma: "walk in the park",
			inherentFeatures: {},
			language: "en",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			meaningInEmojis: "😌",
		},
	},
} satisfies Selection<"en", "Standard", "Lemma", "Phraseme", "Idiom">;

export const walkInTheParkPartialSelectionId =
	"dumling:eyJlbnRpdHlLaW5kIjoiU2VsZWN0aW9uIiwibGFuZ3VhZ2UiOiJlbiIsImRhdGEiOnsibGFuZ3VhZ2UiOiJlbiIsIm9ydGhvZ3JhcGhpY1N0YXR1cyI6IlN0YW5kYXJkIiwic2VsZWN0aW9uQ292ZXJhZ2UiOiJQYXJ0aWFsIiwic3BlbGxlZFNlbGVjdGlvbiI6IndhbGsiLCJzcGVsbGluZ1JlbGF0aW9uIjoiQ2Fub25pY2FsIiwic3VyZmFjZSI6eyJsYW5ndWFnZSI6ImVuIiwibm9ybWFsaXplZEZ1bGxTdXJmYWNlIjoid2FsayBpbiB0aGUgcGFyayIsInN1cmZhY2VLaW5kIjoiTGVtbWEiLCJsZW1tYSI6eyJjYW5vbmljYWxMZW1tYSI6IndhbGsgaW4gdGhlIHBhcmsiLCJpbmhlcmVudEZlYXR1cmVzIjp7fSwibGFuZ3VhZ2UiOiJlbiIsImxlbW1hS2luZCI6IlBocmFzZW1lIiwibGVtbWFTdWJLaW5kIjoiSWRpb20iLCJtZWFuaW5nSW5FbW9qaXMiOiLwn5iMIn19fX0" as const;
```
