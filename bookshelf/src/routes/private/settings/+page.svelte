<script lang="ts">
  import Button from "$components/button.svelte";
  import { getUserState } from "$lib/state/user-state.svelte";

  let userContext = getUserState();
  let userName = $state(userContext.userName || "");
  let email = $state(userContext.user?.email || "");
  let isEditMode = $state(false);

  let averageRating = $derived.by(() => {
    const ratedBooks = userContext.allBooks.filter(book => book.rating);
    const averageRating = ratedBooks.reduce((acc, book) => acc + book.rating, 0) / ratedBooks.length;
    return averageRating.toFixed(1);
  });

  $effect(() => {
    if (userContext.userName) {
      userName = userContext.userName;
    }
  });

  async function toggleEditMode() {
    if (isEditMode) {
      await userContext.updateAccountDetails(userName, email);
      isEditMode = false;
    }
    else {
      isEditMode = true;
    }
  }

  async function deleteAccount() {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    await userContext.deleteAccount();
  }
</script>

<div class="settings-page">
  <div class="settings-container">
    <h2>Settings</h2>
    <h5 class="mt-m mb-ms semi-bold">Username</h5>
    {#if isEditMode}
      <input type="text" name="userName" bind:value={userName} />
    {:else}
      <h3>{userName}</h3>
    {/if}

    <h5 class="mt-m mb-ms semi-bold">Email</h5>
    {#if isEditMode}
      <input type="text" name="email" bind:value={email} />
    {:else}
      <h3>{email}</h3>
    {/if}
    <div class="buttons-container mt-l">
      <Button isSecondary={true} onclick={toggleEditMode}>
        {isEditMode ? "Save" : "Edit"}
      </Button>
      <Button isDanger={true} onclick={deleteAccount}>
        Delete account
      </Button>
    </div>
  </div>

  <div class="stats-container">
    <h4 class="semi-bold">Books on shelf</h4>
    <h3>{userContext.allBooks.length}</h3>
    <h5 class="semi-bold mt-m">
      {userContext.allBooks.filter(book => book.finished_on).length} read
    </h5>
    <h5 class="semi-bold mt-m">Average rating given {averageRating} Stars</h5>
  </div>
</div>

<style>
  .settings-page {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
  }

  .settings-container {
    margin-right: 80px;
  }

  .settings-container input {
    width: 100%;
  }

  .stats-container {
    min-width: 25%;
    border-radius: 12px;
    padding: 8px 24px;
    background-color: rgba(255, 255, 255, 0.5);
    margin-bottom: 40px;
  }
</style>
