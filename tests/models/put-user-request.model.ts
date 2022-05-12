import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class PutUserRequest {
  public id: string;

  @jsonMember(String, { name: "name" })
  public name: string;

  @jsonMember(String, { name: "job" })
  public job: string;

  constructor(id:string, name: string, job: string) {
    this.id = id;
    this.name = name;
    this.job = job;
  }
}