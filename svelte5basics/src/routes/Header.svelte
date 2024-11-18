<script lang="ts">
  import { createState, CreateState2 } from './state.svelte';
  let { name } = $props();

  const myState = createState();
  const myState2 = new CreateState2();
</script>
<div>
  <h1>Hello <span>{name ? name : 'there'}</span></h1>
  <button onclick={myState.up}>{myState.value}</button>
  <button onclick={() => myState2.up()}>{myState2.value}</button>
</div>

<style>
  h1 {
    color: #b21510cf;
  }

  h1 span {
    color: #d1d1d1;
  }
</style>
