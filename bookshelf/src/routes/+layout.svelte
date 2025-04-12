<script lang="ts">
  import { invalidate } from "$app/navigation";

  import "./../app.css";

  import { Header } from "$components";
  import { setUserState } from "$components/state/user-state.svelte";

  let { data, children } = $props();
  let { session, supabase, user } = $derived(data);
  $inspect(supabase);

  let userState = setUserState({ session: data.session, supabase: data.supabase, user: data.user });

  $effect(() => {
    userState.updateState({ session, supabase, user });
  });

  $effect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });

  $inspect(session);
</script>

<Header />
{@render children()}
