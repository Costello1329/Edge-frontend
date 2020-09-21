import {Job, RawJob, SmallJob, RawSmallJob} from "../../../models/job";
import {Guid} from "../../../utils/guid";
import {Serializer, Deserializer} from "../core";



export const serializer: Serializer<RawJob, Job> =
  (job: Job): RawJob =>
    ({ ... job, ... { id: job.id.str }});

export const smallDeserializer: Deserializer<RawSmallJob, SmallJob> =
  (raw: RawSmallJob): SmallJob =>
    ({ ... raw, ... { id: new Guid(raw.id) }});

export const deserializer: Deserializer<RawJob, Job> =
  (raw: RawJob): Job =>
    ({ ... raw, ... { id: new Guid(raw.id) }});
