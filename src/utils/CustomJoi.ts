import Joi from "joi";
import SanitizeHtml from "sanitize-html";

const stringStrips = (Joi) => {
  return {
    type: "string",
    base: Joi.string(),
    rules: {
      htmlStrip: {
        validate(value) {
          return SanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {},
          });
        },
      },
    },
  };
};
const numberStrips = (Joi) => {
  return {
    type: "number",
    base: Joi.number(),
    rules: {
      htmlStrip: {
        validate(value) {
          return SanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {},
          });
        },
      },
    },
  };
};

const booleanStrips = (Joi) => {
  return {
    type: "boolean",
    base: Joi.boolean(),
    rules: {
      htmlStrip: {
        validate(value) {
          return SanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {},
          });
        },
      },
    },
  };
};

const customJoi = Joi.extend(stringStrips, numberStrips, booleanStrips);

export default customJoi;
