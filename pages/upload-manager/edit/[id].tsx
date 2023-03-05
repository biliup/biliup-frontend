import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Notification, Toast, Typography} from "@douyinfe/semi-ui";
import {IconPlusCircle} from "@douyinfe/semi-icons";
import {BiliType, fetcher, LiveStreamerEntity, sendRequest, StudioEntity} from "../../../libs/api-streamer";
import TemplateFields from "../../../components/TemplateFields";
import {registerMediaQuery, responsiveMap} from "../../../libs/utils";
import useSWRMutation from "swr/mutation";
import {useRouter} from "next/router";
import {FormApi} from "@douyinfe/semi-ui/lib/es/form";
import useSWR from "swr";
import {useTypeTree} from "../../../data/use-streamers";

const EditTemplate: React.FC = () => {
    const { Text, Paragraph } = Typography;
    const [labelPosition, setLabelPosition] = useState<'top' | 'left' | 'inset'>('inset');
    useEffect(()=> {
        const unRegister = registerMediaQuery(responsiveMap.lg, {
            match: () => {
                setLabelPosition('left');
            },
            unmatch: () => {
                setLabelPosition('top');
            },
        })
        return () => unRegister();
    }, []);

    const { trigger } = useSWRMutation('/v1/upload/streamers', sendRequest);
    const router = useRouter();
    const { data, error, isLoading } = useSWR<StudioEntity>(() => (router.query.id ? `/v1/upload/streamers/${router.query.id}` : null), fetcher);
    const { typeTree, isError } = useTypeTree();
    const api = useRef<FormApi>();
    if (error || isError) return <div>{error.message}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data || !typeTree) return null;
    let uploadStreamers = {
        ...data,
        tag: data.tag.length === 0 ? [] : data.tag.split(','),
        tid: [typeTree.find((tt: BiliType) => {
            return tt.children.some(ct => ct.id === data?.tid);
        }).value, data.tid]
    };
    return (<>
        <div style={{display: 'flex', flexDirection: 'row-reverse', paddingRight: 12}}>
            <Button onClick={async ()=>{
                let values = await api.current?.validate();
                try {
                    const studioEntity = {
                        template_name: values?.template_name,
                        copyright: values?.copyright,
                        id: values?.id,
                        source: values?.source ?? '',
                        tid: values?.tid[1],
                        cover: values?.cover ?? '',
                        title: values?.title ?? '',
                        desc: values?.desc ?? '',
                        dynamic: values?.dynamic ?? '',
                        tag: values?.tag ?? '',
                        interactive: values?.interactive ?? 0,
                        dolby: values?.dolby ?? 0,
                        lossless_music: values?.lossless_music ?? 0,
                        up_selection_reply: values?.up_selection_reply ?? false,
                        up_close_reply: values?.up_close_reply ?? false,
                        up_close_danmu: values?.up_close_danmu ?? false,
                        open_elec: values?.open_elec,
                        no_reprint: values?.no_reprint,
                        mission_id: values?.mission_id,
                        dtime: values?.dtime
                    }
                    const result = await trigger(studioEntity);
                    Toast.success('更新成功');
                    router.push('/upload-manager');
                }catch (e: any) {
                    // error handling
                    Notification.error({
                        title: '创建失败',
                        content: <Paragraph style={{maxWidth: 450}}>{e.message}</Paragraph>,
                        // theme: 'light',
                        // duration: 0,
                        style: {width: 'min-content'}
                    });
                }

            }} type='primary' icon={<IconPlusCircle size='large'/>} theme='solid' style={{ marginTop: 12, marginRight: 4 }}>保存模板</Button>
        </div>
        {/*<main style={{ // padding: '24px',*/}
        {/*    backgroundColor: 'var(--semi-color-bg-0)',*/}
        {/*    // display: 'flex',*/}
        {/*    // flexDirection: 'column',*/}
        {/*    // justifyContent: 'space-around',*/}
        {/*    marginBottom: 10*/}
        {/*}}>*/}
            <Form initValues={uploadStreamers} style={{paddingLeft: 30, paddingBottom: 40}} getFormApi={formApi => api.current = formApi} autoScrollToError component={TemplateFields} labelWidth='180px' labelPosition={labelPosition}/>
        {/*</main>*/}
        </>);
}

export default EditTemplate;
