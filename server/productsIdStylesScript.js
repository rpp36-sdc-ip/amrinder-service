import http from 'k6/http';
import { sleep, check } from 'k6';

const URL = "http://localhost:8080";

export let options = {
  stages: [
      { duration: '30s', target: 1 },
      { duration: '30s', target: 10 },
      { duration: '1m', target: 100 },
      { duration: '1m', target: 1000 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(100)<2000'],
  },
};

export default function () {

  let getProducts = http.get(
    `${URL}/products/1000010/styles`
  )
  check(
      getProducts,
      { "Get products status code is 200": (r) => r.status == 200 }
  );

  sleep(1);
}

//k6 run server/productsIdStylesScript.js
