<script lang="ts">
  import {SectionHeadline, Button, ExperienceTable} from "$components";
  import image from "$assets/about-me.jpg";
  import { goto } from "$app/navigation";
  import type { DevExperience } from "$lib/types/sanity";

  interface AboutMeProps {
    workExperience: DevExperience[];
  }
  let {workExperience}: AboutMeProps = $props();

  function onclick() {
    goto("/contact-form");
  }
</script>

<section class="about-me mt-l">
  <SectionHeadline sectionName="about-me">About Me></SectionHeadline>
  <div class="mt-m content-container default-margin">
    <img class="image" src={image} alt="portrait" />
    <div class="text">
      <p>
        Bacon ipsum dolor amet ground round biltong chicken turducken cupim. Doner beef pork chop jerky. Ham shankle salami tongue. Beef ribs meatball kielbasa tenderloin bresaola ground round.
      </p>
      <p>
        Rump spare ribs landjaeger, tri-tip ham hock picanha filet mignon ham porchetta pastrami biltong buffalo meatloaf pork loin cupim. Cow ham sirloin tongue tail prosciutto leberkas chicken cupim corned beef pork swine doner ball tip burgdoggen. Frankfurter biltong landjaeger ball tip ham hock leberkas, salami sirloin.
      </p>
      <p>
        Pork spare ribs meatloaf prosciutto alcatra beef ribs tail capicola, andouille shoulder jerky. Bresaola cupim cow jowl fatback pancetta bacon short ribs. Chicken flank burgdoggen, shankle ham hock picanha andouille.
      </p>
      <Button className="mt-m" {onclick}>Tell me about your project</Button>
    </div>
  </div>
  <ExperienceTable {workExperience} />
</section>

<style>
  .content-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  .image {
    width: 42%;
    border-radius: 20px;
    object-fit: cover;
    filter: grayscale(0.8);
  }

  .text {
    width: 55%;
    text-align: left;
  }
</style>
