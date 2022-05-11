import { jsonObject, jsonMember, TypedJSON } from "typedjson";

@jsonObject
export class PutUserResponse {
  @jsonMember(String, { name: "name" })
  public name: string;

  @jsonMember(String, { name: "job" })
  public job: string;

  constructor(name: string, job: string) {
    this.name = name;
    this.job = job;
  }
}