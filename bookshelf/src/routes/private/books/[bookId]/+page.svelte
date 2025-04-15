<script lang="ts">
  import type { Book } from "$lib/state/user-state.svelte";

  import Icon from "@iconify/svelte";
  import { Button, StarRating } from "$components";
  import { getUserState } from "$lib/state/user-state.svelte";
  import Dropzone from "svelte-file-dropzone";

  type BookPageProps = {
    data: {
      book: Book;
    };
  };
  let { data }: BookPageProps = $props();

  let userContext = getUserState();

  let book = $derived(userContext.getBookById(data.book.id) || data.book);
  let editMode = $state(false);

  let title = $state(book.title);
  let author = $state(book.author);
  let description = $state(book.description || "");
  let rating = $state(book.rating || 0);
  let genre = $state(book.genre || "");

  function goBack() {
    history.back();
  }

  async function toggleEditMode() {
    if (editMode) {
      await userContext.updateBook(book.id, {
        title,
        author,
        description,
        genre,
      });
    }

    editMode = !editMode;
  }

  async function updateReadingStatus() {
    const hasStartedReading = Boolean(book.started_on);
    if (hasStartedReading) {
      await userContext.updateBook(book.id, { finished_on: new Date().toISOString() });
    }
    else {
      await userContext.updateBook(book.id, { started_on: new Date().toISOString() });
    }
  }

  async function updateRating(newRating: number) {
    await userContext.updateBook(book.id, { rating: newRating });
  }

  async function handleDrop(e: CustomEvent<any>) {
    const { acceptedFiles } = e.detail;
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      await userContext.uploadBookCoverImage(book.id, file);
    }
  }
</script>

<div class="book-page">
  <button onclick={goBack} aria-label="Go back">
    <Icon icon="ep:back" width={40} />
  </button>
  <div class="book-container">
    <div class="book-info">
      {#if editMode}
        {@render editFields()}
      {:else}
        {@render bookInfo()}
      {/if}
      <div class="buttons-container mt-m">
        <Button isSecondary={true} onclick={toggleEditMode}>
          {editMode ? "Save Changes" : "Edit"}
        </Button>
        <Button isDanger={true} onclick={() => console.log("toggle delete mode")}>Delete from bookshelf</Button>
      </div>
    </div>
    <div class="book-cover">
      {@render bookCover()}
    </div>
  </div>
</div>

{#snippet bookCover()}
  {#if book.cover_image}
    <img src={book.cover_image} alt="Book Cover" />
  {:else}
    <Dropzone
      on:drop={handleDrop}
      multiple={false}
      accept="image/*"
      maxSize={5 * 1024 * 1024}
      containerClasses="dropzone-cover"
    >
    </Dropzone>
  {/if}
{/snippet}

{#snippet bookInfo()}
  <h2 class="book-title mt-m">{book.title}</h2>
  <p class="book-author">by {book.author}</p>
  <h4 class="mt-m mb-xs semi-bold">Your rating</h4>
  <StarRating value={book.rating || 0} isReadOnly={false} updateDatabaseRating={updateRating} />
  <p class="small-font">Click to {book.rating ? "change" : "give"} rating</p>
  {#if book.description}
    <h4 class="mt-m mb-xs semi-bold">Description</h4>
    <p class="mb-m">{book.description}</p>
  {:else}
    <h4 class="mt-m mb-ms semi-bold">No description yet</h4>
    <button class="block mb-m"
            onclick={() => console.log("toggle edit mode")}
    >
      <p>Click to add one</p>
    </button>
  {/if}

  {#if !book.finished_on}
    {@render buttons()}
  {/if}

  {#if book.genre}
    <h4 class="mt-m mb-xs semi-bold">Genre</h4>
    <p>{book.genre}</p>
  {/if}
{/snippet}

{#snippet editFields()}
  <form action="">
    <input type="text" name="title" class="input input-title mt-m mb-s" bind:value={title}>
    <div class="input-author">
      <input type="text" class="input" name="author" bind:value={author}>
    </div>
    <h4 class="mt-m mb-xs semi-bold">Your rating</h4>
    <StarRating value={rating} isReadOnly={false} updateDatabaseRating={updateRating} />
    <p class="small-font">Click to {book.rating ? "change" : "give"} rating</p>
    <h4 class="mt-m mb-xs semi-bold">Description</h4>
    <textarea class="textarea mb-m" name="description" rows="5" bind:value={description} placeholder="Give a description"></textarea>
    <h4 class="mt-m mb-xs semi-bold">Genre</h4>
    <input type="text" class="input" name="genre" bind:value={genre} placeholder="Add a genre, or multiples separated by commas">
  </form>
{/snippet}

{#snippet buttons()}
  <Button onclick={updateReadingStatus} isSecondary={book.started_on}>
    {book.started_on ? "I finished reading this book" : "I started reading this book"}
  </Button>
{/snippet}

<style>
  .book-container {
    display: flex;
    justify-content: flex-start;
  }

  .book-info {
    width: 50%;
  }

  .book-cover {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 15px;
    min-height: 400px;
    max-width: 450px;
    margin-left: 80px;
  }

  .book-cover img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .input {
    padding: 8px 4px;
    width: 100%;
  }

  .textarea {
    width: 100%;
  }

  .input-title {
    font-size: 60px;
    font-weight: bold;
    font-family: "EB Garamond", serif;
  }

  .input-author {
    display: flex;
    align-items: center;
  }

  :global(.dropzone-cover) {
    height: 100%;
    border-radius: 15px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    border: unset !important;
    cursor: pointer;
    border-style: solid !important;
    }
</style>
