<script>
  let count = $state(0);
</script>

<div class="flex-gap">
  <input type="text" bind:value={count} disabled />
  <button onclick={() => count += 1}>Count</button>
</div>
