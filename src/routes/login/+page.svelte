<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import { twMerge } from "tailwind-merge";
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  interface Props {
    form: ActionData;
  }

  let { form }: Props = $props();

  let isLogin = $state(false);
  let isMale: boolean = $state(true);

  let action = $derived(isLogin ? "Log in" : "Sign up");

  $effect(() => {
    if (form?.success === true) {
      goto("/room");
    }
  });
</script>

<div class="font-pixel flex min-h-screen w-full items-center justify-center bg-stone-900">
  <form
    class="bg-wood border-pixel-wood clip-pixel mx-4 w-md px-8 py-6 text-white"
    method="POST"
    use:enhance
  >
    <h1 class="mb-4 text-2xl font-bold">{action}</h1>
    <input type="hidden" name="action" value={isLogin ? "login" : "signup"} />
    <div class="space-y-2">
      <label class="block">
        <p class="mb-1">Username</p>
        <input
          type="text"
          name="username"
          class="border-pixel-wood clip-pixel block w-full bg-white/20 px-3 py-2 outline-none focus-visible:bg-white/30"
          placeholder="skibidi"
        />
      </label>
      {#if !isLogin}
        <label class="block">
          <p class="mb-1">Email</p>
          <input
            type="text"
            name="email"
            class="border-pixel-wood clip-pixel block w-full bg-white/20 px-3 py-2 outline-none focus-visible:bg-white/30"
            placeholder="user@example.com"
          />
        </label>
      {/if}
      <label class="block">
        <p class="mb-1">Password</p>
        <input
          name="password"
          type="password"
          class="border-pixel-wood clip-pixel block w-full bg-white/20 px-3 py-2 outline-none focus-visible:bg-white/30"
          placeholder="••••••••"
        />
      </label>
      {#if !isLogin}
        <p>Appearance</p>
        <input type="hidden" name="gender" value={isMale ? "male" : "female"} />
        <div class="flex gap-x-3">
          <button type="button" onclick={() => (isMale = true)}>
            <img
              src="/pfpboy.png"
              alt=""
              class={twMerge(
                "rounded-xl border-4 border-transparent",
                isMale === true && "border-amber-300",
              )}
            />
          </button>
          <button type="button" onclick={() => (isMale = false)}>
            <img
              src="/pfpgirl.png"
              alt=""
              class={twMerge(
                "rounded-xl border-4 border-transparent",
                isMale === false && "border-amber-300",
              )}
            />
          </button>
        </div>
      {/if}
    </div>

    <p class="my-4 text-red-400">{form?.error}</p>

    <div class="my-2 flex justify-between">
      <Button>{action}</Button>
      <button
        type="button"
        onclick={() => (isLogin = !isLogin)}
        class="cursor-pointer hover:underline"
      >
        {#if isLogin}
          Sign up instead?
        {:else}
          Log in instead?
        {/if}
      </button>
    </div>
  </form>
</div>
