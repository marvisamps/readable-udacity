import React from 'react';
import { Select } from 'antd';

const SortBy = ({ onSortChange, align, size }) => (
  <div style={{ textAlign: align }}>
    <span style={styles.label}>
      Sorted By
    </span>
    <Select
      defaultValue="date"
      size={size ? size : "default"}
      style={styles.select}
      onChange={type => onSortChange(type)}
    >
      <Select.Option value="date">Most Recent</Select.Option>
      <Select.Option value="votes">Top Voted</Select.Option>
    </Select>
  </div>
)

const styles = {
  label: {
    marginRight: 8,
    fontWeight: 600,
  },
  select: {
    width: 145,
  }
}

export default SortBy;
