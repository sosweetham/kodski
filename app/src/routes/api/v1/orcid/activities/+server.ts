import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const ORCID_ID = '0000-0002-7870-6367';
const ORCID_RECORD_URL = `https://pub.orcid.org/v3.0/${ORCID_ID}/record`;

export type ActivityItem = {
	kind: 'employment' | 'education' | 'distinction' | 'invited-position' | 'membership' | 'qualification' | 'service';
	roleTitle: string;
	department?: string;
	organization: string;
	city?: string;
	region?: string;
	country?: string;
	startYear?: string;
	startMonth?: string;
	endYear?: string;
	endMonth?: string;
	url?: string;
};

function extractVal(obj: unknown): string {
	if (obj == null) return '';
	if (typeof obj === 'string') return obj;
	if (typeof obj === 'object' && obj !== null && 'value' in obj) {
		return String((obj as { value?: unknown }).value ?? '');
	}
	return String(obj);
}

function parseActivities(data: unknown): ActivityItem[] {
	const items: ActivityItem[] = [];
	if (!data || typeof data !== 'object') return items;
	const activities = (data as { 'activities-summary'?: unknown })['activities-summary'];
	if (!activities || typeof activities !== 'object') return items;
	const act = activities as Record<string, unknown>;

	const sections: { key: string; kind: ActivityItem['kind']; summaryKey: string }[] = [
		{ key: 'distinctions', kind: 'distinction', summaryKey: 'distinction-summary' },
		{ key: 'invited-positions', kind: 'invited-position', summaryKey: 'invited-position-summary' },
		{ key: 'memberships', kind: 'membership', summaryKey: 'membership-summary' },
		{ key: 'qualifications', kind: 'qualification', summaryKey: 'qualification-summary' },
		{ key: 'services', kind: 'service', summaryKey: 'service-summary' }
	];

	for (const { key, kind, summaryKey } of sections) {
		const section = act[key];
		if (!section || typeof section !== 'object') continue;
		const groups = (section as { 'affiliation-group'?: unknown[] })['affiliation-group'];
		if (!Array.isArray(groups)) continue;

		for (const group of groups) {
			const summaries = (group as { summaries?: unknown[] })['summaries'];
			if (!Array.isArray(summaries)) continue;
			for (const s of summaries) {
				const summary = (s as Record<string, unknown>)[summaryKey];
				if (!summary || typeof summary !== 'object') continue;
				const sObj = summary as Record<string, unknown>;
				const org = sObj.organization as Record<string, unknown> | undefined;
				const addr = org?.address as Record<string, unknown> | undefined;
				const startDate = sObj['start-date'] as Record<string, unknown> | undefined;
				const endDate = sObj['end-date'] as Record<string, unknown> | undefined;
				const urlObj = sObj.url as { value?: string } | undefined;

				items.push({
					kind,
					roleTitle: extractVal(sObj['role-title']),
					department: extractVal(sObj['department-name']) || undefined,
					organization: extractVal(org?.name),
					city: extractVal(addr?.city) || undefined,
					region: extractVal(addr?.region) || undefined,
					country: extractVal(addr?.country) || undefined,
					startYear: extractVal(startDate?.year) || undefined,
					startMonth: extractVal(startDate?.month) || undefined,
					endYear: extractVal(endDate?.year) || undefined,
					endMonth: extractVal(endDate?.month) || undefined,
					url: urlObj?.value
				});
			}
		}
	}

	return items.sort((a, b) => {
		const aYear = a.startYear ? parseInt(a.startYear, 10) : 0;
		const bYear = b.startYear ? parseInt(b.startYear, 10) : 0;
		return bYear - aYear;
	});
}

export const GET: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': 'public, s-maxage=86400',
		'Access-Control-Allow-Origin': '*'
	});

	try {
		const res = await fetch(ORCID_RECORD_URL, {
			headers: { Accept: 'application/vnd.orcid+json' }
		});
		const data = await res.json();
		const activities = parseActivities(data);
		return json(activities);
	} catch (e) {
		console.error('ORCID activities fetch failed:', e);
		return json([]);
	}
};
