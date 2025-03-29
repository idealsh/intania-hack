<script>
  import Button from "$lib/components/Button.svelte";
  import Meter from "$lib/components/Meter.svelte";
</script>

<div class="relative flex min-h-screen items-stretch justify-center bg-stone-900 text-white">
  <div class="font-pixel h-full w-1/2 flex-grow space-y-12 pt-8 pl-8">
    <div class="w-64">
      <div class="">
        <p class="mb-2 text-xl font-bold">User</p>
        <Meter label="Level 10" unit="XP" min={0} max={100} value={42}></Meter>
      </div>
    </div>
    <div>
      <p class="mb-2 text-xl">Daily tasks:</p>
      <ul>
        <li>- Do 1 challenge</li>
      </ul>
    </div>
  </div>
  <div class="flex flex-grow items-center select-none">
    <div class="relative h-fit">
      <img src="/rooms/room1.png" alt="" srcset="" class="w-192 object-contain" />
      <img src="/boyidle.gif" alt="" class="absolute right-[30%] bottom-[20%] h-24" />
    </div>
  </div>
  <div class="w-1/2 flex-grow">a</div>
  <div class="absolute bottom-12 left-1/2 -translate-x-1/2">
    <Button class="w-64 text-2xl font-bold uppercase">Go adventure!</Button>
  </div>
</div>
