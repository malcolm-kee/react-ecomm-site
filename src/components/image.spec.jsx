import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Image } from './image';

describe(`<Image />`, () => {
  it(`load successfully`, async () => {
    const { getAllByAltText, getByAltText, getByRole, queryByRole } = render(
      <Image
        src="/malcolm.jpg"
        webpSrc="/malcolm.webp"
        blurSrc="/malcolm-blur.jpg"
        alt="Malcolm"
      />
    );

    expect(getByRole('progressbar')).toBeVisible();

    fireEvent.load(getByAltText('Malcolm'));

    expect(queryByRole('progressbar')).toBeNull();

    fireEvent.load(getAllByAltText('Malcolm')[1]);
  });

  it(`fails to load`, async () => {
    const { getByAltText, getByRole, queryByRole, getByText } = render(
      <Image src="/malcolm.jpg" blurSrc="/malcolm-blur.jpg" alt="Malcolm" />
    );

    expect(getByRole('progressbar')).toBeVisible();

    fireEvent.error(getByAltText('Malcolm'));

    expect(queryByRole('progressbar')).toBeNull();

    expect(getByText('Fail to load')).toBeVisible();
  });

  it(`fails to load full image`, async () => {
    const {
      getAllByAltText,
      getByAltText,
      getByRole,
      queryByRole,
      getByText,
    } = render(
      <Image src="/malcolm.jpg" blurSrc="/malcolm-blur.jpg" alt="Malcolm" />
    );

    expect(getByRole('progressbar')).toBeVisible();

    fireEvent.load(getByAltText('Malcolm'));
    fireEvent.error(getAllByAltText('Malcolm')[1]);

    expect(queryByRole('progressbar')).toBeNull();

    expect(getByText('Fail to load')).toBeVisible();
  });
});
