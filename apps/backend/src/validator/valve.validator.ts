import z from "zod";

const valveSchema = z.object({
    valveOpen: z.boolean(),
    serialNumber: z.string()
})

export default valveSchema;