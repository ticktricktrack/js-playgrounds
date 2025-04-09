<script lang="ts">
  import type { Snippet } from "svelte";

  type SectionHeadlineProps = {
    children: Snippet;
    sectionName: string;
  };

  const { children, sectionName }: SectionHeadlineProps = $props();
</script>

<div class="default-margin" id={sectionName}>
  <h2>{@render children()}</h2>
  <div class="underscore"></div>
</div>
