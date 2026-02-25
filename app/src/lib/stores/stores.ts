import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const storeTheme = writable(browser ? document.body.getAttribute('data-theme') ?? '' : 'skeleton');

/** Footer visibility for home page - controlled by scroll position/direction */
export const storeFooterVisible = writable(false);