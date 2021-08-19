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

export async function createDocument(title, sectionId) {
  return await authClient.post(`document`, {
    name: title,
    elements: [],
    sectionId: sectionId
  });
}

export async function listImages(documentId) {
  return await client.get(`document/${documentId}/images`);
}

export async function saveSection(sectionId, name) {
  return await authClient.put(`section/${sectionId}`, {
    name
  })
}