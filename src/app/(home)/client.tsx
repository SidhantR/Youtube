"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";


export const PageClient = () => {
  const trpc = useTRPC();

  const {data: greeting} = useSuspenseQuery(
    trpc.hello.queryOptions({text: 'Sidhant'})
  )
  return(
    <div>
      {greeting.greeting}
    </div> 
  )
}