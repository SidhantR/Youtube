import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

//users table

// this user model will only be created through a web hook which clerk will fire 
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(),  
    // clerk_id - column name in DB  ,  clerkId - ts name in code 
    name: text("name").notNull(),
    // todo: banner fields 
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)])
// database index on the clerk_id column -  to query faster