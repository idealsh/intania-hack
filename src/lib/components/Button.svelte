<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }
  const { children }: Props = $props();
</script>

<button class="group font-pixel relative min-h-11 cursor-pointer px-8 text-xl text-amber-950">
  <div class="transition-transform group-active:translate-y-0.5">
    {@render children()}
  </div>
  <div
    class="border-pixel absolute inset-0 -z-10 h-full w-full translate-y-1 bg-amber-500 transition-colors group-hover:bg-amber-400"
  ></div>
  <div
    class="border-pixel absolute inset-0 -z-10 bg-amber-400 transition-all group-hover:bg-amber-300 group-active:translate-y-0.5 group-active:bg-amber-400"
  ></div>
</button>
