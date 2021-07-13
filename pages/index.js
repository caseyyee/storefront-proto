import StarIcon from '@material-ui/icons/Star';
import Head from 'next/head';
import IndigoIframe from '../components/indigo-iframe';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';

const VIEWER_URL = 'https://production.d1gqpxjdsc5l4a.amplifyapp.com/?url=';
const DEFAULT_ASSET_URL =
  'https://s3.amazonaws.com/shakingearthdigital.indigo/samples/realistic_cat.zip';
const DEFAULT_PRODUCT_NAME = 'Product Name';

export default function Home() {
  const router = useRouter();
  const assetUrl = VIEWER_URL + encodeURIComponent(router.query.assetUrl || DEFAULT_ASSET_URL);
  const productName = router.query.productName || DEFAULT_PRODUCT_NAME;

  return (
    <IntlProvider locale="en" defaultLocale="en">
      <Head>
        <title>Unity Storefront</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border-b border-gray-300">
        <div className="flex container mx-auto">
          <div className="grid gap-3 grid-flow-col py-5">
            <img src="images/unity-logo.svg" height="200" />
            <div className="text-3xl font-medium">Storefront</div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="grid grid-flow-col auto-cols-max gap-20">
              <div className="flex items-center justify-center text-xl border-b-2 border-black font-medium">
                Products
              </div>
              <div className="flex items-center justify-center text-xl text-gray-400 font-medium">
                Collections
              </div>
              <div className="flex items-center justify-center text-xl text-gray-400 font-medium">
                Shipping
              </div>
            </div>
          </div>
          <div className="border-l border-gray-300 flex items-center justify-center">
            <div className="grid grid-rows-2 grid-flow-col">
              <div className="row-span-2 ml-4 mr-2 flex items-center justify-center">
                <div className="rounded-full h-9 w-9 flex items-center justify-center text-white bg-gradient-to-r from-green-400 to-blue-500">
                  J
                </div>
              </div>
              <div>Jonny Kim</div>
              <div className="text-sm text-gray-400">Ustwo Games</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex">
        <div className="w-7/12">
          <div className="mt-16 mr-16" style={{ height: '600px' }}>
            <IndigoIframe src={assetUrl} />
          </div>
        </div>
        <div className="flex-1">
          <section className="flex w-full mt-16 p-4">
            <div className="flex-1 text-3xl font-medium">{productName}</div>
            <div className="text-3xl font-medium">$184</div>
          </section>

          <section className="px-4">
            <span className="fill-current text-yellow-400">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </span>
            <span className="ml-4 text-sm text-gray-400">930 reviews</span>
          </section>

          <section className="border-t border-b border-gray-300 p-4 my-6">
            <div className="font-medium">Fit</div>
            <div className="text-gray-400">Standard</div>
          </section>

          <button className="bg-blue-400 text-white w-full p-4 rounded-md font-medium">
            Add to bag
          </button>

          <section className="p-4 my-6">
            <div className="font-medium mb-4">Product Info</div>
            <div>
              The XL edition offers a standard size frame with enhanced lens coverage, and every
              millimeter of the peripheral view is optimized with High Definition Optics™ in a
              durable yet lightweight design that takes performance to the next level and brings
              style along for the ride.
            </div>
          </section>

          <section className="p-4 my-6 grid grid-cols-2 grid-flow-cols gap-4">
            <div className="text-sm text-gray-400">
              Lightweight O Matter™ frame material with ellipse metal icon accents
            </div>
            <div className="text-sm text-gray-400">
              Unobtainium™ earsocks and nosepads for increased comfort and performance
            </div>
            <div className="border-b border-gray-300 col-span-2"></div>
            <div className="text-sm text-gray-400">8.75 base lens geometry with HDO™</div>
            <div className="text-sm text-gray-400">
              Available with Prizm™ lenses to enhance color, contrast and detail for an optimized
              experience
            </div>
            <div className="border-b border-gray-300 col-span-2"></div>
            <div className="text-sm text-gray-400">
              Polarized and Iridium™ lens options available
            </div>
            <div className="text-sm text-gray-400">
              Available with Oakley Authentic Prescription Lenses
            </div>
            <div className="border-b border-gray-300 col-span-2"></div>
            <div className="text-sm text-gray-400">Protective soft vault included</div>
          </section>
        </div>
      </div>
    </IntlProvider>
  );
}
