<script>
  import Button from "$lib/components/Button.svelte";

  let { form } = $props();

  let isLogin = $state(false);

  let action = $derived(isLogin ? "Log in" : "Sign up");
</script>

<div class="font-pixel flex min-h-screen w-full items-center justify-center bg-stone-900">
  <form class="bg-wood border-pixel-wood clip-pixel mx-4 w-md px-8 py-6 text-white" method="POST">
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
    </div>

    <p class="my-4 text-red-400">{form?.error}</p>

    <div class="my-2 flex gap-6">
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
