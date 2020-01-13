import React from 'react';

import { CSVLink } from "react-csv";

  

const CSV = props => (
    
    <CSVLink
            data={props.data}
            filename={"my-file.csv"}
            className="btn btn-primary"
            target="_blank">Download me
    </CSVLink>
        
    );
  
  
  export default CSV;