<script lang="ts">
  import Button from "$lib/components/Button.svelte";
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

  function selectIsland(island: Island) {
    selectedIsland = island.name;
  }

  function goToIsland(island: Island) {
    const islandName = island.name.toLowerCase();
    goto(`/quiz/${islandName}`);
  }
</script>

<div
  class="flex min-h-screen flex-col items-center justify-center space-y-20 bg-black p-4 text-white"
>
  <!-- Banner with text overlay -->
  <div class="relative h-20 w-[250px] -translate-y-10 md:w-[320px]">
    <!-- The Banner Image -->
    <img src="/islands/banner.png" alt="banner" class="h-full w-full" />

    <!-- Centered Overlay Text -->
    <h1
      class="text-md absolute inset-0 flex items-center justify-center px-2 text-center font-bold text-black md:text-xl"
    >
      Choose Island to Explore
    </h1>
  </div>
  <div class="flex -translate-y-10 flex-wrap justify-center gap-8 md:gap-26">
    {#each islands as island}
      <button
        type="button"
        class="relative flex w-40 flex-col items-center focus:outline-none md:w-98"
        on:click={() => goToIsland(island)}
        on:mouseenter={() => selectIsland(island)}
      >
        <p class="mt-2 text-lg md:text-3xl">{island.name}</p>
        <div
          class={`w-full p-1 transition duration-300 ${selectedIsland === island.name ? "drop-shadow-[0_0_30px_rgba(254,241,134,10)]" : ""}`}
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

<style>
  h1,
  p,
  span {
    font-family: "Fusion Pixel 10px Proportional SC", sans-serif;
  }
</style>
