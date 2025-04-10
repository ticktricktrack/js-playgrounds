<script lang="ts">
  let { data } = $props();
  const { company, name, dateAccomplished, stack, projectImageUrl, content } = data.project;

  function getTagFromStyle(style: ProcessedTextContent["style"]) {
    if (style === "normal") {
      return "p";
    }
    else {
      return style;
    }
  }
</script>

<main class="default-margin work-page">
  <h4>{company}</h4>
  <div class="underscore"></div>
  <h2 class="mb-s">{name}</h2>
  <img class="project-image" src={projectImageUrl} alt={name} />
  <div class="project-container mt-m">
    <div class="meta-data">
      <div class="semi-bold">Date</div>
      <p>{dateAccomplished}</p>
      <h3 class="semi-bold">Tech Stack</h3>
      <ul>
        {#each stack as skill}
          <li>{skill}</li>
        {/each}
      </ul>
    </div>

    <div class="project-text">
      {#each content as block}
        {#if block.type === "text"}
          <svelte:element this={getTagFromStyle(block.style)}>{block.textToRender}</svelte:element>
        {:else}
          <img class="content-image" src={block.url} alt="">
        {/if}
      {/each}
    </div>
  </div>
</main>

<style>
  .work-page {
    width: 100%;
    padding-bottom: 140px;
  }

  .project-image {
    width: 100%;
    max-height: 450px;
    object-fit: cover;
  }

  .content-image {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
  }

  .project-container {
    display: flex;
  }

  .meta-data {
    min-width: 200px;
  }
</style>
