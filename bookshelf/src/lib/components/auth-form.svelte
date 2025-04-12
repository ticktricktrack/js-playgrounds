<script lang="ts">
  import { Button } from "$components";

  import type { ActionData } from "../../routes/register/$types";

  type Props = {
    isRegistration: boolean;
    form: ActionData;
  };

  const { isRegistration, form }: Props = $props();
</script>

<div class="default-margin auth-container">
  {#if isRegistration}
    <h1 class="mb-l">Register</h1>
  {:else}
    <h1 class="mb-l">Login</h1>
  {/if}
  <div class="form-and-social-login">
    <form class="auth-form" method="POST">
      {#if form && form.errors?.length}
        {#each form.errors as error}
          <div class="auth-error">
            {error}
          </div>
        {/each}
      {/if}

      {#if isRegistration}
        <input type="text" placeholder="Name" name="name"
               value={form?.name || ""} />
      {/if}
      <input type="email" placeholder="Email" name="email"
             value={form?.email || ""} />
      <input type="password" placeholder="Password" name="password"
             value={form?.password || ""} />
      {#if isRegistration}
        <input type="password" placeholder="Confirm Password" name="passwordConfirmation"
               value={form?.passwordConfirmation || ""} />
      {/if}
      <Button type="submit">{isRegistration ? "Register" : "Login"}</Button>

      {#if isRegistration}
        <p class="auth-hint mt-s">
          Do you have an account? <a href="/login">Login!</a>
        </p>
      {/if}
    </form>

    <div class="social-login">

    </div>
  </div>
</div>

<style>
  .auth-container {
    margin-top: 80px;
  }

  .form-and-social-login {
    display: flex;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    align-items: start;
    border-right: 1px solid grey;
    padding-right: 80px;
    width: 40%;
  }

  .auth-hint {
    font-size: 16px;
    color: grey;
  }

  .auth-error {
    background-color: rgb(122, 35, 35);
    color: white;
    font-size: 18px;
    border-radius: 12px;
    padding: 12px;
    width: 100%;
    margin-bottom: 8px;
  }

  .auth-error:last-of-type {
    margin-bottom: 16px;
  }

  .auth-form input {
    width: 100%;
    margin-bottom: 12px;
  }

  .auth-form input:last-of-type {
    margin-bottom: 30px;
  }

  .social-login {
    padding-left: 80px;
    width: 40%;
  }
</style>
