<script lang="ts">
  import { Footer, Header } from "$components";

  import "../app.css";

  const { children } = $props();
</script>

<Header />
{@render children()}
<Footer />
