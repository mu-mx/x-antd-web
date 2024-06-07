// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
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
  Radio,
  Tooltip,
  FloatButton,
  Anchor,
} from 'antd';

import StickyBox from 'react-sticky-box';
import { RedoOutlined } from '@ant-design/icons';

import CardItem from './CardItem';
import { fetchData, getDataBase } from '@/utils/data'

export default function Index() {
  const [mode, setMode] = React.useState('top');

  const [data, setData] = useState([]);

  const renderNextTime = useRef(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox
      offsetTop={0}
      offsetBottom={20}
      style={{ zIndex: 1 }}
    >
      <DefaultTabBar
        {...props}
        style={{ background: colorBgContainer }}
      />
    </StickyBox>
  );

  const getList = async () => {
    const data = await getDataBase();
    console.log('data - >:', data);
    setData(data);
  };

  const mouseEvent = new MouseEvent('click', {
    //创建一个 click 的鼠标事件 并让他点击
    bubbles: true,
    cancelable: true,
  });

  const tabHover = () => {
    var els = document.querySelectorAll('.ant-tabs-tab');
    var top = document.querySelectorAll('.ant-tabs-tab-btn');
    for (let i = 0; i < top.length; i++) {
      top[i].addEventListener('mouseover', function () {
        //给某个 dom 在=绑定 mouseover 事件
        els[i].dispatchEvent(mouseEvent); // 在 mouseover 中将想要进行的 click 通过 dispatchEvent 事件派发给将要发生 click 的 div
      });
    }
  };

  // useEffect(() => {
  //     if (renderNextTime.current) {
  //         renderNextTime.current = false;
  //     } else {
  //         tabHover();
  //     }
  // });

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row>
        <Col
          span={4}
          offset={2}
        >
          <Anchor
            affix={false}
            style={{ maxHeight: '60vh', overflowY: 'auto' }}
            targetOffset={32}
            getContainer={() => document.querySelector('#bigWrap')}
            items={data.map((item, index) => ({
              key: index + 1,
              href: '#nav' + index,
              title: item.title,
            }))}
          />
        </Col>

        <Col
          span={14}
          id='bigWrap'
          style={{ overflowY: 'auto', height: '860px' }}
        >
          {data.map((_, i) => (
            <div
              id={'nav' + i}
              key={i}
              style={{ minHeight: '30vh' }}
            >
              <CardItem data={_} />
            </div>
          ))}

          {/* <Card
                        id="bigWrap"
                        title=""
                        className="daohang-body h-full"
                        styles={{
                            header: {
                                // padding: "8px 12px",
                                padding: "0",
                                minHeight: "0",
                            },
                            body: { padding: "12px 8px", overflowY: "auto", height: "860px" },
                        }}
                    >
                       

                        {data.map((_, i) => (
                            <div
                                id={"nav" + i}
                                key={i}
                                style={{ minHeight: "30vh" }}
                            >
                                <CardItem data={_} />
                            </div>
                        ))}
                    </Card> */}
        </Col>
      </Row>

      <FloatButton.BackTop
        style={{
          left: '16%',
          bottom: '20%',
        }}
        target={() => document.querySelector('#bigWrap')}
      />

      <FloatButton
        style={{
          left: '16%',
          bottom: '14%',
        }}
        icon={
          <Tooltip title='刷新数据'>
            <RedoOutlined />
          </Tooltip>
        }
        onClick={async () => {
          localStorage.clear();

          fetchData().then(() => {
            window.location.reload();
          });
        }}
      />
    </>
  );
}
