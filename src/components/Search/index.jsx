import React, { useEffect, useState } from "react";

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
    const [value, setValue] = useState();

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

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <Select
                showSearch
                allowClear
                placeholder="请输入"
                value={value}
                size="large"
                style={{
                    margin: "60px auto 80px",
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
                    }
                }}
                defaultActiveFirstOption={false}
                filterOption={false}
                onSearch={handleSearch}
                suffixIcon={<SearchOutlined />}
                options={(data || []).map((d) => ({
                    ...d,
                    value: d.id,
                    label: `${d.pTitle} ==> ${d.title}`,
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
