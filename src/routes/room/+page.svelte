<script>
  import Button from "$lib/components/Button.svelte";
  import Meter from "$lib/components/Meter.svelte";
</script>

<div
  class="flex min-h-screen flex-col items-center justify-center bg-stone-900 to-30% px-8 pt-6 text-white"
>
  <div class="flex w-full flex-grow flex-col sm:flex-row">
    <div class="font-pixel h-full flex-grow space-y-4 sm:w-1/2 sm:space-y-12">
      <div class="w-64">
        <div class="">
          <p class="mb-2 text-xl font-bold">User</p>
          <Meter label="Level 10" unit="XP" min={0} max={100} value={42}></Meter>
        </div>
      </div>
      <div>
        <p class="mb-2 text-xl">Daily tasks:</p>
        <ul>
          <li>- Explore 1 island</li>
          <li>- Explore all islands</li>
        </ul>
      </div>
    </div>
    <div class="flex flex-grow items-center select-none">
      <div class="relative h-fit">
        <img src="/rooms/room1.png" alt="" srcset="" class="w-192 object-contain" />
        <img src="/boyidle.gif" alt="" class="absolute right-[30%] bottom-[20%] h-24" />
      </div>
    </div>
    <div class="w-1/2 flex-grow"></div>
  </div>
  <div class="pb-12">
    <Button class="w-64 text-2xl font-bold uppercase">Go adventure!</Button>
  </div>
</div>
