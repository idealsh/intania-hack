<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
</script>

<div
  class="relative flex min-h-screen w-full flex-col items-center justify-center bg-[url(/sky.jpg)] bg-cover"
>
  <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/0"></div>
  <div
    class="font-pixel absolute top-8 rounded-md px-4 py-2 text-3xl font-bold
    "
  >
    <span class="text-slate-900 drop-shadow-[2px_2px_0px_#FFF]"> SQUIZZ </span>
  </div>
  <div class="z-10 flex flex-col items-center justify-center gap-12 rounded px-8 py-8 text-white">
    <h1
      class="font-pixel max-w-lg text-center text-4xl leading-tight font-bold text-amber-300 capitalize drop-shadow-[3px_3px_0px_#e17100] sm:text-6xl"
    >
      Start your quest for knowledge
    </h1>
    <div class="max-w-lg space-y-4 text-center sm:text-lg">
      <p>
        Make learning a daily habit with our regularly updated quizzes. Each day brings a new
        opportunity to learn and test your knowledge in an engaging way.
      </p>
      <p>Start your quest for knowledge today!</p>
    </div>
    <Button onclick={() => goto("/login")}>Play now</Button>
  </div>
</div>
