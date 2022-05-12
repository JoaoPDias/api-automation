import { jsonObject, jsonMember, TypedJSON } from "typedjson";
import moment from 'moment';
@jsonObject
export class PostUserRequest {
  @jsonMember(String, { name: "id" })
  public id: string;

  @jsonMember(String, { name: "name" })
  public name: string;

  @jsonMember(String, { name: "job" })
  public job: string;

  @jsonMember({deserializer: value => moment(value).toDate(), name: "created_at" })
  public createdAt: Date;

  constructor(name: string, job: string) {
    this.name = name;
    this.job = job;
  }
}