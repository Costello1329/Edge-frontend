import {smallDeserializer} from "./serialization/job";
import {getConnection, HttpMethod} from "./core";
import {RawSmallJob} from "../../models/job";



export const connection = getConnection(
  "/get_jobs",
  HttpMethod.get,
  (data: { count?: number }) => data,
  (raw: { jobs: RawSmallJob[] }) =>
    ({ jobs: raw.jobs.map(job => smallDeserializer(job)) })
);
