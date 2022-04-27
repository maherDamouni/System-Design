import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
};

export default function () {

  const randomProduct = Math.floor(Math.random() * 1000011)

  const res = http.get(`http://localhost:3000/api/qa/questions?product_id=${randomProduct}`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}