'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import CloseCart from './close-cart';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';
import Price from '../price';
import { createUrl } from '@/app/lib/utils';
import { Cart } from '@/types/cart';
import Stripe from 'stripe';
import { CreateCheckoutSessionResponse } from '@/app/types';
import getStripe from '@/app/lib/stripe/client';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({
  cart,
  taxRate,
  total,
}: {
  cart: Cart | undefined;
  taxRate: Stripe.TaxRate;
  total: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.items.length);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart?.items.length !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.items.length;
    }
  }, [isOpen, cart, quantityRef]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart, taxRate, total }),
        },
      );

      if (response.ok) {
        const data: CreateCheckoutSessionResponse =
          await response.json();
        const stripe = await getStripe();
        if (!stripe) return;
        await stripe.redirectToCheckout({
          sessionId: data.json.sessionId,
        });
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.items.length} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div
              className="fixed inset-0 bg-black/30"
              aria-hidden="true"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>

                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                >
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.items.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.items.map((item, i) => {
                      const merchandiseSearchParams =
                        {} as MerchandiseSearchParams;

                      const merchandiseUrl = createUrl(
                        `/product/${item.id}`,
                        new URLSearchParams(
                          merchandiseSearchParams,
                        ),
                      );

                      return (
                        <li
                          key={i}
                          className="flex w-full flex-col border-b border-neutral-300"
                        >
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              <DeleteItemButton
                                item={item}
                              />
                            </div>
                            <Link
                              href={
                                merchandiseUrl
                              }
                              onClick={closeCart}
                              className="z-30 flex flex-row space-x-4"
                            >
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={
                                    item.name
                                  }
                                  src={
                                    item
                                      .images[0]
                                  }
                                />
                              </div>

                              <div className="flex flex-1 flex-col text-base">
                                <span className="leading-tight">
                                  {item.name}
                                </span>
                                <span className="text-black/40">{item.size}</span>
                              </div>
                            </Link>
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={
                                  item.amount
                                }
                                currencyCode={`AED`}
                              />
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
                                <EditItemQuantityButton
                                  item={item}
                                  type="minus"
                                />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">
                                    {
                                      item.quantity
                                    }
                                  </span>
                                </p>
                                <EditItemQuantityButton
                                  item={item}
                                  type="plus"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1">
                      <p>Taxes</p>
                      <p className="text-right text-base text-black">
                        {taxRate.percentage.toString()}%
                      </p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                      <p>Shipping</p>
                      <p className="text-right">
                        Calculated at checkout
                      </p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black"
                        amount={total}
                        currencyCode={'AED'}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut} // Disable the button when checkout is in progress
                    className={`block w-full rounded-full bg-primary p-3 text-center text-sm font-medium text-white ${isCheckingOut
                      ? 'opacity-50 cursor-not-allowed'
                      : 'opacity-90 hover:opacity-100'
                      }`}
                  >
                    {isCheckingOut
                      ? 'Processing...'
                      : 'Proceed to Checkout'}
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
