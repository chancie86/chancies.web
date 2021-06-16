import { client } from "./client";

export async function listSections() {
  return await client.get("section");
}

export async function listDocuments() {
  return await client.get("document");
}

export async function getDocument(id) {
  return await client.get(`document/${id}`);
}

export function createSection() {}
