import React, {useState} from "react";
import {FormFCChild} from "@douyinfe/semi-ui/lib/es/form";
import {IconChevronDown, IconChevronUp} from "@douyinfe/semi-icons";
import {Button, Collapsible, Form, Space, Typography} from "@douyinfe/semi-ui";
import useSWR from "swr";
import {BiliType, fetcher, StudioEntity} from "../libs/api-streamer";

const TemplateFields: React.FC<FormFCChild> = ({ formState, formApi, values }) => {
    const { Section, Input, DatePicker, TimePicker, Select, Switch, InputNumber, Checkbox, CheckboxGroup, RadioGroup, Radio, Cascader, TagInput, TextArea } = Form;
    const { Text } = Typography;
    const { data: archivePre, error, isLoading } = useSWR("/bili/archive/pre", fetcher);
    console.log(archivePre);

    const treeData = archivePre?.data.typelist.map((type: BiliType)=> {
        return {
            label: type.name,
            value: type.id,
            children: type.children.map(cType => {
                return {
                    label: <>{cType.name} <Text type="quaternary" size='small'>{cType.desc}</Text></>,
                    value: cType.id,
                };
            })
        };
    })

    const collapsed = (<>
        <DatePicker field='date' type='dateTime' initValue={new Date()} label={{ text: '开始时间', required: true }}/>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input field='time' label='考试时长' initValue={'60'} addonAfter='分钟'/>
            <Checkbox initValue={true} noLabel field='auto' style={{ marginLeft: 12 }}>到时间自动交卷</Checkbox>
        </div>
        <RadioGroup
            field="type"
            label='有效时间'
            direction='vertical'
            initValue={'always'}
        >
            <Radio value="always">永久有效</Radio>
            <Radio value="user">自定义有效期</Radio>
        </RadioGroup>
        <RadioGroup
            field="answerTime"
            label='答案放出时间'
            direction='vertical'
            initValue={'always'}
            rules={[
                { required: true }
            ]}
        >
            <Radio value="always">自动放出</Radio>
            <Radio value="user">
                <div style={{ display: 'inline-block' }}>
                    自定义放出时间
                    <Form.DatePicker type='dateTimeRange' noLabel field='customTime' style={{ display: 'inline-block' }}/>
                </div>
            </Radio>
        </RadioGroup>
    </>);
    const [isOpen, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!isOpen);
        formApi.scrollToField('isDtime');
    };
    return(
        <>
            <Section text={'基本信息'}>
                <Input rules={[
                    { required: true }
                ]} field='template_name' label='模板名称' style={{width: 464}}/>
                <Input field='title' label='视频标题' style={{width: 464}} placeholder='稿件标题'/>
            </Section>
            <Section text={'基本设置'} >
                <RadioGroup
                    field="copyright"
                    label='类型'
                    direction='vertical'
                    initValue={1}
                >
                    <div onClick={()=>formApi.setValue('source', '')}>
                        <Radio value={1}>自制</Radio>
                    </div>
                    <Radio value={2} style={{alignItems: 'center', flexShrink: 0}}>
                        <span style={{flexShrink: 0}}>转载</span>
                        {/* <div > */}
                        <Input field='source' onClick={()=>formApi.setValue('copyright', 2)} placeholder="转载视频请注明来源（例：转自http://www.xx.com/yy）注明来源会更快地通过审核哦" noLabel fieldStyle={{padding: 0, marginLeft: 24, width: 560}}/>
                        {/* </div> */}

                        {/* <Form.DatePicker type='dateTimeRange' noLabel field='customTime'/> */}
                    </Radio>
                </RadioGroup>
                <Cascader
                    field="tid"
                    label='分区'
                    style={{ width: 272 }}
                    treeData={treeData}
                    placeholder="投稿分区"
                    dropdownStyle={{ maxWidth:670 }}
                    rules={[
                        { required: true }
                    ]}
                />
                <TagInput
                    field="tag"
                    label='标签'
                    placeholder='输入标签，Enter 确定'
                    onChange={v => console.log(v)}
                    style={{width: 560}}
                />
                <TextArea
                    field="desc" label='简介' placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧"
                    autosize maxCount={2000} showClear/>

                <div style={{display: 'flex', alignItems: 'center', color: 'var(--semi-color-tertiary)'}}>
                    <Switch field='isDtime' label={{ text: '定时发布', required: true }} checkedText="｜" uncheckedText="〇"/>
                    <span style={{paddingLeft: 12, fontSize: 12}}>(当前+2小时 ≤ 可选时间 ≤ 当前+15天，转载稿件撞车判定以过审发布时间为准)</span>
                </div>
                {values.isDtime === true ? (
                    <DatePicker field="dtime" label=' ' type='dateTime' fieldStyle={{ paddingTop: 0 }} />
                ) : null}


                {/* <div style={{ display: 'flex' }}>
                        <InputNumber field='pass' initValue={60} label={{ text: '及格正确率', required: true }}/>
                        <InputNumber field='number' initValue={10} label={{ text: '合格人数', required: true }}/>
                    </div> */}
            </Section>

            <Section text={<div style={{cursor: 'pointer'}} onClick={toggle}>更多设置 {isOpen? <IconChevronUp style={{marginLeft: 12}} />:<IconChevronDown style={{marginLeft: 12}} />}</div>}>
                <Collapsible isOpen={isOpen} >
                    {collapsed}
                </Collapsible>
            </Section>
            {/* <Section text={'考试人员'}>
                <div style={{ display: 'flex' }}>
                    <Switch field='open' label={{ text: '对外开放', required: true }} checkedText='开' uncheckedText='关'></Switch>
                </div>
                <Select
                    field='users'
                    label={{ text: '考生', required: true }}

                    multiple
                    initValue={['1', '2', '3', '4']}
                >
                    <Select.Option value='1'>曲晨一</Select.Option>
                    <Select.Option value='2'>夏可曼</Select.Option>
                    <Select.Option value='3'>曲晨三</Select.Option>
                    <Select.Option value='4'>蔡妍</Select.Option>
                </Select>
            </Section> */}
            <Space style={{marginBottom: 24}}>
                <Button onClick={()=>formApi.submitForm()} type='primary' theme='solid' style={{ marginTop: 12, marginRight: 4 }}>创建模板</Button>
                <Button style={{ marginTop: 12 }}>取消</Button>
            </Space>
        </>
    );};

export default TemplateFields;
