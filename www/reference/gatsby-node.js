const path = require(`path`)
const fs = require("fs")
const util = require("util")
const { createFilePath } = require(`gatsby-source-filesystem`)
const adminDoc = require("../../docs/api/admin-spec3.json")
const storeFront = require("../../docs/api/store-spec3.json")

const useSpec = raw => {
  let tags = {}

  for (const [path, methods] of Object.entries(raw.paths)) {
    for (const [method, specification] of Object.entries(methods)) {
      for (const t of specification.tags) {
        if (t in tags) {
          tags = {
            ...tags,
            [t]: [
              ...tags[t],
              {
                method: method.toUpperCase(),
                path,
                ...specification,
              },
            ],
          }
        } else {
          tags = {
            ...tags,
            [t]: [
              {
                method: method.toUpperCase(),
                path,
                ...specification,
              },
            ],
          }
        }
      }
    }
  }

  return { tags, spec: raw }
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField, createNode } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }

  if (node.internal.type === "ApiJson" && node.components) {
    console.log("HERE: ", node)
    console.log("Paths")

    const nodePaths = Object.entries(node.paths).map(([path, values]) => {
      return {
        name: path,
        methods: Object.entries(values).map(([method, values]) => {
          return {
            method: method,
            ...values,
            responses: Object.entries(values.responses).map(
              ([response, values]) => {
                return {
                  status: response,
                  ...values,
                }
              }
            ),
          }
        }),
      }
    })
    console.log(nodePaths)
    const result = {
      name: `api-nodes`,
      paths: nodePaths,
      rawNode: node,

      // required fields
      id: `api-nodes`,
      parent: null, // or null if it's a source node without a parent
      children: [],
      internal: {
        type: `ApiNode`,
        contentDigest: `store-api-${node.internal.contentDigest}`,
        mediaType: node.internal.mediaType, // optional
        content: node.internal.content, // optional
        description: `A cleaned version of file-system-api json files`, // optional
      },
    }

    createNode(result)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/docs.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        previous,
        next,
      },
    })
  })
}

fs.writeFile(
  "./data/admin-api.json",
  JSON.stringify(useSpec(adminDoc)),
  function (err) {
    if (err) {
      return console.log(err)
    }
    console.log("THE JSON FILE WAS CREATED!!!!")
  }
)

fs.writeFile(
  "./data/storefront-api.json",
  JSON.stringify(useSpec(storeFront)),
  function (err) {
    if (err) {
      return console.log(err)
    }
    console.log("THE JSON FILE WAS CREATED!!!!")
  }
)
