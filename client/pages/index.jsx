import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions'


export default function Home() {
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    name:"",
    errors:{}
  })

  const handleInput = (e) => {
    setInput({
      ...input,
      name: e.target.value
    })
  }

  const handleSubmit = () => {
    console.log("submit", input.name)
    dispatch(login({
      name: input.name
    }))
  }

  return (
    <>
      {/* <form
        onSubmit={() => handleSubmit()}
      > */}
        <input
          onChange={e => handleInput(e)}
        />
        <button
          type="submit"
          onClick={() => handleSubmit()}
        >
          Login
        </button>
      {/* </form> */}
    </>
  )
}