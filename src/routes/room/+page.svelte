<script>
  import Button from "$lib/components/Button.svelte";
  import Meter from "$lib/components/Meter.svelte";
</script>

<div
  class="flex min-h-screen flex-col items-center justify-center bg-stone-900 to-30% px-12 py-8 text-white"
>
  <div
    class="font-pixel relative flex w-full flex-grow flex-col justify-start gap-y-6 sm:flex-row sm:justify-between sm:gap-y-12"
  >
    <div class="h-full sm:w-1/2">
      <div class="w-64">
        <div class="space-y-4">
          <p class="text-xl font-bold">User</p>
          <Meter label="Level 10" unit="XP" min={0} max={100} value={42}></Meter>
          <div class="flex -translate-x-2 items-center gap-x-1.5">
            <img src="/fire.png" alt="" class="h-8" />
            <span>100 days</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-64">
      <p class="mb-2 text-xl">Daily tasks:</p>
      <ul>
        <li>- Explore 1 island</li>
        <li>- Explore all islands</li>
      </ul>
    </div>
    <div class="inset-0 flex items-center justify-center sm:absolute sm:mt-12">
      <div
        class="relative aspect-square max-h-[70vh] w-128 drop-shadow-[0_0_100px_rgba(255,184,106,0.3)] select-none"
      >
        <img src="/rooms/room1.png" alt="" srcset="" />
        <img
          src="/boyidle.gif"
          alt=""
          class="absolute right-[25%] bottom-[12%] h-[20%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
    <!-- <div class="w-1/2 flex-grow"></div> -->
  </div>
  <div class="pb-8">
    <Button class="w-64 text-2xl font-bold uppercase">Go adventure!</Button>
  </div>
</div>
