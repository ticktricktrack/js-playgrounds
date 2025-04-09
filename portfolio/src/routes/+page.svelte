<script>
  import { AboutMeSection, HeroSection, MyWorkSection } from "$components";

  const { data } = $props();
  const { workExperience, projects } = data;
</script>

<HeroSection />
<AboutMeSection {workExperience} />
<MyWorkSection {projects} />
