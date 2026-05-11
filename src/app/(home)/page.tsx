import { getQueryClient, trpc } from "@/trpc/server";
import { PageClient } from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {
  //Creates React Query cache storage.
  const queryClient = await getQueryClient()

  //void - Run promise, ignore returned value - Fetch query BEFORE sending page
  await queryClient.prefetchQuery(
    trpc.hello.queryOptions({
      text: 'Sidhant'
    })
  )
  return(
    //dehydrate - Converts cache into transferable plain object.
    //hydrationBoundry - Restores that cache in browser.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error....</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

//Fetch data on server
// ↓
// put it into React Query cache
// ↓
// send cache to browser
// ↓
// client component instantly uses it


// "use client"

// import { useTRPC } from "@/trpc/client"
// import { useQuery } from "@tanstack/react-query"

// export default function Home() {
//   const trpc = useTRPC()
//   const greeting = useQuery(trpc.hello.queryOptions({text: "world"}))
//   if(!greeting.data) return <div>Loading....</div>
//   return <div> {greeting.data.greeting} </div>
// }