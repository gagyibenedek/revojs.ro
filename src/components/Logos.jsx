import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";

import "./logos.scss";

const Logos = ({ list = [], ...props }) => {
  return (
    <ul className="logos-list" {...props}>
      {list.map(logo => {
        const image = require(`@assets/${logo.image}`);
        const isPremium = !!logo.premium;

        return (
          <li key={logo.name} className={isPremium ? "is-premium" : ""}>
            <OutboundLink href={logo.url} className="logo" target="_blank">
              <img src={image} alt={logo.name} width="100%" />
            </OutboundLink>
          </li>
        );
      })}
    </ul>
  );
};

Logos.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
};

export default Logos;
