import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import Link from "@material-ui/core/Link";

export default function ExternalLink({
  children,
  href
}) {
  
  return (
    <Link href={href} target="_blank">
      {children}
    </Link>
  );
}

ExternalLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
};
