<!-- src/routes/quiz/[category]/+page.svelte -->
<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { goto } from "$app/navigation";
  export let data;

  let { category, questions } = data;

  // Ensure questions exist to prevent crashes
  let currentQuestionIndex = 0;
  let selectedAnswer: string | null = null;
  let stats = new Set<string>();
  let showResult = false;
  let isCorrect = false;
  let answered = false;

  // Prevent undefined errors by setting a default
  $: currentQuestion = questions?.[currentQuestionIndex] ?? null;
  $: progress = questions.length > 0 ? (currentQuestionIndex / questions.length) * 105 : 0;
  $: isLastQuestion = questions.length > 0 && currentQuestionIndex === questions.length - 1;

  function selectAnswer(answer: string) {
    if (answered || !currentQuestion) return;
    selectedAnswer = answer;
    isCorrect = answer === currentQuestion.correctAnswer;
    showResult = true;
    answered = true;
    if (isCorrect) stats.add(currentQuestion.subCat);
  }

  function nextQuestion() {
    if (isLastQuestion) return;
    currentQuestionIndex++;
    selectedAnswer = null;
    showResult = false;
    answered = false;
  }
  function navigateToExplore() {
    goto("/explore");
  }
</script>

<svelte:head>
  <title>{category} Trivia - Question {currentQuestionIndex + 1}</title>
</svelte:head>

<div class="font-body mx-auto justify-items-center bg-black p-8">
  {#if questions.length > 0}
    <!-- Progress bar -->
    <div class="relative mb-8 h-5 w-full max-w-2xl rounded-xl bg-stone-600">
      <div
        class="h-full rounded-xl bg-amber-400 transition-all"
        style={`width: ${progress}%`}
      ></div>
    </div>

    <!-- Question Card -->
    <div class="max-w-2xl rounded-xl bg-stone-700 p-8 shadow-lg">
      {#if currentQuestion?.image}
        <img
          src={currentQuestion.image}
          alt=""
          class="mb-6 max-h-80 w-full rounded-xl object-cover text-stone-300"
        />
      {/if}

      <details class="mb-4">
        <summary class="font-pixel cursor-pointer font-medium text-amber-300"> more info </summary>
        <p class="mt-2 font-sans text-stone-300">{currentQuestion?.info}</p>
      </details>

      <h1 class="mb-6 text-xl font-semibold text-stone-100">{currentQuestion?.question}</h1>

      <div class="mb-6 grid grid-cols-1 gap-4">
        {#each currentQuestion?.choices as choice}
          <button
            class="cursor-pointer rounded-xl border-2 border-stone-400 bg-stone-100 p-4 text-left font-semibold text-stone-900 transition-all hover:bg-stone-300"
            class:selected={selectedAnswer === choice}
            class:correct={showResult && choice === currentQuestion.correctAnswer}
            class:wrong={showResult && selectedAnswer === choice && !isCorrect}
            on:click={() => selectAnswer(choice)}
            disabled={answered}
          >
            {choice}
          </button>
        {/each}
      </div>

      {#if showResult}
        <div
          class="mb-6 rounded-xl p-4 font-bold text-stone-100"
          class:selected={isCorrect}
          class:incorrect={!isCorrect}
        >
          {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
          {#if !isCorrect}
            <div class="mt-2 font-normal">
              Correct answer: {currentQuestion.correctAnswer}
            </div>
          {/if}
          <div class=" mt-2 text-amber-300">
            Explaination : <span class="font-normal text-stone-100">{currentQuestion.explain}</span>
          </div>
        </div>

        <div class="flex justify-center">
          {#if !isLastQuestion}
            <button
              on:click={nextQuestion}
              class="font-pixel cursor-pointer rounded-xl border-2 border-amber-500 bg-amber-300 px-8 py-2 text-lg font-semibold text-amber-950 transition-colors hover:bg-amber-400"
              >Next Question</button
            >
          {:else}
            <div class="font-pixel text-center">
              <h3 class="mb-4 text-2xl text-amber-300">Quiz Complete!</h3>
              <p class=" mb-4 text-stone-50">
                Your score: {stats.size}/{questions.length}
              </p>
              <div class="mb-8">
                {#each stats as subCat}
                  <div class="font-pixel font-semibold text-stone-100">
                    {subCat} <span class="font-bold text-amber-300">+1</span>
                  </div>
                {/each}
              </div>
              <Button onclick={navigateToExplore} class="px-8 text-2xl font-bold"
                >Back to Explore</Button
              >
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {:else}
    <p>No questions available for this category.</p>
    <Button onclick={navigateToExplore} class="px-8 text-2xl font-bold uppercase"
      >Back to Explore</Button
    >
  {/if}
</div>
