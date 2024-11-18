<script>
  import Header from "./Header.svelte";
  let name = $state("TricTrac");
  let status = $state("OPEN");
  let full_name = $derived(name + ' ' + 'Duck');

  function onclick() {
    status = status === "OPEN" ? "CLOSED" : "OPEN";
  }
</script>

<Header {name} />
<h2>{full_name}</h2>

<input type="text" bind:value={name} />

<p>The store is now {status} </p>
<button {onclick}>Toggle Status</button>
