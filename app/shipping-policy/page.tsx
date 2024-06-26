import Footer from '@/components/layout/footer';
import Prose from '@/components/prose';
import clsx from 'clsx';

export const runtime = 'edge';

const html = `
1. Processing Time

Orders are typically processed within 2-5 days. Please note that processing time may vary during peak seasons.
2. Shipping Rates

We offer FREE delivery on orders from AED 100 and above.

Orders under AED 100 will include a delivery charge during checkout, based on the following areas:

Dubai 15 aed
Sharjah 25 aed
Abu Dhabi, Ajman, Al Ain, Umm Al Quwain, Ras Al Khaima, Fujairah 40 aed.


3. Shipment Tracking

Once your order has been placed, you will receive a confirmation email with tracking information. You can track your shipment using the provided tracking number.

4. Shipping Restrictions

We currently only ship to addresses within United Arab Emirates.

5. Lost or Stolen Packages

We are not responsible for lost or stolen packages. Please ensure that the shipping address provided is secure and accurate.
`;

const formattedHtml = html.replace(
    /(1. Processing Time|2. Shipping Rates|3. Shipment Tracking|4. Shipping Restrictions|5. Lost or Stolen Packages)/g,
    '<br/><br/><strong>$1</strong><br/>',
);

export default function Page() {
    return (
        <>
            <div className="flex justify-center items-center px-8">
                <div className="max-w-2xl py-20 mx-auto">
                    <h1 className={clsx('mb-8 text-3xl md:text-5xl font-bold')}>
                        Shipping Policy
                    </h1>
                    <Prose className="mb-8 text-justify" html={formattedHtml} />
                </div>
            </div>
            <Footer />
        </>
    );
}
