<script lang="ts">
  import Button from "$lib/components/Button.svelte";
</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<div
  class="relative flex min-h-screen w-full items-center justify-center bg-[url(/sky.jpg)] bg-cover"
>
  <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/0"></div>
  <div class="z-10 flex flex-col items-center justify-center gap-6 rounded px-8 py-8 text-white">
    <h1 class="font-pixel text-5xl font-bold text-amber-300 drop-shadow-md">Welcome to Name</h1>
    <p class="text-center">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      <br />
      Vero quasi atque inventore laborum, facere in!
    </p>
    <Button>Play now</Button>
  </div>
</div>
