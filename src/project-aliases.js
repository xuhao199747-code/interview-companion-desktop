// The open-source build infers project names from each uploaded document's
// headings and metadata. Project aliases are intentionally kept in local
// glossary/material files rather than hard-coded into the application.
const projectAliases = {};

const canonicalNames = new Map();

function projectFromSource() {
  return "";
}

function sectionProjectName(section = {}) {
  // 飞书正文的一级标题会被解析成“项目背景”等章节名，不是项目实体。
  // 对专属项目资料，文件名是更稳定的归属信号，必须优先于章节标题。
  return projectFromSource(section?.source) || inferredProjectName(section) || canonicalProjectName(section?.project);
}

export function canonicalProjectName(name = "") {
  const normalized = String(name || "").trim();
  return canonicalNames.get(normalized.toLowerCase()) || normalized;
}

export function createProjectOptions(sections = []) {
  const options = new Map();
  for (const section of sections) {
    const name = sectionProjectName(section);
    if (!name) continue;
    const id = name.toLowerCase();
    if (!options.has(id)) options.set(id, { id, name, aliases: projectAliases[name] || [] });
  }
  return [...options.values()];
}

export function filterSectionsForProject(sections = [], projectId = "") {
  return sections.filter((section) => sectionProjectName(section).toLowerCase() === projectId);
}
import { inferredProjectName } from "./section-metadata.js";
