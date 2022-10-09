export const getCodeQuery = `
query getCodes {
    testcode {
        code
        id
    }
}
`;

export const createPaper = (data) => {
  if (!Object.values(data).length === 4) return;
  return `
    mutation myMutaiton {
        insert_paperTable(
          objects: ${data}
        ) {
          returning {
            paperId
            paperCode
            paperDesc
            createdAt
            paperLang
            paperOwner
            paperName
          }
        }
      }`;
};
