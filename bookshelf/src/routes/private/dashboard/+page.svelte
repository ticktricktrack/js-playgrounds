<script lang="ts">
  import Icon from "@iconify/svelte";
  import { BookCategory } from "$components";
  import { getUserState } from "$lib/state/user-state.svelte";

  let userContext = getUserState();
  let { allBooks } = $derived(userContext);
  let { userName } = $derived(userContext);
</script>

<div class="dashboard">
  <div class="dashboard-header mb-m">
    <a href="/private/scan-shelf" class="add-book">
      <Icon icon="icons8:plus" width="72" height="72" />
      <p>Add a book</p>
    </a>
    <div class="headline">
      <h3 class="bold mb-xs">Welcome back, {userName}</h3>
      <p>There is nothing quite like the journey a good book can take you on. Have you discovered any new favorites recently?</p>
    </div>
  </div>

  {#if allBooks.length}
    <BookCategory booksToDisplay={userContext.getCurrentlyReadingBooks()}
      categoryName={"Currently Reading"}
    />

    <BookCategory booksToDisplay={userContext.getHighestRatedBooks()}
      categoryName={"Most loved Books"}
    />
    <BookCategory booksToDisplay={userContext.getUnreadBooks()}
      categoryName={"Recently added, unread books"}
    />
    <BookCategory booksToDisplay={userContext.getFavoriteGenreBooks()}
      categoryName={`${userContext.getFavoriteGenre()} Favorites`}
    />
  {:else}
    <a href="/private/scan-shelf" class="upload-hint mt-l">
      <h3>
        You have no books in your library at this moment. Click here to get
        started!
      </h3>
      <div class="mt-m">
        <Icon icon="icons8:plus" width={"72"} height={"72"} />
        <p>Add books</p>
      </div>
    </a>
  {/if}
</div>

<style>
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  .add-book {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .add-book p {
    margin-left: 8px;
  }

  .headline {
    text-align: right;
    max-width: 30%;
    min-width: 300px;
  }


  .upload-hint div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
