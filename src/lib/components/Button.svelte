<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface Props {
    children: Snippet;
    onclick?: () => unknown;
    class?: string;
  }
  const { children, class: className, onclick }: Props = $props();
</script>

<button
  class={twMerge(
    "group font-pixel relative z-0 min-h-11 cursor-pointer px-8 py-2 text-xl text-amber-950",
    className,
  )}
  {onclick}
>
  <div class="transition-transform group-active:translate-y-0.5">
    {@render children()}
  </div>
  <div
    class="border-pixel-button clip-pixel absolute inset-0 -z-10 h-full w-full translate-y-1 bg-amber-500 transition-colors group-hover:bg-amber-400"
  ></div>
  <div
    class="border-pixel-button clip-pixel absolute inset-0 -z-10 bg-amber-400 transition-all group-hover:bg-amber-300 group-active:translate-y-0.5 group-active:bg-amber-400"
  ></div>
</button>
