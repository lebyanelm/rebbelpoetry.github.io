import * as superagent from "superagent";

export const PoemService = {
  // Gets poem data from the backend
  getPoemData: (pId) => {
    return new Promise((resolve, reject) => {
      superagent
        .get([process.env.REACT_APP_API_ENDPOINT, "poems", pId].join("/"))
        .end((_, response) => {
          if (response)
            if (response.statusCode === 200) resolve(response.body.data);
            else reject(response.statusCode);
          else reject(0);
        });
    });
  },

  // Get the details of a poet
  getPoemAuthors: (authorIds) => {
    return new Promise((resolve, reject) => {
      superagent
        .get(
          [process.env.REACT_APP_API_ENDPOINT, "authors", authorIds].join("/")
        )
        .end((_, response) => {
          if (response)
            if (response.statusCode === 200) resolve(response.body.data);
            else reject(response.statusCode);
          else reject(0);
        });
    });
  },
  updateDraft: (data, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .post([process.env.REACT_APP_API_ENDPOINT, "drafts"].join("/"))
        .send({ ...data })
        .set("Authorization", token)
        .end((_, response) => {
          console.log(response);
        });
    });
  },
  getDraft: (did, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .get([process.env.REACT_APP_API_ENDPOINT, "drafts", did].join("/"))
        .set("Authorization", token)
        .end((_, response) => {
          console.log(response);
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  uploadThumbnail: (file, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .put([process.env.REACT_APP_API_ENDPOINT, "assets", "upload"].join("/"))
        .set("Authorization", token)
        .attach("file", file)
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  respond: (response, resolve, reject) => {
    if (response)
      if (response.statusCode === 200) resolve(response.body.data);
      else reject(response.statusCode);
    else reject(0);
  },
};