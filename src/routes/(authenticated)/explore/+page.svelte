<script lang="ts">
  import { goto } from "$app/navigation";
  type Island = {
    name: string;
    img: string;
    progress: string;
  };

  let selectedIsland: string = "";
  const islands: Island[] = [
    { name: "Math", img: "/islands/Math.png", progress: "0/3" },
    { name: "General", img: "/islands/GeneralKnowledge.png", progress: "0/3" },
    { name: "Science", img: "/islands/Science.png", progress: "check" },
  ];

  function goToIsland(island: Island) {
    const islandName = island.name.toLowerCase();
    goto(`/quiz/${islandName}`);
  }
</script>

<div
  class="font-pixel flex min-h-screen flex-col items-center justify-center space-y-20 bg-stone-900 p-4 text-white"
>
  <div class="flex w-full items-center sm:mb-36 sm:px-12">
    <div class="w-1/2 flex-grow">
      <a
        class="cursor-pointer rounded-lg px-4 py-2 text-lg hover:bg-white/10 md:text-xl"
        href="/room"
      >
        ← Back <span class="hidden sm:inline">to room</span>
      </a>
    </div>
    <!-- Banner with text overlay -->
    <div class="relative h-20">
      <!-- The Banner Image -->
      <img src="/islands/banner.png" alt="banner" class="h-full w-full" />

      <!-- Centered Overlay Text -->
      <h1
        class="text-md absolute inset-0 flex items-center justify-center px-2 text-center font-bold text-black md:text-xl"
      >
        Choose Island to Explore
      </h1>
    </div>
    <div class="w-1/2 flex-grow"></div>
  </div>
  <div class="flex -translate-y-10 flex-wrap justify-center gap-8 md:gap-26">
    {#each islands as island}
      <button
        type="button"
        class="relative flex w-40 flex-col items-center focus:outline-none md:w-98"
        onclick={() => goToIsland(island)}
      >
        <p class="mt-2 text-lg md:text-3xl">{island.name}</p>
        <div
          class={`w-full p-1 transition duration-300 hover:drop-shadow-[0_0_30px_rgb(254,230,133,0.3)]`}
        >
          <img
            src={island.img}
            alt={island.name}
            class={`h-auto w-full cursor-pointer object-contain transition duration-500 ${selectedIsland === island.name ? "animate-bob" : ""}`}
          />
        </div>
        {#if island.progress === "check"}
          <!-- Short button + checkmark icon -->
          <div class="relative mt-1 h-8 w-8 md:h-14 md:w-14">
            <img src="/islands/buttonshort.png" alt="done" class="h-full w-full object-contain" />
            <img
              src="/islands/checkmark.png"
              alt="checkmark"
              class="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-5 md:h-12 md:w-12 md:-translate-y-7.5"
            />
          </div>
        {:else}
          <!-- Long button with progress text -->
          <div class="relative mt-1 flex w-30 items-center justify-center md:w-46">
            <img
              src="/islands/buttonlong.png"
              alt="progress"
              class="h-full w-full object-contain"
            />
            <span
              class="text-md absolute -translate-y-1.5 font-bold text-black md:-translate-y-2 md:text-xl"
              >{island.progress}</span
            >
          </div>
        {/if}
      </button>
    {/each}
  </div>
  <!-- GO BUTTON -->
</div>
