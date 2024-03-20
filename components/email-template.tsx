import { Order } from "@/app/types";
import {
  block,
  container,
  ctaText,
  ctaTitle,
  divisor,
  footerCopyright,
  footerIcon,
  footerLinksWrapper,
  footerText,
  heading,
  informationTableColumn,
  informationTableLabel,
  informationTableRow,
  informationTableValue,
  main,
  productDescription,
  productIcon,
  productLink,
  productPrice,
  productPriceLarge,
  productPriceLargeWrapper,
  productPriceLine,
  productPriceLineBottom,
  productPriceTotal,
  productPriceVerticalLine,
  productPriceWrapper,
  productTitle,
  productTitleTable,
  productsTitle,
  tableCell,
  walletBottomLine,
  walletLink,
  walletLinkText,
  walletWrapper,
} from "@/styles/order-email-styles";
import { ShoppingBagIcon, WalletIcon } from "@heroicons/react/16/solid";
import {
  Tailwind,
  Text,
  Html,
  Body,
  Container,
  Row,
  Column,
  Img,
  Head,
  Preview,
  Section,
  Hr,
  Link,
  Button,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  order: Order;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  order,
}) => {
  let formattedDate = "Unknown";
  if (order && order.created_at) {
    const dateTime = new Date(order.created_at);
    formattedDate = dateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Shisho Baby Clothes Receipt</Preview>

        <Body style={main}>
          <Container style={container}>
            <Section>
              <Row>
                <Column>
                  <Img
                    src={`https://nzpyistmyfgivlnfmcwx.supabase.co/storage/v1/object/sign/shisho/logo_2.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzaGlzaG8vbG9nb18yLnN2ZyIsImlhdCI6MTcxMDYzMjA0OCwiZXhwIjoxODY4MzEyMDQ4fQ.EtqvcFk5kH8G70CTwmeeSPsaeOiuJcheUJi6uKH-cFY&t=2024-03-16T23%3A33%3A44.372Z`}
                    width="42"
                    height="42"
                    alt="Shisho Baby Clothes Logo"
                  />
                </Column>

                <Column align="right" style={tableCell}>
                  <Text style={heading}>Receipt</Text>
                </Column>
              </Row>
            </Section>
            <Section style={informationTableRow}>
              <Row style={informationTableRow}>
                <Column colSpan={2}>
                  <Section>
                    <Row>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>Email</Text>
                        <Link
                          style={{
                            ...informationTableValue,
                            color: "#17c",
                            textDecoration: "underline",
                          }}
                        >
                          {order.customerEmail}
                        </Link>
                      </Column>
                    </Row>

                    <Row>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>INVOICE DATE</Text>
                        <Text style={informationTableValue}>
                          {formattedDate}
                        </Text>
                      </Column>
                    </Row>

                    <Row>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>ORDER ID</Text>
                        <Link
                          style={{
                            ...informationTableValue,
                            color: "#15c",
                            textDecoration: "underline",
                          }}
                        >
                          {order.id}
                        </Link>
                      </Column>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>DOCUMENT NO.</Text>
                        <Text style={informationTableValue}>186623754793</Text>
                      </Column>
                    </Row>
                  </Section>
                </Column>
                <Column style={informationTableColumn} colSpan={2}>
                  <Text style={informationTableLabel}>BILLED TO</Text>
                  <Text style={informationTableValue}>Visa .... 4242</Text>
                  <Text style={informationTableValue}>
                    {order.customerName}
                  </Text>
                  <Text style={informationTableValue}>
                    {order.shippingAddress.line1}
                  </Text>
                  <Text style={informationTableValue}>
                    {order.shippingAddress.line2}{" "}
                    {order.shippingAddress.postalCode}
                  </Text>
                  <Text style={informationTableValue}>
                    {order.shippingAddress.state}{" "}
                    {order.shippingAddress.country}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section style={productTitleTable}>
              <Text style={productsTitle}>Products</Text>
            </Section>
            <Section>
              {order.lineItems.map((item, idx) => (
                <Row key={`${item.id}-${idx}`}>
                  <Column style={{ width: "64px" }}>
                    <Img
                      src={`${item.url}`}
                      alt={`Product ${item.description}`}
                      aria-label={`${item.description}`}
                      width="64"
                      height="64"
                      style={productIcon}
                    />
                  </Column>
                  <Column style={{ paddingLeft: "22px" }}>
                    <Text style={productTitle}>{item.description}</Text>
                    <Text style={productDescription}>{item.description}</Text>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_SITE_URL}`}
                      style={productLink}
                      data-saferedirecturl={`${process.env.NEXT_PUBLIC_SITE_URL}`}
                    >
                      Write a Review
                    </Link>
                    <span style={divisor}>|</span>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_SITE_URL}`}
                      style={productLink}
                      data-saferedirecturl={`${process.env.NEXT_PUBLIC_SITE_URL}`}
                    >
                      Report a Problem
                    </Link>
                  </Column>

                  <Column style={productPriceWrapper} align="right">
                    <Text style={productPrice}>
                      $
                      {(
                        parseInt(item.price?.unit_amount_decimal as string) /
                        100
                      ).toFixed(2)}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
            <Section align="right">
              <Row>
                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>
                    {(
                      (order.shippingCost?.amount_total as number) / 100
                    ).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr style={productPriceLine} />
            <Section align="right">
              <Row>
                <Column style={tableCell} align="right">
                  <Text style={productPriceTotal}>TOTAL</Text>
                </Column>
                <Column style={productPriceVerticalLine}></Column>
                <Column style={productPriceLargeWrapper}>
                  <Text style={productPriceLarge}>
                    ${(order.amountTotal / 100).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr style={productPriceLineBottom} />
            <Section className="my-8">
              <Row>
                <Column align="center" style={ctaTitle}>
                  <Button
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/orders/${order.id}`}
                    style={{
                      fontSize: "14px",
                      backgroundColor: "#16c",
                      color: "#fff",
                      lineHeight: 1.5,
                      borderRadius: "0.5em",
                      padding: "12px 24px",
                    }}
                  >
                    See order
                  </Button>
                </Column>
              </Row>
            </Section>
            <Section>
              <Row>
                <Column align="center" style={block}>
                  <ShoppingBagIcon className="h-7" />
                </Column>
              </Row>
            </Section>
            <Section>
              <Row>
                <Column align="center" style={ctaTitle}>
                  <Text style={ctaText}>
                    Free Delivery on orders above 250AED
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section style={{ marginTop: "20px" }}>
              <Row>
                <Column align="center" style={walletWrapper}>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/search`}
                    style={walletLink}
                  >
                    <WalletIcon className="h-6" />
                    <span style={walletLinkText}>Apply and use in minutes</span>
                  </Link>
                </Column>
              </Row>
            </Section>
            <Hr style={walletBottomLine} />
            <Text style={footerText}>
              We offer FREE delivery on orders from AED 250 and above. Orders
              under AED 250 will include a delivery charge during checkout,
              based on the following areas: Dubai 40 aed Sharjah 50 aed Abu
              Dhabi, Ajman, Al Ain, Umm Al Quwain, Ras Al Khaima, Fujairah 60
              aed
            </Text>
            <Text style={footerText}>2. Shipment Tracking.</Text>
            <Text style={footerText}>
              Once your order has been shipped, you will receive a confirmation
              email with tracking information. You can track your shipment using
              the provided tracking number.
            </Text>
            <Text style={footerText}>
              We currently only ship to addresses within United Arab Emirates.
            </Text>
            <Text style={footerText}>
              We are not responsible for lost or stolen packages. Please ensure
              that the shipping address provided is secure and accurate.
            </Text>
            <Section>
              <Row>
                <Column align="center" style={footerIcon}>
                  <Img
                    src={`https://nzpyistmyfgivlnfmcwx.supabase.co/storage/v1/object/sign/shisho/logo_2.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzaGlzaG8vbG9nb18yLnN2ZyIsImlhdCI6MTcxMDYzMjA0OCwiZXhwIjoxODY4MzEyMDQ4fQ.EtqvcFk5kH8G70CTwmeeSPsaeOiuJcheUJi6uKH-cFY&t=2024-03-16T23%3A33%3A44.372Z`}
                    width="26"
                    height="26"
                    alt="Shisho Baby Clothes Logo"
                  />
                </Column>
              </Row>
            </Section>
            <Text style={footerLinksWrapper}>
              <Link
                href={`${process.env.NEXT_PUBLIC_SITE_URL}/shipping-policy`}
              >
                Terms of Sale
              </Link>{" "}
              •{" "}
              <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`}>
                Privacy Policy{" "}
              </Link>
            </Text>
            <Text style={footerCopyright}>
              Copyright © 2024 Shisho Baby Clothes. <br />{" "}
              <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/about-us`}>
                All rights reserved
              </Link>
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
