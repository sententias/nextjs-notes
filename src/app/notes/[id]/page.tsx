import React from 'react'
import Home from '@/app/Home';

export const Page = ({ params }: { params: { id: string } }) => {
  return(
    <Home params={params} />
  )
}

export default Page