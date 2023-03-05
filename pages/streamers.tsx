import {
    Layout,
    Nav,
    Button,
    Breadcrumb,
    Skeleton,
    Avatar,
    Tag,
    Modal,
    Form,
    Row,
    Col,
    Dropdown, SplitButtonGroup, Typography, Popconfirm
} from '@douyinfe/semi-ui';
import {
    IconBell,
    IconHelpCircle,
    IconBytedanceLogo,
    IconPlusCircle,
    IconHistogram,
    IconLive,
    IconSetting,
    IconStoryStroked,
    IconCheckCircleStroked,
    IconVideoListStroked,
    IconTreeTriangleDown,
    IconSendStroked,
    IconEdit2Stroked, IconDeleteStroked
} from '@douyinfe/semi-icons';
import { List, Descriptions, Rating, ButtonGroup } from '@douyinfe/semi-ui';
import { useState } from "react";
import useStreamers from '../data/use-streamers';
import TemplateModal from '../components/TemplateModal';
import {DropDownMenuItem} from "@douyinfe/semi-ui/lib/es/dropdown";
import {LiveStreamerEntity} from "../libs/api-streamer";

export default function Home() {
    const { Header, Footer, Sider, Content } = Layout;
    const { Paragraph, Title, Text } = Typography;
    const { streamers, isLoading } = useStreamers();
    // console.log(streamers);

    const data: LiveStreamerEntity[] | undefined = streamers?.map(live => {
        let status;
        switch (live.status) {
            case 'Working': status = <Tag color='red'>直播中</Tag>; break;
            case 'Idle': status = <Tag color='green'>空闲</Tag>; break;
            case 'Pending': status = <Tag color='grey'>未知</Tag>; break;
            case 'Inspecting': status = <Tag color='indigo'>检测中</Tag>; break;
        }
        return {...live, status};
    });

    const style = {
        border: '1px solid var(--semi-color-border)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '3px',
        paddingLeft: '20px',
        paddingRight: '20px',
        margin: '8px 2px',
        minWidth: 292,
        maxWidth: 310,
    };



    const menu: DropDownMenuItem[] = [
        // { node: 'item', name: '编辑', onClick: () => console.log('编辑项目点击') },
        { node: 'item', name: '查看记录' },
        { node: 'divider' },
        // { node: 'item', name: '复制项目' },
        // { node: 'item', name: '从项目创建模版' },
        // { node: 'divider' },
        { node: 'item', name: '删除', type: 'danger' },
    ];

    const [btnVisible, setBtnVisible] = useState(false);

    const handleVisibleChange = (visible: boolean) => {
        setBtnVisible(visible);
    };
    return (<>
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            <Nav
                header={<><div style={{
                    backgroundColor: 'rgba(var(--semi-green-4), 1)',
                    borderRadius: 'var(--semi-border-radius-large)',
                    color: 'var(--semi-color-bg-0)',
                    display: 'flex',
                    // justifyContent: 'center',
                    padding: '6px'
                }}><IconVideoListStroked size='large' /></div><h4 style={{ marginLeft: '12px' }}>录播管理</h4></>}
                mode="horizontal"
                footer={<>
                    <Button
                        theme="borderless"
                        icon={<IconHelpCircle size="large" />}
                        style={{
                            color: 'var(--semi-color-text-2)',
                            marginRight: '12px',
                        }} />
                    <TemplateModal>
                        <Button onClick={()=>{console.log("adfa")}} icon={<IconPlusCircle />} theme="solid" style={{ marginRight: 10 }}>新建</Button>
                    </TemplateModal>
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
                    grid={{
                        gutter: 12,
                        xs: 24,
                        sm: 24,
                        md: 12,
                        lg: 8,
                        xl: 6,
                        xxl: 4,
                    }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item style={style}>
                            <div style={{ flexGrow: 1, maxWidth: 250 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3 style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.remark}</h3>
                                    {item.status}
                                </div>
                                {/* <span style={{ color: 'var(--semi-color-text-2)' }}>https://www.douyu.com/156482</span> */}
                                <Text ellipsis={{ showTooltip: { opts: { style: { wordBreak: 'break-all' } } } }} type="tertiary">{item.url}</Text>
                                <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                    <ButtonGroup theme='borderless'>
                                        <TemplateModal entity={item}>
                                            <Button theme='borderless' icon={<IconEdit2Stroked />}></Button>
                                        </TemplateModal>
                                        <span className="semi-button-group-line semi-button-group-line-borderless semi-button-group-line-primary"></span>
                                        <Popconfirm
                                            title="确定是否要删除？"
                                            content="此操作将不可逆"
                                            // onConfirm={onConfirm}
                                            // onCancel={onCancel}
                                        >
                                            <Button theme='borderless' icon={<IconDeleteStroked />}></Button>
                                        </Popconfirm>
                                    </ButtonGroup>
                                    {/*<SplitButtonGroup>*/}
                                    {/*    <TemplateModal>*/}
                                    {/*        <Button theme="light" type='tertiary' size='small'>编辑</Button>*/}
                                    {/*    </TemplateModal>*/}
                                    {/*    <Dropdown menu={menu} trigger="click" position="bottomRight">*/}
                                    {/*        <Button style={{ padding: '8px 4px' }} type='tertiary' theme="light" size='small' icon={<IconTreeTriangleDown />}></Button>*/}
                                    {/*    </Dropdown>*/}
                                    {/*</SplitButtonGroup>*/}
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </main>
        </Content>
    </>);
}
