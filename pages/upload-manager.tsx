import {Button, ButtonGroup, Descriptions, Layout, List, Modal, Nav, Rating} from "@douyinfe/semi-ui";
import {IconCloud, IconCloudStroked, IconHelpCircle, IconPlusCircle, IconVideoListStroked} from "@douyinfe/semi-icons";
import { useState } from "react";

export default function Union() {
    const {Header, Footer, Sider, Content} = Layout;
    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    };
    return (<>
        <Header style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
            <Nav
                header={<><div style={{
                    backgroundColor: 'rgba(var(--semi-violet-4), 1)',
                    borderRadius: 'var(--semi-border-radius-large)',
                    color: 'var(--semi-color-bg-0)',
                    display: 'flex',
                    // justifyContent: 'center',
                    padding: '6px'
                }}><IconCloudStroked size='large' /></div><h4 style={{marginLeft: '12px'}}>投稿管理</h4></>}
                mode="horizontal"
                footer={<>
                    <Button
                        theme="borderless"
                        icon={<IconHelpCircle size="large"/>}
                        style={{
                            color: 'var(--semi-color-text-2)',
                            marginRight: '12px',
                        }}/>
                    <Button onClick={() => setVisible(true)} icon={<IconPlusCircle />} theme="solid" style={{ marginRight: 10 }}>新建</Button>
                </>}
            ></Nav>
        </Header>
        <Content
            style={{
                padding: '24px',
                backgroundColor: 'var(--semi-color-bg-0)',
            }}
        >
            <main>
            <List
                        dataSource={[]}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
            </main>
        </Content>
        <Modal title="全屏对话框标题" fullScreen visible={visible} onOk={onClose} onCancel={onClose}>
                        <p>This is a full screen modal</p>
                        <p>More content...</p>
                    </Modal>
    </>);
}
