import { getFilePreviewUrl, cleanupFilePreviewUrl } from './file.service';

test(`getFilePreviewUrl`, async () => {
  await getFilePreviewUrl(new File(['abcd', 'eft'], 'file.txt'));
});

test(`cleanupFilePreviewUrl`, async () => {
  cleanupFilePreviewUrl('previewUrl');
});
