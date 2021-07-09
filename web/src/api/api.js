import { client } from "./client";
import { authClient } from "./authClient";

export async function listSections() {
  return await client.get("section");
}

export async function listDocuments() {
  return await client.get("document");
}

export async function getDocument(id) {
  return await client.get(`document/${id}`);
}

export async function saveDocument(id, name, elements, sectionId) {
  return await authClient.put(`document/${id}`, {
    name,
    elements,
    sectionId
  });
}

export function createSection() {}
