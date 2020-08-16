import { Jumbotron } from 'components/jumbotron';
import { Seo } from 'components/seo';
import { useWindowEvent } from 'hooks/use-window-event';
import { createArray } from 'lib/array';
import { MarketingBanner } from 'modules/marketing/components/marketing-banner';
import { ProductBox } from 'modules/products/components/product-box';
import { ProductBoxSkeleton } from 'modules/products/components/product-box-skeleton';
import { useProducts } from 'modules/products/product.queries';
import * as React from 'react';

export function MainPage() {
  const {
    data: productGroups,
    canFetchMore,
    status,
    isFetchingMore,
    fetchMore,
  } = useProducts();

  useWindowEvent(
    'scroll',
    () => {
      if (
        canFetchMore &&
        window.innerHeight + window.scrollY > document.body.clientHeight - 300
      ) {
        if (!isFetchingMore) {
          fetchMore();
        }
      }
    },
    { wait: 200 }
  );

  return (
    <>
      <Seo title="Shopit: Save Your Money" />
      <div className="hidden sm:block">
        <MarketingBanner />
      </div>
      <div>
        <Jumbotron title="Shopit">
          <blockquote>
            <p>
              The best shopping site in the web that would saves you most money.
            </p>
            <small>Because you can't buy anything here.</small>
          </blockquote>
        </Jumbotron>
        <div className="p-2 grid grid-cols-2 gap-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {productGroups &&
            productGroups.map((products, i) => (
              <React.Fragment key={i}>
                {products.map((product) => (
                  <ProductBox {...product} key={product._id} />
                ))}
              </React.Fragment>
            ))}
          {(status === 'loading' || isFetchingMore) && skeletons}
        </div>
      </div>
    </>
  );
}

const skeletons = createArray(12).map((_, index) => <ProductBoxSkeleton key={index} />);
