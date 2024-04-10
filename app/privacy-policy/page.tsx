import Footer from '@/components/layout/footer';
import Prose from '@/components/prose';
import styles from '../../styles/Logo.module.css';
import clsx from 'clsx';

export const runtime = 'edge';

const html = `
Shisho Baby Clothes is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, and share personal information when you visit our website, use our services, or interact with us. By accessing or using our services, you agree to the terms of this Privacy Policy.

1. Information We Collect

We may collect personal information such as names, addresses, email addresses, and payment details when you engage with our services.

2. How We Use Your Information

We use the collected information for purposes such as order processing, customer support, and marketing. We may also use it to improve our products and services.

3. Consent

By providing us with your personal information, you consent to its collection, use, and disclosure as outlined in this Privacy Policy.

4. Data Security

We implement security measures to protect your personal information from unauthorized access, disclosure, or alteration. 

5. Third-Party Sharing

We may share your personal information with third parties, such as payment processors or shipping companies, to fulfill your orders and provide services. We ensure that any third parties we engage with adhere to privacy and security standards.


6. User Rights

You have the right to access, correct, or delete your personal information. For inquiries about your rights, please contact us at shishobabyclothes@gmail.com.

7. Cookies and Tracking Technologies

We use cookies and similar technologies to enhance your experience on our website. You can manage your cookie preferences through your browser settings.

8. Updates to the Privacy Policy

We may update this Privacy Policy from time to time. The latest version will be posted on our website.

9. Compliance with Regulations

We comply with applicable privacy laws and regulations.

10. Contact Information

For privacy-related inquiries or concerns, please contact us at shishobabyclothes@gmail.com
`;

const formattedHtml = html.replace(
  /(1. Information We Collect|2. How We Use Your Information|3. Consent|4. Data Security|5. Third-Party Sharing|6. User Rights|7. Cookies and Tracking Technologies|8. Updates to the Privacy Policy|9. Compliance with Regulations|10. Contact Information)/g,
  '<br/><br/><strong>$1</strong><br/>',
);

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center px-8 h-auto">
        <div className="max-w-2xl py-20 mx-auto">
          <h1
            className={clsx(
              'mb-8 text-3xl md:text-5xl font-bold',
              styles.magic,
            )}
          >
            Privacy Policy
          </h1>
          <Prose className="mb-8 text-justify" html={formattedHtml} />
        </div>
      </div>
      <Footer />
    </>
  );
}
