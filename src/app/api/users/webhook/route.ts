import { db } from '@/db'
import { users } from '@/db/schema'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    console.log(req, 'REQ')
    const event = await verifyWebhook(req)

    // Do something with payload
    const eventType = event.type
    // console.log(`Received webhook with ID ${data.id} and event type of ${eventType}`)
    console.log('Webhook payload:', event.data)
    
    if(eventType === "user.created"){
        const {data} = event
        await db.insert(users).values({
            clerkId: data.id,
            name: `${data.first_name} ${data.last_name}`,
            imageUrl: data.image_url
        })
    }

    if(eventType === "user.deleted"){
        const {data} = event
        if(!data.id){
            return new Response("Missing user id", {status: 400})
        }
        await db.delete(users).where(eq(users.clerkId , data.id))
    }

    if(eventType === "user.updated"){
        const {data} = event

        await db.update(users).set({
            name: `${data.first_name} ${data.last_name}`,
            imageUrl: data.image_url
        }).where(eq(users.clerkId, data.id))
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}