// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

import {
  Button,
  Col,
  Row,
  Input,
  Select,
  Card,
  Tabs,
  Collapse,
  theme,
  Avatar,
  Space,
  Tooltip,
} from 'antd';
import { SearchOutlined, CaretRightOutlined } from '@ant-design/icons';
import { getDataByName } from '../../utils/data';

export default function Index() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(undefined);
  const select = useRef(null);

  const handleSearch = (newValue) => {
    getDataByName(newValue).then((res) => {
      setData(res);
    });
  };

  const getList = () => {
    getDataByName().then((res) => {
      setData(res);
    });
  };

  const onKeyDown = (e) => {
    // 191 是 / 键  自动聚焦输入框 搜索
    if (e.keyCode === 191) {
      e.preventDefault();
      select.current.focus();
    }
  };

  useEffect(() => {
    getList();

    window.addEventListener('keydown', onKeyDown); // 添加全局事件

    return () => {
      window.removeEventListener('keydown', onKeyDown); // 销毁
    };
  }, []);

  return (
    <>
      <Select
        ref={select}
        showSearch
        allowClear
        placeholder="请输入"
        value={value}
        size="large"
        style={{
          margin: '20px auto',
          width: '40%',
          display: 'block',
        }}
        onChange={(newValue, option) => {
          setValue(newValue);

          if (newValue) {
            window.open(option.url, '_blank');
          }

          setValue('');
          getList();
        }}
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={handleSearch}
        suffixIcon={<SearchOutlined />}
        options={(data || []).map((d) => ({
          ...d,
          value: d._id,
          label: `${d.title}`,
        }))}
        optionRender={(option) => (
          <Tooltip
            placement="top"
            title={option.data.description}
          >
            <div>{option.data.label}</div>
          </Tooltip>
        )}
      />
    </>
  );
}
