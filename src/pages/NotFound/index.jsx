import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button/index.jsx'

export const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center h-[100%]">
      <h1 className="font-bold text-3xl mb-5">Oops!</h1>
      <p className="text-l mb-0">Sorry, an error has occurred.</p>
      <p className="text-l mb-5">
        Seems like you are not logged in or the page is not found
      </p>
      {/*<p className="text-[#7E7E80]">*/}
      {/*  ERROR CODE: {error.statusText || error.message}*/}
      {/*</p>*/}
      <Button variant="outlined">
        <Link to="/">Back to start page</Link>
      </Button>
    </section>
  )
}
