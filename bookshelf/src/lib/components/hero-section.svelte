<script lang="ts">
  import { Button } from "$components";
  import heroImage from "$assets/hero.jpg";
</script>

<section class="default-margin hero">
  <div class="hero-text">
    <h1>Bookshelf</h1>
    <h3>Your personal book library.</h3>
    <h4 class="mt-l">
      Create your very own digital bookshelf where you can keep track of every book you own, read and love.
    </h4>
    <h4 class="mb-s">
      Our app offers a beautifully designed, easy to use interface that makes managing your books a joy.
    </h4>
    <Button href="">Sign up</Button>
  </div>
  <img src={heroImage} alt="A beautiful bookshelf" class="hero-image">
</section>

<style>
  .hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
  }

  .hero-image {
    width: 45%;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 55%;
    padding-right: 50px;
  }

  img {
    --color: #000000; /* the border color */
    --border: 10px;   /* the border thickness*/
    --offset: 20px;   /* control the offset*/
    --gap: 5px;       /* the gap on hover */

    /* internal variables */
    --_c: var(--color) var(--border), #0000 0 calc(100% - var(--border)),var(--color) 0;
    --_o: calc(3*var(--offset));
    /* */
    padding:
      calc(var(--gap) + var(--border))
      calc(var(--gap) + var(--border) + var(--offset))
      calc(var(--gap) + var(--border) + var(--offset))
      calc(var(--gap) + var(--border));
    background:
      linear-gradient(      var(--_c)) var(--_o) var(--_o),
      linear-gradient(90deg,var(--_c)) var(--_o) var(--_o);
    background-size: calc(100% - var(--_o)) calc(100% - var(--_o));
    background-repeat: no-repeat;
    filter: grayscale(.2);
    transition: .5s;
    cursor: pointer;
  }
  img:hover {
    background-position: 0px 0px;
    background-size: calc(100% - var(--offset)) calc(100% - var(--offset));
    filter: grayscale(0);
  }
</style>
