import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'

import { login } from '../redux/actions'
import { getAllPosts, getAllNonPrivatePosts } from '../lib/api'


export default function Home({ allPosts: { edges }, preview }) {
  /**
   * Auth Section
   */
  const dispatch = useDispatch()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name:"",
    birthday:"",
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const [user, setUser] = useState({
    name:"",
    errors:{},
    isLoading:false,
    isAuthenticated:false
  })

  const loginState = useSelector((state) => state.login)
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      const decoded = jwt_decode(token)
      setUser({
        ...user,
        name: decoded.name,
        isLoading:false,
        isAuthenticated:true
      })
    } else {
      setUser({
        ...user,
        errors:loginState.errors,
        isLoading:loginState.isLoading,
        isAuthenticated:loginState.isAuthenticated,
      })
    }
  }, [loginState])

  const handleLogin = () => {
    dispatch(login(formData))
      .then((res) => (res.data.success ? router.reload() : null))
      .catch(
        (err) => {
          setUser({
            ...user,
            errors: err.response.data
          })
        })
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt')
    }
    router.reload()
  }

  /**
   * Wordpress Section
   */
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

  const posts = []

  if (!user.isAuthenticated) {
    edges.forEach(el => {
      // Display posts that aren't categorized as private
      if (!el.node.categories.edges.some(edge => edge.node.id === "dGVybToz") &&
          !posts.includes(el.node)) {
            posts.push(el.node)
      }
    })
  } else {
    edges.forEach(el => {
      posts.push(el.node)
    })
  }

  return (
    <>
      {user.name !== "" || user.isAuthenticated
        ?
          <>
            <h1>{user.name}</h1>
            <button
              type="submit"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </>
        :
          <>
            <input
              name="name"
              onChange={(e) => onChangeHandler(e)}
            /> <br/>

            {user.errors !== {}
              ? <p>{user.errors?.name}</p>
              : ""
            }

            <input
              name="birthday"
              onChange={(e) => onChangeHandler(e)}
              /> <br/>

            {user.errors !== {}
              ? <p>{user.errors?.birthday}</p>
              : ""
            }

            {user.errors !== {}
              ? <p>{user.errors?.usernotfound}</p>
              : ""
            }

            <button
              type="submit"
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </>
      }

      {posts.map(el => {
        <p>el.title</p>
      })}

      { posts.length !== 0 
        ? posts.map((el, i) => (
          <div key={i}>
            <p>{el.title}</p>
          </div>
        ))
        : ""
      }

      <br/>
    </>
  )
}

export async function getServerSideProps({ preview = false }) {
  const posts = await getAllPosts(preview)
  return {
    props: { allPosts: posts, preview },
  }
}