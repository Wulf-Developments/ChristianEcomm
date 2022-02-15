import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Crown of Life Products",
  description: "We sell the best christian products for cheap!",
  keywords: "christianity, christian, cross, buy, ",
};

export default Meta;
