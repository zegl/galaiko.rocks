export type Parsed = {
	body: string;
	contentType: string;
};

export type Webmention = {
	id: string;
	sourceUrl: string;
	parsedSource?: Parsed;
	targetUrl: string;
	parsedTarget?: Parsed;
	status: 'created' | 'accepted' | 'rejected' | 'removed';
	message?: string;
	timestamp: number;
};

export type Author = {
	picture?: string;
	name?: string;
	url: string;
};

export type Repost = {
	source: string;
	target: string;
	author: Author;
	timestamp?: number;
};

export type Like = {
	source: string;
	target: string;
	author: Author;
	timestamp?: number;
};

export type Reply = {
	author: Author;
	source: string;
	target: string;
	content: string;
	timestamp?: number;
	updated?: number;
};
