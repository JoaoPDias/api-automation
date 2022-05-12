import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class GetUserResponse {
  @jsonMember(Number, { name: "id" })
  public id: number;

  @jsonMember(String, { name: "email" })
  public email: string;

  @jsonMember(String, { name: "first_name" })
  public firstName: string;

  @jsonMember(String, { name: "last_name" })
  public lastName: string;

  @jsonMember(String, { name: "avatar" })
  public avatar: string;

}
