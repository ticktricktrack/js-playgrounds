<script>
  let celcius = $state(20);
  let fahrenheit = $state(68);

  function toFahrenheit() {
    fahrenheit = celcius * 9 / 5 + 32;
  }

  function toCelcius() {
    celcius = (fahrenheit - 32) * 5 / 9;
  }

</script>

<div class="flex-gap">
  <span>Celcius</span><input type="number" bind:value={celcius} onchange={toFahrenheit}/>
  <span>Stupid Fahrenheit</span><input type="number" bind:value={fahrenheit} onchange={toCelcius}/>
</div>
