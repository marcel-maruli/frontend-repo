import {
  totalUserCollection,
  userCollection,
} from "../../repository/userCollection";
import { Request, Response } from "express";
import { decodedToken } from "../../utils/decodedToken";
import { encodedData } from "../../utils/encodedToken";
import { AuthTypes } from "@repo/shared-types";

type AllData = AuthTypes.AllAuthData;
type Data = AuthTypes.AuthData;

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

      res.status(200).json({
        status: 200,
        message: "success",
        data: allData,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
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
      const getTotalUser = await totalUserCollection.get();
      let totalUser = 0;

      getTotalUser.forEach((result) => {
        totalUser = result.data().totalUser;
      });

      /**
       * Check if user already exists or not.
       */

      if (!getUser.empty) {
        res.status(400).json({
          status: 400,
          message: "User Existed!",
          data: [],
        });
      } else {
        let requestData: Data = {
          id: totalUser + 1,
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
          id: totalUser + 1,
          name,
          email,
          age,
          city,
          password: hashedPassword,
        };

        userCollection.add(requestData);
        if (!!getTotalUser.empty) {
          totalUserCollection.doc("totalUsers").create({ totalUser: 1 });
        } else if (!getTotalUser.empty) {
          totalUserCollection
            .doc("totalUsers")
            .update({ totalUser: totalUser + 1 });
        }

        res.status(201).json({
          status: 201,
          message: "User Added Successfully!",
          data: requestData,
          isSuccess: true,
        });
      }
    } catch (error) {
      const errorMsg = {
        status: 400,
        message: "Data not valid!",
        data: [],
        error: String(error),
        isSuccess: false,
      };
      res.status(400).json(errorMsg);
    }
  },

  UpdateUser: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { id: encodedId } = decodedToken(req);
      if (encodedId == userId) {
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
          .where("id", "==", encodedId)
          .get();
        existedData.docs.map((item) => {

          const { name, password, email, age, city, id } = item.data();
          requestData = {
            id: id,
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

        res.status(201).json({
          status: 201,
          message: "Data updated!",
          data: { ...dataSend },
          isSuccess: true,
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "Unauthorized!",
          data: [],
          isSuccess: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: 400,
        message: "Data not valid!",
        data: [],
        error: String(error),
        isSuccess: false,
      });
    }
  },
};
