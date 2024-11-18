<script>
  import { fly } from "svelte/transition";
  import Header from "./Header.svelte";

  let formState = $state({
    answers: {},
    step: 0,
    error: '',
  })

  $inspect('step', formState.step);

  const QUESTIONS = [
    {
      question: "What's your name?",
      id: "name",
      type: "text",
    },
    {
      question: "What's your birthday?",
      id: "birthday",
      type: "date",
    },
    {
      question: "What's your favorite color?",
      id: "color",
      type: "color",
    },
  ]

  function nextStep(id) {
    if (!formState.answers[id]) {
      formState.error = 'Please fill out this field'
      return
    }
    formState.step += 1;
    formState.error = '';
  }

  $effect(() => {

  });
</script>

<Header name={formState.answers.name} />
<main>
  {#if formState.step >= QUESTIONS.length}
    <p>Thank you for filling out the form!</p>
  {:else}
    <p>Step: {formState.step + 1}</p>
  {/if}

  {#each QUESTIONS as question, index (question.id)}
    {#if formState.step === index}
      <div
        in:fly={{ x: 200, duration: 200, opacity: 0, delay: 200}}
        out:fly={{ x: -200, duration: 200, opacity: 0}}
      >
        {@render formStep(question)}
      </div>
    {/if}
  {/each}

  {#if formState.error}
    <p class="error">Error: {formState.error}</p>
  {/if}
</main>

{#snippet formStep({question, id, type})}
  <article>
    <div>
      <label for="id">{question}</label>
      <input {type} {id} bind:value={formState.answers[id]} />
    </div>
    <button onclick={() => nextStep(id)}>Next</button>
  </article>
{/snippet}

<style>
  main {
    padding: 20px;
  }

  .error {
    color: red;
  }
</style>
