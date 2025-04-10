<script lang="ts">
  import {Header} from "$components";
import "./../app.css";

  const { children } = $props();
</script>

<Header />
{@render children()}
