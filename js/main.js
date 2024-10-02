document.addEventListener("DOMContentLoaded", e_first_page_load);
// document.addEventListener("DOMContentLoaded", e_add_dummy_data);

// // simulate slow function with sleep
// function sleep() {
//     return new Promise(resolve => setTimeout(resolve, 2000));
// }

// // simulate slow function with heavy cpu load (taken https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)
// function isPrime(n) {
//     for (let i = 2; i <= Math.sqrt(n); i++) {
//         if (n % i === 0) {
//             return false;
//         }
//     }
//     return n > 1;
// }
// const random = (max) => Math.floor(Math.random() * max);
// function generatePrimes() {
//     const primes = [];
//     while (primes.length < 1000000) {
//         const candidate = random(1000000);
//         if (isPrime(candidate)) {
//             primes.push(candidate);
//         }
//     }
//   return primes;
// }
