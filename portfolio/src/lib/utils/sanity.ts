import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig ={
  projectId: "66qxipp7",
  dataset: "production",
  apiVersion: "2025-04-08",
  useCdn: false,
};

const sanityClient = createClient(config);
export default sanityClient;
