export const getCodeQuery = `
query getCodes {
    testcode {
        code
        id
    }
}
`;

export const createPaper = (data) => {
  return `
    mutation myMutaiton {
        insert_paperTable(
          objects: {paperLang: "${data.paperLang}", paperName: "${data.paperName}", paperOwner: "${data.paperOwner}", paperLangExt: "${data.paperLangExt}"}
        ) {
          returning {
            paperId
            paperCode
            paperDesc
            createdAt
            paperLang
            paperOwner
            paperName
            paperLangExt
          }
        }
      }`;
};

export const getUserPaper = (userId) => {
  return `
  query getPapers {
    paperTable (where:{paperOwner: {_eq: "${userId}"}}, order_by: {id: desc}) {
      paperId
      paperCode
      createdAt
      paperLang
      paperDesc
      paperOwner
      paperName
      paperLangExt
    }
  }
  `;
};

export const getSinglePaperInfo = (userId, paperId) => {
  return `
  query getPapers {
    paperTable (where:{paperOwner: {_eq: "${userId}"}, paperId: {_eq: "${paperId}"}}) {
      paperId
      paperCode
      createdAt
      paperLang
      paperDesc
      paperOwner
      paperName
      paperLangExt
    }
  }
  `;
};

export const savePaperCode = (userId, paperCode, paperId) => {
  return `
  mutation myMutaiton {
      update_paperTable(
        where: {paperOwner: {_eq: "${userId}"}, paperId: {_eq: "${paperId}"}},
        _set: {paperCode: "${paperCode}"}
      ) {
        returning {
          paperId
          paperCode
          paperDesc
          createdAt
          paperLang
          paperOwner
          paperName
          paperLangExt
        }
      }
    }`;
};
