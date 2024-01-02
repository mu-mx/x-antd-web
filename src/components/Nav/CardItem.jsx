import React from "react";

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
} from "antd";

import Icon, {
    SearchOutlined,
    CaretRightOutlined,
    CopyOutlined,
    EditOutlined,
    ForwardOutlined,
} from "@ant-design/icons";

import copy from "copy-to-clipboard";

const ClickableCardBack = ({ icon, title, description, url }) => {
    return (
        <>
            <Tooltip
                placement="top"
                title={description}
            >
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Card
                        hoverable
                        bodyStyle={{
                            padding: "12px 8px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {icon ? (
                            <Avatar
                                style={{
                                    verticalAlign: "middle",
                                }}
                                size="large"
                                src={icon}
                            />
                        ) : (
                            <Avatar
                                style={{
                                    verticalAlign: "middle",
                                }}
                                size="large"
                            >
                                X
                            </Avatar>
                        )}
                        <div className="ml-2 truncate flex-1">
                            <p className="truncate ">{title}</p>
                            <p className="truncate ">{description}</p>
                        </div>
                    </Card>
                </a>
            </Tooltip>
        </>
    );
};

const ClickableCard = ({ icon, title, description, url }) => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}

            <Card
                hoverable
                bodyStyle={{
                    padding: "12px 8px",
                    display: "flex",
                    alignItems: "center",
                }}
                actions={[
                    <Tooltip
                        key="copy"
                        placement="top"
                        title={"复制 " + url}
                    >
                        <CopyOutlined onClick={() => copy(url)} />
                    </Tooltip>,

                    <Tooltip
                        placement="top"
                        key="open"
                        title={"打开"}
                    >
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <ForwardOutlined />
                        </a>
                    </Tooltip>,
                ]}
            >
                {icon ? (
                    <Avatar
                        style={{
                            verticalAlign: "middle",
                        }}
                        size="large"
                        src={icon}
                    />
                ) : (
                    <Avatar
                        style={{
                            verticalAlign: "middle",
                        }}
                        size="large"
                    >
                        X
                    </Avatar>
                )}
                <Tooltip
                    placement="top"
                    title={description}
                >
                    <div
                        className="ml-4 truncate   flex-1"
                        onClick={() => {
                            copy(title);
                            messageApi.open({
                                type: "success",
                                content: `复制成功, ${title}`,
                            });
                        }}
                    >
                        <p className="truncate mb-3 font-bold text-base">{title}</p>
                        <p className=" truncate ">{description}</p>
                    </div>
                </Tooltip>
            </Card>
        </>
    );
};

const getItems = (panelStyle, data) => {
    return data.map((it, key) => ({
        key,
        label: it.title,
        children: (
            <>
                <Row gutter={[10, 16]}>
                    {it.children.map((it, index) => (
                        <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={8}
                            xl={6}
                            xxl={4}
                            key={index}
                        >
                            <ClickableCard {...it} />
                        </Col>
                    ))}
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
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: "none",
    };

    const defaultAllKey = new Array(10).fill(0).map((it, ind) => ind);

    return (
        <Collapse
            collapsible="icon"
            size="large"
            expandIconPosition="end"
            ghost={true}
            bordered={true}
            defaultActiveKey={defaultAllKey}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{
                background: token.colorBgContainer,
            }}
            items={getItems(panelStyle, data)}
        />
    );
}

export default CardItem;
