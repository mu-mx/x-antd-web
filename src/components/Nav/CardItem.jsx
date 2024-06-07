// @ts-nocheck
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

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
  message,
  List,
} from 'antd';

import Icon, {
  SearchOutlined,
  CaretRightOutlined,
  CopyOutlined,
  EditOutlined,
  ForwardOutlined,
  CloudOutlined,
} from '@ant-design/icons';

import copy from 'copy-to-clipboard';

const ClickableCardBack = ({ icon, title, description, url }) => {
  return (
    <>
      <Tooltip
        placement='top'
        title={description}
      >
        <a
          href={url}
          target='_blank'
          rel='noreferrer'
        >
          <Card
            hoverable
            bodyStyle={{
              padding: '12px 8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon ? (
              <Avatar
                style={{
                  verticalAlign: 'middle',
                }}
                size='large'
                src={icon}
              />
            ) : (
              <Avatar
                style={{
                  verticalAlign: 'middle',
                }}
                size='large'
              >
                X
              </Avatar>
            )}
            <div className='ml-2 truncate flex-1'>
              <p className='truncate '>{title}</p>
              <p className='truncate '>{description}</p>
            </div>
          </Card>
        </a>
      </Tooltip>
    </>
  );
};

const DefaultIcon = (value) => (
  <svg
    width='22'
    height='22'
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M2 23.3548H11L17.8889 4L28.8889 44L37 23.3548H46'
      stroke='#333'
      strokeWidth='4'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ClickableCard = ({ icon, title, description, url }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}

      <Card
        hoverable
        size='small'
        className='small-card'
        loading={!url}
        bodyStyle={{
          padding: '12px 8px',
          display: 'flex',
          alignItems: 'center',
        }}
        actions={[
          <Tooltip
            key='copy'
            placement='top'
            title={'复制 ' + url}
          >
            <CopyOutlined onClick={() => copy(url)} />
          </Tooltip>,

          <Tooltip
            placement='top'
            key='open'
            title={`打开 ${url}`}
          >
            <a
              href={url}
              target='_blank'
              rel='noreferrer'
            >
              <ForwardOutlined />
            </a>
          </Tooltip>,
        ]}
      >
        <Tooltip
          placement='top'
          key='open'
          title={`打开 ${url}`}
        >
          <a
            href={url}
            target='_blank'
            rel='noreferrer'
          >
            <Avatar
              style={{
                verticalAlign: 'middle',
              }}
              size='small'
              src={icon ? icon : <DefaultIcon />}
              alt='X'
            />
          </a>
        </Tooltip>

        <Tooltip
          placement='bottom'
          title={description}
        >
          <div
            className='ml-4 truncate   flex-1'
            onClick={() => {
              copy(title);
              messageApi.open({
                type: 'success',
                content: `复制成功, ${title}`,
              });
            }}
          >
            <p className='truncate mb-0.5 font-bold text-base'>{title}</p>
            <p className=' truncate  text-xs'>{description}</p>
          </div>
        </Tooltip>
      </Card>
    </>
  );
};

const getItems = (panelStyle, data) => {
  return data.map((it, key) => ({
    key,
    label: <Tooltip title={it.description}>{it.title}</Tooltip>,
    children: (
      <>
        <Row gutter={[10, 16]}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={6}
            xxl={4}
            key={key}
          >
            <ClickableCard {...it} />
          </Col>
        </Row>
      </>
    ),
    style: panelStyle,
  }));
};

// eslint-disable-next-line react/prop-types
function CardItem({ data }) {
  const { token } = theme.useToken();

  const panelStyle = {
    padding: 8,
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const defaultAllKey = new Array(10).fill(0).map((it, ind) => ind);

  const mouseEvent = new MouseEvent('click', {
    //创建一个 click 的鼠标事件 并让他点击
    bubbles: true,
    cancelable: true,
  });

  const tabHover = () => {
    var els = document.querySelectorAll('.two-tabs .ant-tabs-tab');
    var top = document.querySelectorAll('.two-tabs .ant-tabs-tab-btn');
    for (let i = 0; i < top.length; i++) {
      top[i].addEventListener('mouseover', function () {
        //给某个 dom 在=绑定 mouseover 事件
        els[i].dispatchEvent(mouseEvent); // 在 mouseover 中将想要进行的 click 通过 dispatchEvent 事件派发给将要发生 click 的 div
      });
    }
  };

  React.useEffect(() => {
    tabHover();

    // if (renderNextTime.current) {
    //     renderNextTime.current = false;
    // } else {
    //     tabHover();
    // }
  });

  return (
    <>
      {/* <Card
                title={data.title}
                bordered
                style={{
                    marginTop: "16px",
                }}
            >
                <Row gutter={[10, 16]}>
                    {data.childrens.map((it, ind) => (
                        <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={8}
                            xl={6}
                            xxl={4}
                            key={ind}
                        >
                            <ClickableCard {...it} />
                        </Col>
                    ))}
                </Row>
            </Card> */}

      <Card
        title={data.title}
        style={{
          marginTop: '16px',
        }}
      >
        <List
          itemLayout='vertical'
          bordered
          split
          size='middle'
          dataSource={data.childrens}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <a
                  key='copy'
                  onClick={() => copy(item.url)}
                >
                  <CopyOutlined /> 复制链接
                </a>,

                <a
                  href={item.url}
                  key='open'
                  target='_blank'
                  rel='noreferrer'
                >
                  <CloudOutlined /> 新标签打开
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={42}
                    src={item.icon ? item.icon : <DefaultIcon />}
                  />
                }
                title={<a>{item.title}</a>}
                description={
                  <>
                    <a>{item.description}</a>
                    <br />
                    <br />
                    <br />
                    <br />
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}

export default CardItem;
