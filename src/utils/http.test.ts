import HTTPTransport from './http';

const http = new HTTPTransport('https://jsonplaceholder.typicode.com');

describe('HTTPTransport', () => {
  it('Get', (done) => {
    http
      .get(
        '/comments',
      )
      .then(({ response }) => {
        const [{ postId }] = JSON.parse(response) || [];
        if (postId === 1) {
          done();
        } else {
          done(new Error('Ожидался [postId]'));
        }
      })
      .catch(done);
  });

  it('Post', (done) => {
    http
      .post('/posts',{
        data: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
      })
      .then(({ response }) => {
        const { title } = JSON.parse(response) || {};
        if (title === 'foo') {
          done();
        } else {
          done(new Error('Ожидался {title: foo}'));
        }
      })
      .catch(done);
  });
});