<script context="module">
  import {h1, h2, h3, h4, h5, h6, img, strong, a} from '$lib/components/markdown'
  export {h1, h2, h3, h4, h5, h6, img, strong, a}
</script>

<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { emojiPaths } from '$lib/emojis';

  function hydrateRandomEmojis() {
    document.querySelectorAll('.random-emoji').forEach((el) => {
      const path = emojiPaths[Math.floor(Math.random() * emojiPaths.length)];
      const img = document.createElement('img');
      img.src = path;
      img.className = 'custom-emoji';
      img.alt = 'random';
      img.style.cssText = 'display: inline; aspect-ratio: 1; width: 1.75em; margin: 0 0.2em';
      el.replaceWith(img);
    });
  }

  onMount(() => {
    hydrateRandomEmojis();
  });

  afterNavigate(() => {
    hydrateRandomEmojis();
  });
</script>

<slot />