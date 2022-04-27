import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 50 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 500 },
    { duration: '1m', target: 500 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {

  const randomProduct = Math.floor(Math.random() * 1000011)

  const res = http.get(`http://localhost:3000/api/qa/questions?product_id=${randomProduct}`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}