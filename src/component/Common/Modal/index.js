import React, { useState } from "react";
import { Modal, Button, Tooltip, Space, ConfigProvider } from "antd";
import {
    FacebookFilled,
    GithubOutlined,
    InstagramOutlined,
    MailFilled,
    RedditCircleFilled,
    TwitterOutlined,
    WhatsAppOutlined,
} from "@ant-design/icons";
import MyButton from "../Button";
const ShareModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <MyButton text="share" outLined={true} onClick={showModal} />
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            contentBg: "transparent",
                            headerBg: "transparent",
                            titleColor: "white",
                        },
                        Button: {
                            onlyIconSizeLG: 24,
                            defaultGhostBorderColor: "transparent",
                        }
                    },
                }}
            >
                <Modal
                    title="Share it on..."
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={() => <></>}
                    centered
                    style={{
                        border: "1px solid var(--grey)",
                        borderRadius: "10px",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Space wrap style={{justifyContent: "center", gap: "1.5rem",width: "100%"}}>
                            <Tooltip title="Facebook">
                                <Button
                                    ghost={true}
                                    shape="circle"
                                    icon={<FacebookFilled />}
                                    size="large"
                                    href="https://www.facebook.com/"
                                />
                            </Tooltip>
                            <Tooltip title="Instagram">
                                <Button
                                    ghost={true}
                                    shape="circle"
                                    icon={<InstagramOutlined />}
                                    size="large"
                                    href="https://www.instagram.com/"
                                />
                            </Tooltip>
                            <Tooltip title="Twitter">
                                <Button
                                    ghost={true}
                                    shape="circle"
                                    icon={<TwitterOutlined />}
                                    size="large"
                                    href="https://twitter.com/"
                                />
                            </Tooltip>
                            <Tooltip title="Github">
                                <Button
                                    ghost={true}
                                    shape="circle"
                                    icon={<GithubOutlined />}
                                    size="large"
                                    href="https://github.com/"
                                />
                            </Tooltip>
                            <Tooltip title="WhatsApp">
                                <Button
                                    ghost={true}
                                    shape="circle"
                                    icon={<WhatsAppOutlined />}
                                    size="large"
                                    href="https://www.whatsapp.com/"
                                />
                            </Tooltip>
                            <Tooltip title="Reddit">
                                <Button
                                    ghost={true}
                                    shape="circle"
                                    icon={<RedditCircleFilled />}
                                    size="large"
                                    href="https://www.reddit.com"
                                />
                            </Tooltip>
                            <Tooltip title="Email">
                                <Button
                                    ghost={true}
                                    shape="circle"
                                    icon={<MailFilled />}
                                    size="large"
                                    href="https://mail.google.com/mail"
                                />
                            </Tooltip>
                        </Space>
                    </Space>
                </Modal>
            </ConfigProvider>
        </>
    );
};
export default ShareModal;
