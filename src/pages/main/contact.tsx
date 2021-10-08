import emailjs from 'emailjs-com';
import React, { useCallback, useEffect, useState } from 'react';
import { Scene } from 'react-scrollmagic';

import { CInput } from '../../components/input';
import { CText } from '../../components/text';
import { useIsMobile } from '../../lib/hooks';
import { getFlexStyle, getScreenHeight, useColor, useFontColor } from '../../lib/style';

// eslint-disable-next-line no-undef
const USER_ID = process.env.REACT_APP_EMAIL_JS_USER_ID;
const SERVICE_ID = 'chana_mail';
const TEMPLATE_ID = 'template_pyc0z1s';

export function Contact() {

    const color = useColor();
    const isMobile = useIsMobile();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [contact, setContact] = useState('');
    const [hover, setHover] = useState(false);
    const [submitBtnClass, setSubmiBtnClass] = useState('none');
    const [flag, setFlag] = useState(false);
    const [sended, setSended] = useState(false);
    const fontColor = useFontColor();

    useEffect(() => {
        if(flag) return;
        
        if(name.length > 0 && (contact.length > 0 || message.length > 0)) {
            setSubmiBtnClass('zoomInDown animated');
            setFlag(true);
        }
    }, [contact.length, flag, message.length, name.length]);

    useEffect(() => {
        if(hover)
            setSubmiBtnClass('flip animated');
    }, [hover]);

    const sendEmail = useCallback(async () => {
        setSubmiBtnClass('bounceOutRight animated')
        try {
            await emailjs.send(
                SERVICE_ID, TEMPLATE_ID, 
                {name, message, contact},
                USER_ID)
            setSended(true);
        } catch(err) {
            console.log(err)
        }
    }, [contact, message, name]);

    return  <Scene duration={ getScreenHeight() } pin triggerHook={ 0 }>
        <div style={ { 
            backgroundColor: color.point1,
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 100,
        } }>
            <CText size="g1" msg="Thanks!" dark style={ { 
                letterSpacing: 15,
            } }/>
            <div style={ { 
                marginTop: 60,
            } }>
                { sended ? 
                    <></> :
                    <>
                        <div style={{ 
                            display: 'flex',
                            flexDirection: isMobile ?  'column' : 'row',
                            gap: 12,
                        }}>
                            <CInput style={ { width: 300 } } placeholder="name" onChange={ setName }/>
                            <CInput style={ { width: 300 } } placeholder="contact" onChange={ setContact } />
                        </div>
                        <div style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12,
                            marginTop: 12,
                        }}>
                            <CInput style={ { width: isMobile ? 300 : 612 } } placeholder="message" onChange={ setMessage } multiline/>
                        </div>
                    </>
                }
            </div>
            { sended ? <CText style={ { 
                marginTop: 60,
            } }
            lineGap={ 20 } msg={'The message arrived safely!\nI will check it\nand contact you ASAP :)'} /> :
                <div onClick={ sendEmail } className={ submitBtnClass }
                    onMouseOver={ () => setHover(true)}
                    onMouseLeave={ () => setHover(false)}
                    style={ { 
                        marginTop: 48,
                        backgroundColor: fontColor.dark,
                        width: isMobile ? 150 : 300,
                        height: isMobile ? 50 : 100,
                        borderRadius: 100,
                        ...getFlexStyle('center'),
                    } } >
                    <CText msg="Send Message" style={ {
                        color: color.point1,
                    } }/>   
                </div> }
        </div>
    </Scene>
}