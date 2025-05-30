<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import Meter from "$lib/components/Meter.svelte";

  import { Dialog } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  const { data } = $props();

  const pfpLink = data.isBoy ? "/pfpboy.png" : "/pfpgirl.png";
  const idleAvatarLink = data.isBoy ? "/boyidle.gif" : "/girlidle.gif";
</script>

<Dialog.Root>
  <div
    class="font-pixel flex min-h-screen flex-col items-center justify-center bg-stone-900 to-30% px-6 py-8 text-white"
  >
    <div
      class="relative flex w-full flex-grow flex-col justify-start gap-x-4 gap-y-6 sm:flex-row sm:justify-between sm:gap-y-12"
    >
      <div class="h-full sm:w-1/2">
        <div class="w-full sm:w-80">
          <div class="space-y-4">
            <Dialog.Trigger
              class="group bg-wood border-pixel-wood clip-pixel flex w-full cursor-pointer items-center justify-between px-6 py-3 text-left transition-all hover:scale-105"
            >
              <p class="text-xl font-bold">{data.name}</p>
              <div class="-mx-1.5 inline-flex -translate-x-2 items-center gap-x-1">
                <img src="/fire.png" alt="" class="h-6" />
                <span>{data.streak} days</span>
              </div>
            </Dialog.Trigger>
            <Meter
              label="Level {data.level}"
              unit="XP"
              min={0}
              max={100}
              value={data.xp}
              class="px-4"
            ></Meter>
          </div>
        </div>
      </div>
      <div class="px-4">
        <p class="mb-2 text-lg sm:text-xl">Daily tasks:</p>
        <ul>
          <li class="flex justify-between gap-x-6">
            <div>
              [{data.oneIslandFinished ? "x" : " "}]
              <span class:line-through={data.oneIslandFinished}>Explore 1 island</span>
            </div>
            <span>+15XP</span>
          </li>
          <li class="flex justify-between gap-x-6">
            <div>
              [{data.allIslandsFinished ? "x" : " "}]
              <span class:line-through={data.allIslandsFinished}>Complete all islands</span>
            </div>
            <span>+30XP</span>
          </li>
        </ul>
      </div>
      <div class="inset-0 flex items-center justify-center sm:absolute sm:mt-12">
        <div
          class="relative aspect-square max-h-[70vh] w-128 drop-shadow-[0_0_100px_rgba(255,184,106,0.3)] select-none"
        >
          <img src="/rooms/room{data.level}.png" alt="" srcset="" />
          <img
            src={idleAvatarLink}
            alt=""
            class="absolute right-[20%] bottom-[13%] h-[20%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <!-- <div class="w-1/2 flex-grow"></div> -->
    </div>
    <div class="pb-8">
      <Button class="px-8 py-4 text-2xl font-bold uppercase" onclick={() => goto("/explore")}>
        Start adventure!
      </Button>
    </div>
  </div>
  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 z-50 bg-black/50" />
    <Dialog.Content
      class="font-pixel absolute inset-0 z-60 flex min-h-screen w-full items-center justify-center px-4 text-white"
    >
      <div class="bg-wood clip-pixel border-pixel-wood w-md max-w-full space-y-4 px-8 py-6">
        <div class="relative">
          <Dialog.Title class="text-2xl">Profile</Dialog.Title>
          <Dialog.Close class="absolute top-0 right-0 w-6 cursor-pointer text-2xl font-bold"
            >x</Dialog.Close
          >
          <div class="flex gap-x-4">
            <img src={pfpLink} alt="" class="h-auto w-auto object-contain" />
            <div class="flex-grow">
              <p>{data.name}</p>
              <Meter label="Level {data.level}" unit="XP" min={0} max={100} value={data.xp}></Meter>
            </div>
          </div>
        </div>
        <div>
          <h1 class="text-2xl">Skills</h1>
          <div class="grid w-full grid-cols-[auto_1fr] items-center gap-x-4">
            {#each Object.entries(data.stats) as [title, scores], i}
              <h2 class="col-span-2 mt-3 mb-1 text-lg font-bold">
                <img
                  src={i === 0 ? "math.png" : i === 1 ? "sci.png" : "gen.png"}
                  alt=""
                  class="inline h-6"
                />
                {title}
              </h2>
              {#each Object.entries(scores) as [name, value]}
                <span>{name}</span>
                <Meter
                  min={0}
                  max={1}
                  {value}
                  baronly
                  class={twMerge(
                    i === 0 && "hue-rotate-90",
                    i === 1 && "hue-rotate-30",
                    i === 2 && "brightness-125 hue-rotate-280",
                  )}
                />
              {/each}
            {/each}
          </div>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
