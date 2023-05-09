import { Option, Tag } from "@/interfaces/index";

export const tagsToDropDownOptions = (tags: Tag[]) => {
  let options: Option[] = [];
  tags.forEach((tag) => options.push({ id: tag.id, label: tag.tag }));
  return options;
};

export const dropDownOptionsToTags = (options: Option[]) => {
  let tags: Tag[] = [];
  options.forEach((option) => tags.push({ id: option.id, tag: option.label }));
  return tags;
};
