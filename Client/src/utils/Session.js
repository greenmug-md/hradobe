import Joi from "@hapi/joi";
import Role from "../utils/constants";

export default {
  setData(data) {
    if (data) {
      Joi.assert(
        data,
        Joi.object({
          id: Joi.string().guid().required(),
          role: Joi.string()
            .valid(...Object.values(Role))
            .required(),
          username: Joi.string().required(),
          company: Joi.string().required(),
          email: Joi.string().required()
        }),
        {
          allowUnknown: true,
        }
      );
 
      sessionStorage.setItem("session", JSON.stringify(data));
    } else {
      sessionStorage.setItem("session", null);
    }
  },
  getData() {
 
    let sessionValue = sessionStorage.getItem("session");

    if (sessionValue) {
      return JSON.parse(sessionValue);
    } else {
      return null;
    }
  },
};
