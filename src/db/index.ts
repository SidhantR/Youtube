import {drizzle} from 'drizzle-orm/neon-http'

//The Basic Drizzle flow creates a new HTTP call for each query (stateless), while the Neon Client flow uses a persistent connection that makes queries faster and enables transactions & prepared statements (stateful).

export const db = drizzle(process.env.DATABASE_URL !)
