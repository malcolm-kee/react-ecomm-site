import { careers } from './career.data';

export const getJobs = jest.fn(() => {
  return Promise.resolve(careers);
});

export const getJob = jest.fn((jobId) => {
  return Promise.resolve({
    _id: 'jobId',
    title: 'Memer',
    department: 'UI / UX Design',
    level: 'experienced',
    summary:
      'The Design team plays an important role in Shopit. The team covers the entire range of product UI/UX design, including the user-growth, promotion, wallet and payment, checkout, retention, listings and users, search and recommendation etc. The team is also responsible for the branding visual identities and elements of Shopit, including logos, mascots, stickers, and internal physical products.',
    descriptions: [
      'Create memes using the latest memes template',
      'Resurrect outdated memes templates by changing wordings to reflect latest trend',
      'Able to tell joke without appearing trying too hard',
    ],
    requirements: [
      'Knowledge of latest memes template',
      'Creative but not destructive',
      'Balls to make fun of your boss',
    ],
  });
});
