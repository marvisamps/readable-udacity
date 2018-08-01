import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: 80 }}>
    <div style={{ marginBottom: 50, fontSize: 24 }}>
      Oops, something went wrong!
    </div>
    <Link to="/">
      <Button type="dashed" size="large" icon="plus-circle-o">
        Back to Home
      </Button>
    </Link>
  </div>
)

export default NotFound;
