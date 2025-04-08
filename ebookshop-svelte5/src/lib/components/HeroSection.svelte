<script>
  import bookCover from "$assets/book_cover.png";
  import phoneCover from "$assets/phone_cover.png";
</script>

<section class="hero">
  <div class="hero-showcase text-center bold">
    <h1 class="purple">LUSTIGES</h1>
    <h1 class="purple mb-xs">TASCHENBUCH</h1>
    <h4 class="italic semi-bold">
      There's no need to make the same mistakes I made.
    </h4>
    <img class="book-cover" src="{bookCover}" alt=""/>
    <img class="phone-cover" src="{phoneCover}" alt=""/>
  </div>

  <div class="hero-text white text-center">
    <h1>Onkel Dagobert</h1>
    <h1>und der</h1>
    <h1 class="mb-m">Infinity-Taler</h1>
    <p class="light-grey">Marvel trifft Entenhausen! Und Dagobert Duck trifft … Dagobert Duck, oder vielmehr mehrere Versionen seiner selbst aus unterschiedlichen Paralleluniversen – mit ihrem einen Schatz, dem wohlbehüteten Glückszehner, der Nummer eins, dem Infinity-Taler! Da bleibt es nicht aus, dass jener eine Dagobert, der griesgrämigste von allen, sämtliche Zehner vereinen will, um seine anderen Dagobert- Varianten zu unterjochen und der Reichste aller Welten zu werden. Kann die Macht des Über-Dagobert gebrochen werden?</p>
  </div>
</section>

<style>
  .book-cover {
    rotate: -6deg;
    width: 65%;
    position: absolute;
    right: 10%;
    bottom: 0;
    transform: translateY(30%);
  }

  .phone-cover {
    position: absolute;
    width: 35%;
    bottom: 0;
    right: 52%;
    transform: translateY(25%);
  }

  .hero {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .hero-showcase {
    position: relative;
    width: 50%;
    padding: 100px 16px 0 16px;
    background: linear-gradient(
      135deg,
      #e2cbff 0%,
      #e2cbff 25%,
      #deeaff 50%,
      #ece5ff 75%,
      #925bce
    )
  }

  .hero-text {
    background: #111111;
  }
</style>
