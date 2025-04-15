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

  <BookCategory booksToDisplay={userContext.getHighestRatedBooks()}
    categoryName={"Most loved Books"}
  />
  <BookCategory booksToDisplay={userContext.getUnreadBooks()}
    categoryName={"Recently added, unread books"}
  />
  <BookCategory booksToDisplay={userContext.getFavoriteGenreBooks()}
    categoryName={`${userContext.getFavoriteGenre()} Favorites`}
  />
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
</style>
