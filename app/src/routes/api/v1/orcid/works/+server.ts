import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const ORCID_ID = '0000-0002-7870-6367';
const ORCID_WORKS_URL = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;

export const GET: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': 'public, s-maxage=86400',
		'Access-Control-Allow-Origin': '*'
	});

	try {
		const res = await fetch(ORCID_WORKS_URL, {
			headers: { Accept: 'application/vnd.orcid+json' }
		});
		const text = await res.text();

		if (text.trim().startsWith('{')) {
			const data = JSON.parse(text);
			const works = parseOrcidJson(data);
			return json(works);
		}
		const works = parseOrcidXml(text);
		return json(works);
	} catch (e) {
		console.error('ORCID fetch failed:', e);
		return json([]);
	}
};

type OrcidWork = {
	title: string;
	type: string;
	year?: string;
	journal?: string;
	doi?: string;
	doiUrl?: string;
};

function extractStr(val: unknown): string {
	if (val == null) return '';
	if (typeof val === 'string') return val;
	if (typeof val === 'object' && val !== null) {
		const v = val as Record<string, unknown>;
		return String(v['@value'] ?? v.value ?? '');
	}
	return String(val);
}

function parseOrcidJson(data: unknown): OrcidWork[] {
	if (!data || typeof data !== 'object') return [];
	const groups = (data as { group?: unknown[] }).group;
	if (!Array.isArray(groups)) return [];

	return groups.flatMap((g) => {
		const summary = (g as { 'work-summary'?: unknown | unknown[] })['work-summary'];
		const summaries = Array.isArray(summary) ? summary : summary ? [summary] : [];
		return summaries.map((s) => {
			const work = s as Record<string, unknown>;
			const title = extractStr(work.title);
			const type = extractStr(work.type);
			const journal = extractStr(work['journal-title']);
			const pubDate = work['publication-date'] as Record<string, unknown> | undefined;
			const year = extractStr(pubDate?.year);
			const extIds = work['external-ids'] as { 'external-id'?: unknown[] } | undefined;
			let doi: string | undefined;
			let doiUrl: string | undefined;
			if (extIds?.['external-id']) {
				const doiEntry = (extIds['external-id'] as Record<string, unknown>[]).find(
					(id) => id['external-id-type'] === 'doi'
				);
				if (doiEntry) {
					doi = extractStr(doiEntry['external-id-value']);
					doiUrl = extractStr(doiEntry['external-id-url']);
				}
			}
			return { title, type, year, journal, doi, doiUrl };
		});
	});
}

function parseOrcidXml(xml: string): OrcidWork[] {
	const works: OrcidWork[] = [];
	const groupRegex = /<activities:group>([\s\S]*?)<\/activities:group>/g;
	let groupMatch;
	while ((groupMatch = groupRegex.exec(xml)) !== null) {
		const group = groupMatch[1];
		const titleMatch = group.match(/<common:title[^>]*>([\s\S]*?)<\/common:title>/);
		const typeMatch = group.match(/<work:type[^>]*>([^<]+)<\/work:type>/);
		const yearMatch = group.match(/<common:year[^>]*>([^<]+)<\/common:year>/);
		const journalMatch = group.match(/<work:journal-title[^>]*>([\s\S]*?)<\/work:journal-title>/);
		const doiValueMatch = group.match(
			/<common:external-id-type>doi<\/common:external-id-type>[\s\S]*?<common:external-id-value[^>]*>([^<]+)<\/common:external-id-value>/
		);
		const doiUrlMatch = group.match(
			/<common:external-id-type>doi<\/common:external-id-type>[\s\S]*?<common:external-id-url[^>]*>([^<]+)<\/common:external-id-url>/
		);
		works.push({
			title: titleMatch?.[1]?.replace(/\s+/g, ' ').trim() ?? '',
			type: typeMatch?.[1] ?? '',
			year: yearMatch?.[1],
			journal: journalMatch?.[1]?.replace(/\s+/g, ' ').trim(),
			doi: doiValueMatch?.[1],
			doiUrl: doiUrlMatch?.[1]
		});
	}
	return works;
}
