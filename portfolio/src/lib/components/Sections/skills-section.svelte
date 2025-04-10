<script lang="ts">
    import SectionHeadline from "$components/section-headline.svelte";

  interface SkillsSectionProps {
    skills: Skill[];
  }

  let {skills}:SkillsSectionProps = $props();
</script>

<section class="mt-l">
  <SectionHeadline sectionName="Skills">Skills</SectionHeadline>
  <div class="wrapper default-m">
    <div class="skills-container mt-m">
      {#each skills as skill}
        <div class="skill">
          <i class={`devicon-${skill.iconClass}-plain`}></i>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .skills-container {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 16px;
    column-gap: 10px;
  }

  i {
    font-size: 80px;
    color: black;
  }
</style>
