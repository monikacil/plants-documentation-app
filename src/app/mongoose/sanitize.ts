import mongoose from "mongoose";

/**
 * Automatically hides sensitive data in JSON and objects
 * @param schema - Mongoose schema
 * @param fieldsToHide - Fields to hide (default: [password, __v])
 */
export function withSanitizedOutput(
  schema: mongoose.Schema,
  fieldsToHide: string[] = ["password", "__v"]
) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      for (const field of fieldsToHide) {
        delete ret[ field ];
      }
      return ret;
    },
  });

  schema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      for (const field of fieldsToHide) {
        delete ret[ field ];
      }
      return ret;
    },
  });

  return schema;
}
