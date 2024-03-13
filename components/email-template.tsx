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
import {
  PhotoIcon,
  ShoppingBagIcon,
  WalletIcon,
} from "@heroicons/react/16/solid";
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
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  order: Order;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  order,
}) => (
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
                  src={`/logo_2.svg`}
                  width="42"
                  height="42"
                  alt="Apple Logo"
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
                          color: "#15c",
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
                      <Text style={informationTableValue}>18 Jan 2023</Text>
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
                <Text style={informationTableValue}>{order.customerName}</Text>
                <Text style={informationTableValue}>
                  {order.shippingAddress.line1}
                </Text>
                <Text style={informationTableValue}>
                  {order.shippingAddress.line2}{" "}
                  {order.shippingAddress.postalCode}
                </Text>
                <Text style={informationTableValue}>
                  {order.shippingAddress.state} {order.shippingAddress.country}
                </Text>
              </Column>
            </Row>
          </Section>
          <Section style={productTitleTable}>
            <Text style={productsTitle}>Products</Text>
          </Section>
          <Section>
            {order.lineItems?.data.map((item, idx) => (
              <Row key={`${item.id}-${idx}`}>
                <Column style={{ width: "64px" }}>
                  <PhotoIcon className="h-7" />
                </Column>
                <Column style={{ paddingLeft: "22px" }}>
                  <Text style={productTitle}>{item.description}</Text>
                  <Text style={productDescription}>{item.description}</Text>
                  <Link
                    href="https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc=us&amp;id=1497977514&amp;o=i&amp;type=Subscription%20Renewal"
                    style={productLink}
                    data-saferedirecturl="https://www.google.com/url?q=https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc%3Dus%26id%3D1497977514%26o%3Di%26type%3DSubscription%2520Renewal&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw2DFCLKMo1snS-Swk5H26Z1"
                  >
                    Write a Review
                  </Link>
                  <span style={divisor}>|</span>
                  <Link
                    href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/reportAProblem?a=1497977514&amp;cc=us&amp;d=683263808&amp;o=i&amp;p=29065684906671&amp;pli=29092219632071&amp;s=1"
                    style={productLink}
                    data-saferedirecturl="https://www.google.com/url?q=https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/reportAProblem?a%3D1497977514%26cc%3Dus%26d%3D683263808%26o%3Di%26p%3D29065684906671%26pli%3D29092219632071%26s%3D1&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw3y47L06B2LTrL6qsmaW2Hq"
                  >
                    Report a Problem
                  </Link>
                </Column>

                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>
                    ${item.price?.unit_amount_decimal}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>
          <Hr style={productPriceLine} />
          <Section align="right">
            <Row>
              <Column style={tableCell} align="right">
                <Text style={productPriceTotal}>TOTAL</Text>
              </Column>
              <Column style={productPriceVerticalLine}></Column>
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceLarge}>${order.amountTotal}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={productPriceLineBottom} />
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
          <Section>
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
            under AED 250 will include a delivery charge during checkout, based
            on the following areas: Dubai 40 aed Sharjah 50 aed Abu Dhabi,
            Ajman, Al Ain, Umm Al Quwain, Ras Al Khaima, Fujairah 60 aed
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
                  src={`/logo_2.svg`}
                  width="26"
                  height="26"
                  alt="Shisho Baby Clothes"
                />
              </Column>
            </Row>
          </Section>
          <Text style={footerLinksWrapper}>
            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/shipping-policy`}>
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
