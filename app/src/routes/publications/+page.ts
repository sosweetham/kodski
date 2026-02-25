import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/v1/orcid/works');
	const works = await res.json();
	return { works };
};
