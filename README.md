# [GraphQL Blog](https://gql-blog.vercel.app/)

A simple blogging website built using [NextJS](https://nextjs.org/) and [GraphCMS](https://graphcms.com/).

## Tech Stack

- [NextJS](https://nextjs.org/)
- [GraphCMS](https://graphcms.com/)
- [GraphQL Request](https://www.npmjs.com/package/graphql-request)
- [TypeScript](https://www.typescriptlang.org/)

## Prerequisites

- [NodeJS](https://nodejs.org/)

## Getting Started

### Installing Package

```bash
npm install
```

### Creating account in [GraphCMS](https://graphcms.com/)

- Create account in [GraphCMS](https://graphcms.com/).
- Get API endpoint.
- Get API token.

### Save Endpoint and Token

Save the endpoints and token in `.env` file.

```.env
NEXT_PUBLIC_GRAPHCMS_ENDPOINT = <API ENDPOINT>

GRAPHCMS_TOKEN =<API TOKEN>
```

## Scripts

- Development Server

```bash
npm run dev
```

- Build Project

```bash
npm run build
```

- Production Server

```bash
npm start
```

## Deploying

To know about deploying, please visit [here](https://nextjs.org/docs/deployment).
