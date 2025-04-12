<script lang="ts">
  import { invalidate } from "$app/navigation";

  import "./../app.css";

  import { Header } from "$components";
  import { onMount } from "svelte";

  let { data, children } = $props();
  let { session, supabase, user } = $derived(data);

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
