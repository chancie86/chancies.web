import React from 'react';
import PropTypes from 'prop-types';

import Document from '../../Components/Document';

export default function DocumentPage(props) {
  return <Document id={props.match.params?.documentId} />;
}

DocumentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      documentId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
