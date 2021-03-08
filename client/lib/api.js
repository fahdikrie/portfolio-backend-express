const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllPosts() {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
    `
  )

  return data?.posts
}

export async function getAllNonPrivatePosts() {
  const data = await fetchAPI(
    `
    query getAllNonPrivatePosts {
      posts(where: {categoryIn: [3]}) {
        edges {
          node {
            title
            date
          }
        }
      }
    }
    `
  )

  return data?.posts
}
