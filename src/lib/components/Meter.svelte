<script lang="ts">
  import { Meter, useId } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  interface Props {
    label?: string;
    min: number;
    max: number;
    value: number;
    unit?: string;
    baronly?: boolean;
    class?: string;
  }

  const { label, min, max, value, unit, baronly, class: className = "" }: Props = $props();

  const labelId = useId();

  const usedPercentage = $derived((value / max) * 100);
  const percentageRemaining = $derived(100 - usedPercentage);

  // const color = $derived.by(() => {
  //   if (percentageRemaining < 15) return "bg-red-500 dark:bg-red-400";
  //   if (percentageRemaining < 35) return "bg-orange-500 dark:bg-orange-400";
  //   if (percentageRemaining < 50) return "bg-yellow-500 dark:bg-yellow-400";
  //   return "bg-green-500 dark:bg-green-400";
  // });
</script>

<div class={twMerge("flex w-full flex-col gap-2", className)}>
  {#if !(baronly ?? false)}
    <div class="flex items-center justify-between gap-x-4 font-medium">
      <span id={labelId}>{label}</span>
      <span>{value} / {max}{unit ? " " + unit : ""}</span>
    </div>
  {/if}
  <Meter.Root
    aria-labelledby={labelId}
    aria-valuetext="{value} out of {max}"
    {value}
    {min}
    {max}
    class="clip-pixel shadow-mini-inset relative z-10 h-[15px] overflow-hidden bg-green-950/50"
  >
    <div class="border-pixel-progress clip-pixel absolute inset-0 z-0 h-full w-full"></div>
    <div
      class="shadow-mini-inset clip-pixel absolute -z-1 h-full w-full flex-1 bg-green-500 transition-all duration-1000 ease-in-out"
      style="transform: translateX(-{100 - (100 * (value ?? 0)) / max}%)"
    ></div>
  </Meter.Root>
</div>
