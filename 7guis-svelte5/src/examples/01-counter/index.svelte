<script>
  let count = $state(0);
</script>

<div class="flex-gap">
  <input type="number" bind:value={count} disabled />
  <button onclick={() => count += 1}>Count</button>
</div>
