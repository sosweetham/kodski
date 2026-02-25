export type Post = {
  title: string,
  description: string,
  slug: string,
  date: string,
  categories: string[],
  published: boolean,
  readingTime?: string
}

export type Contributions = Array<{
	count: number;
	day: string;
	date: string;
	level: number;
} | null>[];