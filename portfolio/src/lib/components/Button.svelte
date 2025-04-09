<script lang="ts">
  import type { Snippet } from "svelte";

  type ButtonProps = {
    children: Snippet;
    onclick: ((e: MouseEvent) => void) | (() => void);
    className?: string;
  };
  const { children, className, onclick }: ButtonProps = $props();
</script>

<button class="btn {className}" onclick={onclick}>
  {@render children()}
</button>

<style>
  .btn {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 500;
    background-color: black;
    color: white;
    font-size: 24px;
    padding: 14px 40px;
    border-radius: 10px;
  }
</style>
