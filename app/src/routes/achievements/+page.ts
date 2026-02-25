import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/v1/orcid/activities');
	const activities = await res.json();
	return { activities };
};
