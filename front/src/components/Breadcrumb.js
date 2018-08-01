import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { capitalize } from '../utils/helpers';

const Breadcrumb = ({ category }) => (
  <AntBreadcrumb>
    <AntBreadcrumb.Item>
      <Link to="/">Home</Link>
    </AntBreadcrumb.Item>
    <AntBreadcrumb.Item>
      {category && category.includes('Post') ? category :
        <Link to={`/${category}`}>
          {category && capitalize(category)}
        </Link>
      }
    </AntBreadcrumb.Item>
  </AntBreadcrumb>
)

export default Breadcrumb;
