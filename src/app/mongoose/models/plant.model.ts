import mongoose, {model, Schema} from "mongoose";

import {PlantDocument} from "@/app/mongoose/types/plant.types.ts";

const CollectedPlantSchema = new Schema<PlantDocument>(
    {
        _userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        species: {
            type: String,
            required: [true, "Species is required"],
            trim: true,
            lowercase: true,
        },
        variety: {
            type: String,
            required: [true, "Variety is required"],
            minLength: [3, "Minimum length is 3 characters"],
            trim: true,
            lowercase: true,
        },
        createdAt: Number,
        updatedAt: Number,
    },
    {timestamps: true}
);

const CollectedPlant = mongoose.models?.CollectedPlant || model<PlantDocument>("CollectedPlant", CollectedPlantSchema);
export {CollectedPlant};
