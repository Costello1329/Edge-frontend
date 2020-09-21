import {getConnection, HttpMethod} from "./core";
import {id} from "../../utils/id";



export const connection = getConnection(
  "/post_job/",
  HttpMethod.post,
  id,
  id
);
