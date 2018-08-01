import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const NoPosts = () => (
  <div style={{ textAlign: 'center', padding: 80 }}>
    <div style={{ marginBottom: 50, fontSize: 24 }}>
      There's nothing here!
    </div>
    <Link to="/new">
      <Button type="dashed" size="large" icon="plus-circle-o">
        Add a Post
      </Button>
    </Link>
  </div>
)

export default NoPosts;
