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

## Addding your selling products

    ideally you would want your products to be gathered from either a table or even stripes products, however for simplicity we will add them as a constant value in our api 'pages/api/get_items_list.js' here you can see all items that are being sold and you can add more. follow the structure it contains to avoid inconsistencys.

## API PAYMENT_INTENT

    currently the payment_intent-api is gathering the items from a const variable. for now when you add another item into the item-api also include it in the payment_intent-api const value. here is where the api is calculating the total price based on the items, eventually this data will be collected from a database/restfull api.

    a reason why you wannat your payment_intent api to calculate the total amount is so that nothing can be maliciouslt changed in the front end. this way your back end api(payment_intent) will calculate that data based on how many items youve purchased.
