This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Change secreet and public key from stripe

    you will need to create a stripe account if you havent. using the public and secret key go to
    access the `.env` file and change your keys accordingly stripe secret and stripes public.

## if you wanna add more items to be displayed

    it still needs some work but add the information inside of CheckoutPage's state in itemData object asign it an id. ideally you should gather this data on compoonentDidMount() make an api call and then structure that data as necessary and assign it to the state.
