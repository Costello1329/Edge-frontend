import {smallDeserializer} from "./serialization/job";
import {getConnection, HttpMethod} from "./core";
import {RawSmallJob} from "../../models/job";



export const connection = getConnection(
  "/get_jobs",
  HttpMethod.post,
  (data: { count?: number }) => data,
  (raw: RawSmallJob[]) =>
    ({ jobs: raw.map(job => smallDeserializer(job)) })
);
