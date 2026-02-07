import { Schema, model } from 'mongoose';

const emulationSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true,
            trim: true 
        },
    }
);

export const EmualtionModel = model('Emulation', emulationSchema,'emulations');