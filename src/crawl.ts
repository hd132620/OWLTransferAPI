import request from 'request';

export const crawl = () =>
   new Promise<string>((resolve, reject) => {
     request.get('https://namu.wiki/w/%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98%20%EB%A6%AC%EA%B7%B8%202020%20%EC%8B%9C%EC%A6%8C/%EC%98%A4%ED%94%84%EC%8B%9C%EC%A6%8C', (err, res) => {
       if (err) reject(err);
       resolve(res.body);
     });
   },
);
