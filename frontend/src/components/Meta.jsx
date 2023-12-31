import { Helmet } from "react-helmet";

export default function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "我的商城",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electroincs",
};