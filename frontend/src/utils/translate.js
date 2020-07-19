import trans from "@google-cloud/translate";
import {
  private_key,
  client_email,
  project_id,
} from "./My_First_Project-3b24140abf9b.json";

const { Translate } = trans.v2;
// Instantiates a client
const translate = new Translate({
  projectId: project_id,
  credentials: {
    private_key,
    client_email,
  },
  project_id,
});

let target = 'en';


export default {
  trans: (text) => {
    return translate.translate(text, target);
  },
  setTarget: (code) => {
    target = code;
  }
}
