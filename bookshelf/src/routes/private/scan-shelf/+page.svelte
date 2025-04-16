<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Button } from "$components";
  import { getUserState } from "$lib/state/user-state.svelte";
  import { convertFileToBase64 } from "$lib/utils/helpers";
  import Dropzone from "svelte-file-dropzone";

  let isLoading = $state(false);
  let errorMessage = $state("");
  let booksSuccessfullyAdded = $state(false);
  let userContext = getUserState();

  type OpenAiBook = {
    author: string;
    bookTitle: string;
    description: string;
    genre: string;
  };
  let recognizedBooks = $state<OpenAiBook[]>([]);

  async function handleDrop(e: CustomEvent<any>) {
    isLoading = true;
    const { acceptedFiles } = e.detail;
    if (acceptedFiles.length > 0) {
      const fileToSendToOpenAi = acceptedFiles[0];
      const base64 = await convertFileToBase64(fileToSendToOpenAi);

      try {
        const response = await fetch("/api/scan-shelf", {
          method: "POST",
          body: JSON.stringify({ base64 }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json() as { bookArray: OpenAiBook[] };
        recognizedBooks = result.bookArray;
        isLoading = false;
      }
      catch (error) {
        errorMessage = "An error occurred while processing the image.";
      }
    }
    else {
      errorMessage = "Could not upload selected file. Check file size and type.";
    }
  }

  function removeBook(index: number) {
    recognizedBooks.splice(index, 1);
  }

  async function addAllBooks() {
    isLoading = true;
    try {
      await userContext.addBooksToShelf(recognizedBooks);
      isLoading = false;
      booksSuccessfullyAdded = true;
    }
    catch (error: any) {
      errorMessage = error.message;
    }
  }
</script>

<h2 class="mt-m mb-l">Take a picture of your books</h2>
{#if recognizedBooks.length === 0}
  {@render fileUpload()}
{:else if !booksSuccessfullyAdded}
  {@render recognizedBooksTable()}
{:else}
  <h4>The selected {recognizedBooks.length} have been added to your bookshelf</h4>
  <Button href="/private/dashboard">Go to your library</Button>
{/if}

{#snippet fileUpload()}
  <div class="upload-area">
    <div class="upload-container">
      {#if errorMessage}
        <h4 class="text-center mb-s upload-error">
          {errorMessage}
        </h4>
      {/if}
      {#if isLoading}
        <div class="spinner-container">
          <div class="spinner"></div>
          <p>Processing your books...</p>
        </div>
      {:else}
        <Dropzone
          on:drop={handleDrop}
          multiple={false}
          accept="image/*"
          maxSize={5 * 1024 * 1024}
          containerClasses="dropzone-cover"
        >
          <Icon icon="bi:camera-fill" width={60} />
          <p>Drag a picture here or click to select a file</p>
        </Dropzone>
      {/if}
    </div>
  </div>
{/snippet}

{#snippet recognizedBooksTable()}
  <div class="found-books">
    <table class="book-list mb-m">
      <thead>
        <tr>
          <th>Book Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each recognizedBooks as book, i}
          <tr>
            <td>{book.bookTitle}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>
              <button class="remove-book" aria-label="Remove book" onclick={() => removeBook(i)}><Icon icon="streamline:delete-1-solid" width={20} /></button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <Button onclick={addAllBooks}>Add all books</Button>
  </div>
{/snippet}

<style>
  .book-list {
    width: 800px;
    background-color: white;
    border-radius: 8px;
    border-collapse: collapse;
  }

  .book-list th {
    font-size: 18px;
    text-align: left;
    padding: 8px 16px;
    border-bottom: 3px solid black;
  }

  .book-list td {
    padding: 12px 16px;
    border-bottom: 1px solid rgb(205, 205, 205);
    font-size: 16px;
  }

  .book-list tr:last-child td {
    border-bottom: none;
  }
  :global(.remove-book svg) {
    color: red;
  }

  .upload-error {
    color: rgb(131, 0, 0);
  }

  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .upload-container {
    width: 600px;
  }

  .spinner-container {
    display: flex;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: black;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: inline-block;
    margin-right: 8px;
    animation: spin 0.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  :global(.dropzone-books) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 600px !important;
    min-height: 400px !important;
    flex: 0 !important;
    cursor: pointer;
  }
</style>
