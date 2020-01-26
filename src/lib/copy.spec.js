import { copyText } from './copy';

test('copyText', async () => {
  await copyText('12345678');
});
