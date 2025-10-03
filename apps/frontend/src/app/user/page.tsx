import { UserProfile } from './user-profile';
/*import { fetchUserDetail } from '../server-actions';

export async function generateMetadata(): Promise<Metadata> {
  const user = await fetchUserDetail();
  const title = `Page of ${user.data?.name}`,
    description = `con cho shark ` + user.data?.email;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    authors: {
      name: 'Doai',
      url: 'https://www.prisma.io/docs/orm/prisma-client/queries/case-sensitivity#options-for-case-insensitive-filtering',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}*/

export default function Page() {
  return (
    <>
      <UserProfile />
    </>
  );
}

/*
<script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `product.name`,
          image: [`product.image`],
          description: `product.shortDescription`,
          sku: `product.sku`,
          brand: { '@type': 'Brand', name: `product.brand` },
          offers: {
            '@type': 'Offer',
            url: `https://example.com/products/product.slug`,
            priceCurrency: 'VND',
            price: `product.price`,
            availability: 'https://schema.org/InStock',
          },
        })}
      </script>
* */