import { parseHTML } from 'linkedom';
import { json } from '@sveltejs/kit';
import type { Contributions } from '$lib/types';

export const GET = async ({ params, setHeaders }) => {
	setHeaders({
		'Cache-Control': `public, s-maxage=${60 * 60 * 24}`,
		'Access-Control-Allow-Origin': '*'
	});
	const { html, from, to } = await getContributions(params);
	return json(parseContributions(html, from, to));
};
function getContributionDateRange() {
	const to = new Date();
	const from = new Date(to);
	from.setFullYear(from.getFullYear() - 1);
	return {
		from: from.toISOString().slice(0, 10),
		to: to.toISOString().slice(0, 10)
	};
}
const getContributions = async ({ user }: { user: string }) => {
	const { from, to } = getContributionDateRange();
	const url = `https://github.com/users/${user}/contributions?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`${res.status}:Failed to fetch contributions for ${user}`);
	}
	const text = await res.text();
	return { html: text, from, to };
};
/** Map GitHub contribution level (0–4) to approximate count for bar height */
const levelToCount = (level: number): number => {
	if (level <= 0) return 0;
	if (level === 1) return 3;
	if (level === 2) return 10;
	if (level === 3) return 20;
	return 35;
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

const parseContributions = (html: string, from: string, to: string): Contributions => {
	const { document } = parseHTML(html);
	const rows = document.querySelectorAll('tbody > tr');
	const contributions: Contributions = [];
	let weekday = 0;

	for (const row of rows) {
		const cells = row.querySelectorAll('td:not(.ContributionCalendar-label)');
		const currentRow: (Contributions[number][number])[] = [];

		for (const cell of cells) {
			const date = cell.getAttribute('data-date');
			const levelStr = cell.getAttribute('data-level');

			if (date != null && levelStr != null && date >= from && date <= to) {
				const level = parseInt(levelStr, 10) || 0;
				currentRow.push({
					count: levelToCount(level),
					day: DAYS[weekday] ?? 'Saturday',
					date,
					level
				});
			} else {
				currentRow.push(null);
			}
		}

		contributions.push(currentRow);
		weekday++;
	}

	return contributions;
};
