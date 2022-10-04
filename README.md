# Compound Interest Calculator

A compound interest calculator web app built with ReactJS.

<br>

<img width="1280" alt="Screen Shot 2021-10-03 at 2 42 15 PM" src="https://user-images.githubusercontent.com/50968964/135767218-cafb5791-edd6-4259-8310-7b823ed93c51.png">

<img width="1280" alt="Screen Shot 2021-10-03 at 2 45 16 PM" src="https://user-images.githubusercontent.com/50968964/135767286-dacf453a-0b25-40c9-9cca-1cb785fb4c7f.png">

<br>

## Compound Interest Formula (JS):

```js
function compoundInterest(p, r, n, t, c, cn) {
    let total = p;
    let principal = p;

    for (let i = 0; i < t * n; i++) {
        total += (c * cn) || 0;
        total = total + (total * r);

        principal += (c * cn) || 0;
    }

    return { total, principal };
}
```
