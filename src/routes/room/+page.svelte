<script>
  import Button from "$lib/components/Button.svelte";
  import Meter from "$lib/components/Meter.svelte";
  import { goto } from "$app/navigation";

  import { Dialog } from "bits-ui";
  import { twMerge } from "tailwind-merge";

  const name = "Ideal";

  const oneIslandFinished = true;
  const allIslandsFinished = false;

  const streak = 99;
  const level = 4;
  const currentXP = 42;

  const isBoy = true;

  const pfpLink = isBoy ? "/pfpboy.png" : "/pfpgirl.png";
  const idleAvatarLink = isBoy ? "/boyidle.gif" : "/girlidle.gif";

  const stats = {
    Math: {
      Algebra: 0.5,
      Trigonometry: 0.21,
      "Prob. & Stats": 0.42,
    },
    Science: {
      Biology: 0.42,
      Chemistry: 0.21,
      Physics: 0.5,
    },
    "General Knowledge": {
      "Social Studies": 0.42,
      Psychology: 0.21,
      Environment: 0.5,
    },
  };

  function navigateToExplore() {
    goto("/explore");
  }
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
              <p class="text-xl font-bold">{name}</p>
              <div class="-mx-1.5 inline-flex -translate-x-2 items-center gap-x-1">
                <img src="/fire.png" alt="" class="h-6" />
                <span>{streak} days</span>
              </div>
            </Dialog.Trigger>
            <Meter label="Level {level}" unit="XP" min={0} max={100} value={42} class="px-4"
            ></Meter>
          </div>
        </div>
      </div>
      <div class="px-4">
        <p class="mb-2 text-lg sm:text-xl">Daily tasks:</p>
        <ul>
          <li class="flex justify-between gap-x-6">
            <div>
              [{oneIslandFinished ? "x" : " "}]
              <span class:line-through={oneIslandFinished}>Explore 1 island</span>
            </div>
            <span>+15XP</span>
          </li>
          <li class="flex justify-between gap-x-6">
            <div>
              [{allIslandsFinished ? "x" : " "}]
              <span class:line-through={allIslandsFinished}>Complete all islands</span>
            </div>
            <span>+30XP</span>
          </li>
        </ul>
      </div>
      <div class="inset-0 flex items-center justify-center sm:absolute sm:mt-12">
        <div
          class="relative aspect-square max-h-[70vh] w-128 drop-shadow-[0_0_100px_rgba(255,184,106,0.3)] select-none"
        >
          <img src="/rooms/room1.png" alt="" srcset="" />
          <img
            src={idleAvatarLink}
            alt=""
            class="absolute right-[25%] bottom-[12%] h-[20%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <!-- <div class="w-1/2 flex-grow"></div> -->
    </div>
    <div class="pb-8">
      <Button onclick={() => navigateToExplore()} class="px-8 py-4 text-2xl font-bold uppercase"
        >Start adventure!</Button
      >
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
              <p>{name}</p>
              <Meter label="Level {level}" unit="XP" min={0} max={100} value={currentXP}></Meter>
            </div>
          </div>
        </div>
        <div>
          <h1 class="text-2xl">Skills</h1>
          <div class="grid w-full grid-cols-[auto_1fr] items-center gap-x-4">
            {#each Object.entries(stats) as [title, scores], i}
              <h2 class="col-span-2 mt-3 mb-1 text-lg font-bold">{title}</h2>
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
