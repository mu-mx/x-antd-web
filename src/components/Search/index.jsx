import React, { useEffect, useRef, useState } from "react";

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
} from "antd";
import { SearchOutlined, CaretRightOutlined } from "@ant-design/icons";
import { getDataByName } from "../../utils/data";

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
        if (e.keyCode === 191) {
            // e.stopPropagation();
            e.preventDefault();
            select.current.focus();

            // select.current.value = "";
            // setValue(undefined);
        }
    };

    useEffect(() => {
        getList();

        window.addEventListener("keydown", onKeyDown); // 添加全局事件

        return () => {
            window.removeEventListener("keydown", onKeyDown); // 销毁
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    margin: "20px auto",
                    width: "40%",
                    display: "block",
                }}
                onChange={(newValue, option) => {
                    setValue(newValue);

                    if (newValue) {
                        // if (global.urlOpenType) {
                        //   location.href = param;
                        // } else {
                        // }
                        window.open(option.url, "_blank");
                    } else {
                        getList();
                    }
                }}
                defaultActiveFirstOption={false}
                filterOption={false}
                onSearch={handleSearch}
                suffixIcon={<SearchOutlined />}
                options={(data || []).map((d) => ({
                    ...d,
                    value: d.id,
                    label: `${d.title}`,
                }))}
                optionRender={(option) => (
                    <Tooltip
                        placement="top"
                        title={option.data.description}
                    >
                        {option.data.label}
                    </Tooltip>
                )}
            />
        </>
    );
}
