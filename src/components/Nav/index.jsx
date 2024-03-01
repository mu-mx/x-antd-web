/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
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
} from "antd";

import StickyBox from "react-sticky-box";

import CardItem from "./CardItem";
import { getDataBase } from "@/utils/data";

export default function Index() {
    const [mode, setMode] = React.useState("top");

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
        setData(data);
    };

    const mouseEvent = new MouseEvent("click", {
        //创建一个 click 的鼠标事件 并让他点击
        bubbles: true,
        cancelable: true,
    });

    const tabHover = () => {
        var els = document.querySelectorAll(".ant-tabs-tab");
        var top = document.querySelectorAll(".ant-tabs-tab-btn");
        for (let i = 0; i < top.length; i++) {
            top[i].addEventListener("mouseover", function () {
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
                <Col span={3}>
                    <Anchor
                        affix={false}
                        targetOffset={32}
                        getContainer={() => document.querySelector("#bigWrap .ant-card-body")}
                        items={data.map((item, index) => ({
                            key: index + 1,
                            href: "#nav" + index,
                            title: item.title,
                        }))}
                    />
                </Col>

                <Col span={20}>
                    <Card
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
                        {/* <Tabs
                            defaultActiveKey="0"
                            indicatorSize={30}
                            renderTabBar={renderTabBar}
                            centered
                            size={'large'}
                            tabPosition={mode}
                            destroyInactiveTabPane={true}
                            tabBarGutter={24}
                            animated={false}
                            items={data.map((_, i) => {
                                const id = String(i);
                                return {
                                    label: <Tooltip title={_.description}>{_.title}</Tooltip>,
                                    key: id,
                                    children: <CardItem data={_.children || []} />,
                                };
                            })}
                        /> */}

                        {data.map((_, i) => (
                            <div
                                id={"nav" + i}
                                key={i}
                                style={{ minHeight: "60vh" }}
                            >
                                <CardItem data={_.children || []} />
                            </div>
                        ))}
                    </Card>
                    <FloatButton.BackTop
                        style={{
                            left: "8%",
                            bottom: "20%",
                        }}
                        visibilityHeight={0}
                        target={() => document.querySelector(".daohang-body .ant-card-body")}
                    />
                </Col>
            </Row>
        </>
    );
}
