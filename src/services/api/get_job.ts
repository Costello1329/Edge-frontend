import {Guid} from "../../utils/guid";
import {deserializer} from "./serialization/job";
import {getConnection, HttpMethod} from "./core";



export const connection = getConnection(
  "/get_job/",
  HttpMethod.get,
  (data: { id: Guid }) => ({ id: data.id.str }),
  deserializer
);
