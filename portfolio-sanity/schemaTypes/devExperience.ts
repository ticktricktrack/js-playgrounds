import { defineField, defineType } from "sanity";

export const devExperience = defineType({
  name: "devExperience",
  title: "Development Experience",
  type: "document",
  fields: [
    defineField({
      name: "jobTitle",
      title: "Job Title",
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
      name: "startDate",
      title: "Start Date",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "string",
    }),
  ]
});
