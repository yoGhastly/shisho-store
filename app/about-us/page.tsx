import Footer from '@/components/layout/footer';
import Prose from '@/components/prose';
import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

const html = `
Welcome to Shisho Baby Clothes - Adorable Fashion for Little Ones!

At Shisho Baby clothes, we believe in making every moment with your little one extra special. Our passion for creating adorable, comfortable, and high-quality baby clothes stems from our commitment to providing parents with the best for their bundles of joy.

Who We Are:

Founded in 2023, Shisho Baby Clothes is a family-owned business dedicated to dressing your little ones in style. We understand the importance of those precious early years and strive to make them even more memorable with our charming and practical baby clothing collections.

Our Mission:

Our mission is simple - to bring joy to families by offering a delightful range of baby clothes that combine style, comfort, and affordability. We believe that every baby deserves to be wrapped in love and dressed in the cutest outfits.

Connect With Us:
We love hearing from our customers! Connect with us on social media platforms for the latest updates. Your stories and experiences inspire us to keep doing what we love.

Thank you for choosing Shisho Baby Clothes for your baby's wardrobe. We look forward to being part of your family's journey!
`
export default function Page() {


  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='max-w-2xl py-20 mx-auto' >
          <h1 className="mb-8 text-5xl font-bold">About us</h1>
          <Prose className="mb-8" html={html} />
        </div>
      </div>
      <Footer />
    </>
  );
}
