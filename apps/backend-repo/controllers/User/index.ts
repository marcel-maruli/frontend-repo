import { userCollection } from "../../repository/userCollection";
import { AllData, Data } from "./types";
import { Request, Response } from "express";
import { decodedToken } from "../../utils/decodedToken";
import { encodedData } from "../../utils/encodedToken";

export const UsersController = {
  GetAllUser: async (req: Request, res: Response) => {
    try {
      const allData: AllData = [];
      const users = await userCollection.get();

      users.forEach((result) => {
        /* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
        const { password, ...data } = result.data();
        allData.push({ ...data });
      });

      res.status(200).send({
        status: 200,
        message: "success",
        data: allData,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send({
        status: 404,
        message: "No data found!",
        data: [],
      });
    }
  },

  AddUser: async (req: Request, res: Response) => {
    try {
      const { name, age, city, email, password } = req.body;
      const getUser = await userCollection.where("email", "==", email).get();
      /**
       * Check if user already exists or not.
       */
      if (!getUser.empty) {
        res.status(400).send({
          status: 400,
          message: "User Existed!",
          data: [],
        });
      } else {
        let requestData: Data = {
          name,
          password,
          email,
          age,
          city,
        };

        /**
         * Hashing / Endcoding Password Before Saving it inside DB
         */
        const hashedPassword = encodedData(password);

        requestData = {
          name,
          email,
          age,
          city,
          password: hashedPassword,
        };
        userCollection.add(requestData);
        res.status(201).send(requestData);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        status: 400,
        message: "Data not valid!",
        data: [],
        error: String(error),
      });
    }
  },

  UpdateUser: async (req: Request, res: Response) => {
    try {
      const { email: emailParam } = req.params;
      const { email: emailHeader } = decodedToken(req);
      if (emailHeader == emailParam) {
        const {
          name: nameBody,
          age: ageBody,
          city: cityBody,
          password: passwordBody,
          email: emailBody,
        } = req.body;

        let docId = "";

        let requestData: Data = {};
        /**
         * Searching Existed Data to get the document ID for update the value
         */
        const existedData = await userCollection
          .where("email", "==", emailParam)
          .get();
        existedData.docs.map((item) => {
          const { name, password, email, age, city } = item.data();
          requestData = {
            name: nameBody ? nameBody : name, // if the name is not provided, use the existed name
            password: passwordBody ? encodedData(passwordBody) : password, // if the password is not provided, use the existed password
            email: emailBody ? emailBody : email, // if the email is not provided, use the existed email
            age: ageBody ? ageBody : age, // if the age is not provided, use the existed age
            city: cityBody ? cityBody : city, // if the city is not provided, use the existed city
          };
          docId = item.id;
        });

        await userCollection.doc(docId).update({
          ...requestData,
        });

        /* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
        const { password, ...dataSend } = requestData;

        res.status(201).send({
          status: 201,
          message: "Data updated!",
          data: { ...dataSend },
        });
      } else {
        res.status(401).send({
          status: 401,
          message: "Unauthorized!",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        status: 400,
        message: "Data not valid!",
        data: [],
        error: String(error),
      });
    }
  },
};
