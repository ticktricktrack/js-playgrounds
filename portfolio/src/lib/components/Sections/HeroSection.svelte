<script lang="ts">
    import { goto } from "$app/navigation";
    import Button from "$components/Button.svelte";

    function onclick() {
      goto("/contact-form");
    }
</script>

<section class="hero-section default-margin">
  <h3>Hello! I'm Rainer</h3>
  <div class="underscore mb-m"></div>
  <h1>I'm a Ruby Dev</h1>
  <h1 class="dark-grey mb-m">hopping over to Svelte</h1>
  <Button {onclick}>Let's talk</Button>
</section>

<style>
  .hero-section {
    padding-top: 60px;
  }
</style>
