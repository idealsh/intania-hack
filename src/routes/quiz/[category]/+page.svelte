<!-- src/routes/quiz/[category]/+page.svelte -->
<script lang="ts">
  export let data;

  let { category, questions } = data;

  // Ensure questions exist to prevent crashes
  let currentQuestionIndex = 0;
  let selectedAnswer: string | null = null;
  let score = 0;
  let showResult = false;
  let isCorrect = false;
  let answered = false;

  // Prevent undefined errors by setting a default
  $: currentQuestion = questions?.[currentQuestionIndex] ?? null;
  $: progress = questions.length > 0 ? (currentQuestionIndex / questions.length) * 110 : 0;
  $: isLastQuestion = questions.length > 0 && currentQuestionIndex === questions.length - 1;

  function selectAnswer(answer: string) {
    if (answered || !currentQuestion) return;
    selectedAnswer = answer;
    isCorrect = answer === currentQuestion.correctAnswer;
    showResult = true;
    answered = true;
    if (isCorrect) score++;
  }

  function nextQuestion() {
    if (isLastQuestion) return;
    currentQuestionIndex++;
    selectedAnswer = null;
    showResult = false;
    answered = false;
  }
</script>

<svelte:head>
  <title>{category} Trivia - Question {currentQuestionIndex + 1}</title>
</svelte:head>

<div class="mx-auto justify-items-center bg-black p-8">
  {#if questions.length > 0}
    <!-- Progress bar -->
    <div class="relative mb-8 h-5 w-full max-w-2xl rounded-xl bg-stone-600">
      <div
        class="h-full rounded-xl bg-green-600 transition-all"
        style={`width: ${progress}%`}
      ></div>
    </div>

    <!-- Question Card -->
    <div class="max-w-2xl rounded-xl bg-stone-700 p-8 shadow-lg">
      {#if currentQuestion?.image}
        <img
          src={currentQuestion.image}
          alt="ภาพประกอบ"
          class="mb-6 max-h-80 w-full rounded-xl object-cover"
        />
      {/if}

      <details class="mb-4">
        <summary class="cursor-pointer font-sans font-medium text-stone-300"> more info </summary>
        <p class="mt-2 font-sans text-stone-300">{currentQuestion?.info}</p>
      </details>

      <h1 class="mb-6 text-xl text-stone-100">{currentQuestion?.question}</h1>

      <div class="mb-6 grid grid-cols-1 gap-4">
        {#each currentQuestion?.choices as choice}
          <button
            class="cursor-pointer rounded-xl border-2 border-stone-400 bg-stone-100 p-4 text-left text-stone-900 transition-all hover:bg-stone-300"
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
        </div>

        <div class="flex justify-center">
          {#if !isLastQuestion}
            <button
              on:click={nextQuestion}
              class="rounded-xl bg-green-500 px-6 py-3 text-white transition-all hover:bg-green-600"
              >Next Question</button
            >
          {:else}
            <div class="text-center">
              <h3 class="mb-4 text-2xl text-stone-800">Quiz Complete!</h3>
              <p class="mb-6 text-lg">Your score: {score}/{questions.length}</p>
              <a
                href="/quiz"
                class="rounded-xl bg-blue-500 px-6 py-3 text-white transition-all hover:bg-blue-600"
                >Choose Another Category</a
              >
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {:else}
    <p>No questions available for this category.</p>
    <a
      href="/quiz"
      class="rounded-xl bg-blue-500 px-6 py-3 text-white transition-all hover:bg-blue-600"
      >Choose Another Category</a
    >
  {/if}
</div>

<style>
  h1,
  a,
  button {
    font-family: "Fusion Pixel 10px Proportional SC", sans-serif;
  }
</style>
