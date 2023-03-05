import {Button, ButtonGroup, Layout, List, Nav, Popconfirm} from "@douyinfe/semi-ui";
import {
    IconDeleteStroked,
    IconEdit2Stroked,
    IconHelpCircle,
    IconPlusCircle,
    IconVideoListStroked
} from "@douyinfe/semi-icons";
import TemplateModal from "../components/TemplateModal";
import { Table, Avatar } from '@douyinfe/semi-ui';
import { IconMore } from '@douyinfe/semi-icons';
import {ColumnProps} from "@douyinfe/semi-ui/lib/es/table/interface";

export default function Home() {
    const { Header, Footer, Sider, Content } = Layout;
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            render: (text: any, record: any, index: any) => {
                return (
                    <div>
                        <Avatar
                            size="small"
                            shape="square"
                            src={record.nameIconSrc}
                            style={{ marginRight: 12 }}
                        ></Avatar>
                        {text}
                    </div>
                );
            },
            filters: [
                {
                    text: 'Semi Design 设计稿',
                    value: 'Semi Design 设计稿',
                },
                {
                    text: 'Semi Pro 设计稿',
                    value: 'Semi Pro 设计稿',
                },
            ],
            // onFilter: (value, record) => record.name.includes(value)
        },
        {
            title: '大小',
            dataIndex: 'size',
        },
        {
            title: '所有者',
            dataIndex: 'owner',
            render: (text: any, record: any, index: any) => {
                return (
                    <div>
                        <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                            {typeof text === 'string' && text.slice(0, 1)}
                        </Avatar>
                        {text}
                    </div>
                );
            },
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
            sorter: (a: any, b: any) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
        },
        {
            title: '',
            dataIndex: 'operate',
            render: () => {
                return <IconMore />;
            },
        },
    ];
    const data = [
        {
            key: '1',
            name: 'Semi Design 设计稿.fig',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
            size: '2M',
            owner: '姜鹏志',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'grey',
        },
        {
            key: '2',
            name: 'Semi Design 分享演示文稿',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '2M',
            owner: '郝宣',
            updateTime: '2020-01-17 05:31',
            avatarBg: 'red',
        },
        {
            key: '3',
            name: '设计文档',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '34KB',
            owner: 'Zoey Edwards',
            updateTime: '2020-01-26 11:01',
            avatarBg: 'light-blue',
        },
    ];

    return (<>
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            <Nav style={{border: 'none'}}
                header={<><div style={{
                    backgroundColor: 'rgba(var(--semi-green-4), 1)',
                    borderRadius: 'var(--semi-border-radius-large)',
                    color: 'var(--semi-color-bg-0)',
                    display: 'flex',
                    // justifyContent: 'center',
                    padding: '6px'
                }}><IconVideoListStroked size='large' /></div><h4 style={{ marginLeft: '12px' }}>录播管理</h4></>}
                mode="horizontal"
            ></Nav>
        </Header>
        <Content
            style={{
                paddingLeft: 12,
                paddingRight: 12,
                backgroundColor: 'var(--semi-color-bg-0)',
            }}
        >
            <main>
                <Table size="small" columns={columns} dataSource={data} />
            </main>
        </Content>
    </>);
}
