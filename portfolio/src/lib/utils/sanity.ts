import { createClient, type ClientConfig } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const config: ClientConfig ={
  projectId: "66qxipp7",
  dataset: "production",
  apiVersion: "2025-04-08",
  useCdn: true,
};

const sanityClient = createClient(config);
export default sanityClient;

export function processProjectEntries(rawProject: SanityProject) {
  const builder = imageUrlBuilder(sanityClient);
  const projectImageUrl = builder.image(rawProject.image).url();

  const processedProject: ProcessedProject = {
    name: rawProject.name,
    company: rawProject.company,
    dateAccomplished: rawProject.dateAccomplished,
    slug: rawProject.slug,
    stack: rawProject.stack,
    projectImageUrl,
    content: rawProject.content.map(processProjectContent),
  }
  return processedProject;
}

export function processProjectContent(content: RawTextContent | RawImageContent) {
  if (content._type === 'block') {
    const processedTextContent: ProcessedTextContent = {
      type: 'text',
      style: content.style,
      textToRender: content.children.map((elem) => elem.text).join('\n'),
    };
    return processedTextContent;
  } else {
    const builder = imageUrlBuilder(sanityClient);
    const imageUrl = builder.image(content).url();
    const processedImageContent: ProcessedImageContent = {
      type: 'image',
      url:  imageUrl,
    }
    return processedImageContent;
  }
}
