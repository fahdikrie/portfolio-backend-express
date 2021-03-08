import React from 'react'
import Head from 'next/head'
import Link from "next/link"

import NavigationBar from './NavigationBar/index'

const HeadTags = () => {
  return (
    <Head>
      <link
        rel="preload"
        href="/fonts/San Francisco Pro/SF-Pro-Display-Bold.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/San Francisco Pro/SF-Pro-Display-BoldItalic.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/San Francisco Pro/SF-Pro-Display-Black.ttf"
        as="font"
        crossOrigin=""
      />
    </Head>
  )
}

const Layout = (props) => {
  return (
    <>
      <HeadTags/>
      {/* <NavigationBar currentPage={props.currentPage}/> */}
      {props.children}
    </>
  )
}

export default Layout;

