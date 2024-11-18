<script>
  class Temperature {
    #celcius = $state(20);
    #fahrenheit = $state(68);

    get celcius() {
      return this.#celcius;
    }

    set celcius(value) {
      this.#celcius = value;
      this.#fahrenheit = value * 9 / 5 + 32;
    }

    get fahrenheit() {
      return this.#fahrenheit;
    }

    set fahrenheit(value) {
      this.#fahrenheit = value;
      this.#celcius = (value - 32) * 5 / 9;
    }
  }

  const temperature = new Temperature();
</script>

<div class="flex-gap">
  <span>Celcius</span><input type="number" bind:value={temperature.celcius} />
  <span>Stupid Fahrenheit</span><input type="number" bind:value={temperature.fahrenheit} />
</div>
