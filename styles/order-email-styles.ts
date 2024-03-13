export const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

export const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

export const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

export const tableCell = { display: "table-cell" };

export const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

export const cupomText = {
  textAlign: "center" as const,
  margin: "36px 0 40px 0",
  fontSize: "14px",
  fontWeight: "500",
  color: "#111111",
};

export const supStyle = {
  fontWeight: "300",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

export const informationTableRow = {
  height: "46px",
};

export const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

export const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

export const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

export const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

export const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

export const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgba(128,128,128,0.2)",
};

export const productTitle = {
  fontSize: "12px",
  fontWeight: "600",
  ...resetText,
};

export const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

export const productLink = {
  fontSize: "12px",
  color: "rgb(0,112,201)",
  textDecoration: "none",
};

export const divisor = {
  marginLeft: "4px",
  marginRight: "4px",
  color: "rgb(51,51,51)",
  fontWeight: 200,
};

export const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

export const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

export const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

export const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};

export const productPriceLine = { margin: "30px 0 0 0" };

export const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

export const productPriceLargeWrapper = {
  display: "table-cell",
  width: "90px",
};

export const productPriceLineBottom = { margin: "0 0 75px 0" };

export const block = { display: "block" };

export const ctaTitle = {
  display: "block",
  margin: "15px 0 0 0",
};

export const ctaText = { fontSize: "24px", fontWeight: "500" };

export const walletWrapper = { display: "table-cell", margin: "10px 0 0 0" };

export const walletLink = { color: "rgb(0,126,255)", textDecoration: "none" };

export const walletImage = {
  display: "inherit",
  paddingRight: "8px",
  verticalAlign: "middle",
};

export const walletBottomLine = { margin: "65px 0 20px 0" };

export const footerText = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "0",
  lineHeight: "auto",
  marginBottom: "16px",
};

export const footerTextCenter = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "20px 0",
  lineHeight: "auto",
  textAlign: "center" as const,
};

export const footerLink = { color: "rgb(0,115,255)" };

export const footerIcon = { display: "block", margin: "40px 0 0 0" };

export const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

export const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

export const walletLinkText = {
  fontSize: "14px",
  fontWeight: "400",
  textDecoration: "none",
};
