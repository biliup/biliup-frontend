import {
    Button,
    ButtonGroup,
    Descriptions,
    Dropdown,
    Layout,
    List,
    Modal,
    Nav,
    Popconfirm,
    Rating, SideSheet,
    SplitButtonGroup
} from "@douyinfe/semi-ui";
import {
    IconCloud,
    IconCloudStroked,
    IconHelpCircle, IconMinusCircle,
    IconPlusCircle,
    IconUserListStroked,
    IconVideoListStroked
} from "@douyinfe/semi-icons";
import { useState } from "react";
import Link from "next/link";
import { Card, Avatar, Popover } from '@douyinfe/semi-ui';
import { IconInfoCircle, IconTreeTriangleDown, IconSend, IconEdit2Stroked, IconSendStroked, IconDeleteStroked } from '@douyinfe/semi-icons';
import { fetcher, StudioEntity } from "../../libs/api-streamer";
import useSWR from "swr";
import {useRouter} from "next/router";
import AvatarCard from "../../components/AvatarCard";
import UserList from "../../components/UserList";

export default function Union() {
    const { Meta } = Card;
    const { Header, Footer, Sider, Content } = Layout;
    const [visible, setVisible] = useState(false);
    const { data: templates, error, isLoading } = useSWR<StudioEntity[]>("/v1/upload/streamers", fetcher);
    const change = () => {
        setVisible(!visible);
    };
    const router = useRouter();
    return (<>
        <UserList visible={visible} onCancel={change}></UserList>
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            <Nav
                header={<><div style={{
                    backgroundColor: 'rgba(var(--semi-violet-4), 1)',
                    borderRadius: 'var(--semi-border-radius-large)',
                    color: 'var(--semi-color-bg-0)',
                    display: 'flex',
                    // justifyContent: 'center',
                    padding: '6px'
                }}><IconCloudStroked size='large' /></div><h4 style={{ marginLeft: '12px' }}>投稿管理</h4></>}
                mode="horizontal"
                footer={<>
                    <Button
                        onClick={change}
                        // theme="borderless"
                        type="tertiary"
                        icon={<IconUserListStroked />}
                        style={{
                            // color: 'var(--semi-color-text-2)',
                            borderRadius: 'var(--semi-border-radius-circle)',
                            marginRight: '12px',
                        }} />
                    <Link href='/upload-manager/add'>
                        <Button icon={<IconPlusCircle />} theme="solid" style={{ marginRight: 10 }}>新建</Button>
                    </Link>

                </>}
            ></Nav>
        </Header>
        <Content
            style={{
                padding: '24px',
                backgroundColor: 'var(--semi-color-bg-0)',
            }}
        >
            <List grid={{
                gutter: 12,
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 6,
                xxl: 4,
            }}
                dataSource={templates}
                renderItem={item => <List.Item>
                    <Card
                        shadows='hover'
                        style={{
                            maxWidth: 360,
                            margin: '8px 2px',
                            flexGrow: 1
                        }}
                        bodyStyle={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Meta
                            title={item.template_name}
                        // avatar={
                        //     <Avatar
                        //         alt='Card meta img'
                        //         size="default"
                        //         src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/card-meta-avatar-docs-demo.jpg'
                        //     />
                        // }
                        />
                        <ButtonGroup theme='borderless'>
                            <Button icon={<IconSendStroked />}></Button>
                            <Button icon={<IconEdit2Stroked />} onClick={()=> {
                                router.push(`/upload-manager/edit/${item.id}`);
                            }}></Button>
                            <Popconfirm
                                title="确定是否要删除？"
                                content="此操作将不可逆"
                                // onConfirm={onConfirm}
                                // onCancel={onCancel}
                            >
                                <Button theme='borderless' icon={<IconDeleteStroked />}></Button>
                            </Popconfirm>
                        </ButtonGroup>

                        {/* <SplitButtonGroup>
                            <Button theme="light" size='small'>编辑</Button>
                            <Dropdown menu={menu} trigger="click" position="bottomRight">
                                <Button style={{ padding: '8px 4px' }} theme="light" size='small' icon={<IconTreeTriangleDown />}></Button>
                            </Dropdown>
                        </SplitButtonGroup> */}
                        {/* <IconInfoCircle style={{ color: 'var(--semi-color-primary)' }} /> */}
                    </Card>
                </List.Item>}
            />
        </Content>
    </>);
}

