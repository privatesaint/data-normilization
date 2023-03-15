import customJoi from "../utils/CustomJoi";

export default (data) => {
  const requestSchema = customJoi.object({
    query: customJoi.string().htmlStrip().trim().required().messages({
      "string.base": "Invalid query provided",
      "string.empty": "Query is required",
      "any.required": "Query is required",
    }),
    userId: customJoi.string().htmlStrip().trim().required().messages({
      "string.base": "Invalid user id provided",
      "string.empty": "User id is required",
      "any.required": "User id is required",
    }),
  });

  return requestSchema.validateAsync(data);
};
