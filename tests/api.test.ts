

import { PostUserRequestBuilder, PutUserRequestBuilder } from "@tests/builders";
import { GetUserResponse, PostUserRequest, PutUserResponse } from "@tests/models";
import times from "async/times";
import { performance } from "perf_hooks";
import client from "supertest";
import { TypedJSON } from "typedjson";

const request = client("https://reqres.in/api");
const getUserSerializer = new TypedJSON(GetUserResponse);
const postUserSerializer = new TypedJSON(PostUserRequest);
const putUserSerializer = new TypedJSON(PutUserResponse);

describe("API Validations", () => {
  describe("/users", () => {
    test("Validation 1 - should get list of users", async () => {
      const response = await request.get("/users");
      expect(response.status).toBe(200);
      let users = getUserSerializer.parseAsArray(response.body.data);
      console.log(users.filter((user) => user.id % 2 != 0));
    });

    test("Validation 2 - should create an user", async () => {
      const today = new Date().getDate();
      const response = await request
        .post("/users")
        .send(PostUserRequestBuilder.new().build());
      expect(response.status).toBe(201);
      const user = postUserSerializer.parse(response.body);
      expect(user).toBeTruthy();
      expect(user.createdAt.getDate()).toBe(today);
    });

    test("Validation 3 - should update an user", async () => {
      const userToUpdate = PutUserRequestBuilder.new().build();
      const { id, ...userExpected } = userToUpdate;
      const response = await request.put(`/users/${id}`).send(userExpected);
      expect(response.status).toBe(200);
      const userUpdated = putUserSerializer.parse(response.body);
      expect(userExpected).toEqual(userUpdated);
    });

    test.each<Number>([0, 3])(
      "Validation 4 - should get list of users of the page %i with response time less than 1 second",
      async (page: number) => {
        const startTime = performance.now();
        await request.get(`/users?page=${page}`);
        const executionTimeInMiliseconds = performance.now() - startTime;
        expect(executionTimeInMiliseconds).toBeLessThan(1000);
      }
    );

    test("Validation 5 - should get list of users 10 times parallelly and validate status 200 in each of them", async () => {

      let asyncTasks = async () => {
        await request.get("/users").expect(200);
      };
      await times(10, asyncTasks);
    });
  });
});
