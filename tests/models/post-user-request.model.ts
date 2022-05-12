import moment from 'moment';
import { jsonMember, jsonObject } from "typedjson";
@jsonObject
export class PostUserRequest {
  @jsonMember(String, { name: "id" })
  public id: string;

  @jsonMember(String, { name: "name" })
  public name: string;

  @jsonMember(String, { name: "job" })
  public job: string;
  // I use this deserializer to get the value obtained from API, using moment.js and create a date, because the API format is different from what Date constructor requires.
  @jsonMember({deserializer: value => moment(value).toDate(), name: "created_at" })
  public createdAt: Date;

  constructor(name: string, job: string) {
    this.name = name;
    this.job = job;
  }
}