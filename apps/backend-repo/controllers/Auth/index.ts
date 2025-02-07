import { userCollection } from "../../repository/userCollection";
import { Request, Response } from "express";
import { encodedData } from "../../utils/encodedToken";

export const AuthController = {
  FindOneUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      let user = {};
      let token = "";
      let isValid = false;
      const isUser = await userCollection.where("email", "==", email).get();

      isUser.docs.forEach((item) => {
        if (item?.data().password == encodedData(password)) {
          /**
           * Set a new data without password
           */

          /* eslint-disable */
          const { password, ...data } = item?.data();
          /* eslint-enable */
          user = {
            ...data,
          };
          token = encodedData(JSON.stringify(item?.data()));
          /**
           * Set header authorization
           */
          req.headers.authorization = String(token);
          isValid = true;
        }
      });
      if (isValid) {
        res.status(200).json({
          status: 200,
          authorizedData: { user },
          token: token,
          message: "login success!",
          isSuccess: true,
        });
      } else {
        res.status(404).json({
          status: 404,
          error: true,
          message: "email or password invalid!",
          isSuccess: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: 404,
        message: "No data found!",
        data: [],
        isSuccess: false,
      });
    }
  },
};
