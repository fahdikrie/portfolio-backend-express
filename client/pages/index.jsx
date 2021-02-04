import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions'
import cookie from 'js-cookie';


const Home = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.login)
  const kuki = cookie.get("token")

  console.log(kuki)

  useEffect(() => {
    console.log(state)
  }, [state])

  const [input, setInput] = useState({
    name:"",
    birthday:"",
    errors:{}
  })

  const handleNameInput = (e) => {
    setInput({
      ...input,
      name: e.target.value
    })
  }

  const handleBirthdayInput = (e) => {
    setInput({
      ...input,
      birthday: e.target.value
    })
  }

  const handleSubmit = () => {
    console.log("submit", input.name)
    dispatch(login({
      name: input.name,
      birthday: input.birthday
    }))
  }

  return (
  <>
    {state.isAuthenticated
      ?
       <>{state.user.name}</>
      :
        <></>
    }

    <br/>

      <label>
        Nama
      </label> <br/>
      <input
        onChange={e => handleNameInput(e)}
      /> <br/><br/>

      <label>
        Birthday
      </label> <br/>
      <input
        onChange={e => handleBirthdayInput(e)}
      /> <br/> <br/>

      <p>
        { input.errors?.name }
      </p>

      <button
        type="submit"
        onClick={() => handleSubmit()}
      >
        Login
      </button> <br/>
    </>
  )
}

export default Home