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
        console.log("data - >:", data);
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

    useEffect(() => {
        if (renderNextTime.current) {
            renderNextTime.current = false;
        } else {
            tabHover();
        }
    });

    useEffect(() => {
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row>
                <Col
                    span={20}
                    offset={2}
                >
                    <Card
                        title=""
                        className="daohang-body h-full"
                        bodyStyle={{
                            padding: "0 12px 8px",
                            overflowY: "auto",
                            height: "700px",
                        }}
                        headStyle={{
                            // padding: "8px 12px",
                            padding: "0",
                            minHeight: "0",
                        }}
                        // extra={
                        //     <Radio.Group
                        //         optionType="button"
                        //         options={[
                        //             {
                        //                 label: "左",
                        //                 value: "left",
                        //             },
                        //             {
                        //                 label: "右",
                        //                 value: "right",
                        //             },
                        //             {
                        //                 label: "上",
                        //                 value: "top",
                        //             },
                        //             {
                        //                 label: "下",
                        //                 value: "bottom",
                        //             },
                        //         ]}
                        //         onChange={({ target: { value } }) => {
                        //             setMode(value);
                        //         }}
                        //         value={mode}
                        //     />
                        // }
                    >
                        <Tabs
                            defaultActiveKey="0"
                            indicatorSize={30}
                            renderTabBar={renderTabBar}
                            tabPosition={mode}
                            destroyInactiveTabPane={true}
                            tabBarGutter={24}
                            animated={false}
                            items={data.map((_, i) => {
                                const id = String(i);
                                return {
                                    label: `${_.title}`,
                                    key: id,
                                    children: <CardItem data={_.children || []} />,
                                };
                            })}
                        />
                    </Card>
                    <FloatButton.BackTop
                        style={{
                            right: "10%",
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
