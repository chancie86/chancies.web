export const getSectionIds = state => {
  return state.header.sections.ids;
};

export const getSections = state => {
  const sections = state.header.sections.ids.map(
    id => state.header.sections.byId[id]
  );
  const result = [];

  sections.forEach(s => {
    const docList = state.header.documents.bySectionId[s.id];
    if (docList) {
      result.push({
        documents: docList,
        id: s.id,
        name: s.name
      });
    }
  });

  return result;
};

export const getIsLoading = state => state.header.sections.isLoading;
