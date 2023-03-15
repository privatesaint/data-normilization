import customJoi from "../utils/CustomJoi";

export default (data) => {
  const requestSchema = customJoi.object({
    userName: customJoi.string().htmlStrip().trim().required().messages({
      "string.base": "Invalid username provided",
      "string.empty": "Username is required",
      "any.required": "Username is required",
    }),
  });

  return requestSchema.validateAsync(data);
};
