import pure from "pure-gen/index";
import { PutUserRequest } from "../model/put-user-request.model";
/*
The Builder Pattern can be used to mitigate the object creation process and centralizes this operation in one file.
It allows new fields to be added without compromising other code parts, because we can set default values for them.
*/
export class PutUserRequestBuilder {
  private id = '2';
  private fullName = pure.name.findName();
  private job = pure.name.jobTitle();

  static new(): PutUserRequestBuilder {
    return new PutUserRequestBuilder();
  }

  withUsername(name: string): PutUserRequestBuilder {
    this.fullName = name;
    return this;
  }

  withJob(job: string): PutUserRequestBuilder {
    this.job = job;
    return this;
  }

  build(): PutUserRequest {
    return new PutUserRequest(this.id, this.fullName, this.job);
  }
}
