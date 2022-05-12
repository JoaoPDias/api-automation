import pure from "pure-gen/index";
import { PostUserRequest } from "../models/post-user-request.model";
/*
The Builder Pattern can be used to mitigate the object creation process and centralizes this operation in one file.
It allows new fields to be added without compromising other code parts, because we can set default values for them.
*/
export class PostUserRequestBuilder {
  private fullName = pure.name.findName();
  private job = pure.name.jobTitle();

  static new(): PostUserRequestBuilder {
    return new PostUserRequestBuilder();
  }

  withUsername(name: string): PostUserRequestBuilder {
    this.fullName = name;
    return this;
  }

  withJob(job: string): PostUserRequestBuilder {
    this.job = job;
    return this;
  }

  build(): PostUserRequest {
    return new PostUserRequest(this.fullName, this.job);
  }
}
