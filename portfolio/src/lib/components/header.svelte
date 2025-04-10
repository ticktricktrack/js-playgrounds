<script>
  import { goto } from "$app/navigation";
  import { Button } from "$components";

  function goToContact() {
    goto("#contact-form");
  }
</script>

<nav class="navbar default-margin">
  <a href="/" class="logo">RK</a>
  <div class="navbar-links">
    <a href="/#about-me" class="nav-link">About Me</a>
    <a href="/#my-work" class="nav-link">Work</a>
    <Button className="nav-bar" onclick={goToContact}>Contact</Button>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  .logo {
    font-size: 40px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  .nav-bar {
    padding: 10px 20px;
    font-size: 20px;
  }
</style>
