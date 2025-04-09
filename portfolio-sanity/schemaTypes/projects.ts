import { defineField, defineType } from "sanity";

export const projects = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Project Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug - URL ending",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dateAccomplished",
      title: "When did you do this project?",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Project Content",
      type: "array",
      of: [{type: "block"}, {type: "image"}],
    }),
    defineField({
      name: "stack",
      title: "Tech Stack",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    }),
  ],
})
