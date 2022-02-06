import { client } from './client';
import { authClient } from './authClient';

export async function listSections() {
  return await client.get('public/section');
}

export async function listDocuments() {
  return await client.get('public/document');
}

export async function getDocument(id) {
  const isAuthenticated = !!window.localStorage.getItem('token');
  if (isAuthenticated) {
    // Admin getter allows us to retrieve unpublished documents
    return await authClient.get(`admin/document/${id}`);
  }

  return await client.get(`public/document/${id}`);
}

export async function saveDocument(id, name, elements, sectionId) {
  return await authClient.put(`admin/document/${id}`, {
    name,
    elements,
    sectionId,
  });
}

export async function publishDocument(id, publish) {
  return await authClient.put(`admin/document/${id}/publish/?publish=${!!publish}`);
}

export async function createDocument(title, sectionId) {
  return await authClient.post(`admin/document`, {
    name: title,
    elements: [],
    sectionId: sectionId,
  });
}

export async function listImages(documentId) {
  return await client.get(`public/document/${documentId}/images`);
}

export async function saveSection(sectionId, name) {
  return await authClient.put(`admin/section/${sectionId}`, {
    name,
  });
}
