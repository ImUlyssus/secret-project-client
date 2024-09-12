import React, { useEffect, useState, useRef } from 'react';
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Modal, useDisclosure, Center, Box
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import RenderNotificaton from './RenderNotification'
// import { NotiList } from './RenderNotification'
const Notification = ({ isOpen1, onClose1 }) => {
    const effectRan = useRef(false);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [notiList, setNotiList] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isHover, setIsHover] = React.useState(false);
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (effectRan.current === true) {
            const getNotifications = async () => {
                try {
                    const response = await axiosPrivate.get(`/notifications/byid/${auth.user.userId}`, {
                        signal: controller.signal
                    });
                    isMounted && setNotiList(response.data);
                } catch (err) {
                    console.log(err);
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }
            getNotifications();

        }
        return () => {
            isMounted = false;
            controller.abort();
            effectRan.current = true;
        }
    }, []);
    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    const boxStyle = {
        backgroundColor: isHover ? '#beef00' : '',
        borderRadius: '1rem'
    }

    const handleSizeClick = () => {
        { handleMouseLeave() }
        onOpen()
    }
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }
    return (
        <>
            <Modal color='white' isOpen={isOpen1} onClose={onClose1} size="md" isCentered>
                <ModalOverlay />
                <ModalContent bg="#1A202C" color='white' maxH="50vh">
                    <ModalHeader>Notifications</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflowY="scroll" maxH='50vh'>
                        {notiList.length === 0 ?
                            <Box h='20vh'><Center pt='7vh'>You do not have any notification.</Center></Box>
                            :
                            [...notiList].reverse().map((content, index) => (
                                <RenderNotificaton key={index} text={content.text} date={formatDate(content.date)} notiId={content.id} />
                            ))
                        }
                        {/* {notiList.map((content, index) => (
                            <RenderNotificaton key={index} text={content.text} notiId={content.id} date={formatDate(content.date)} />
                        ))} */}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>


    )
}



export default Notification


// import React, { useEffect, useState, useRef } from 'react';
// import {
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalBody,
//     ModalCloseButton, Modal, Center, Box
// } from '@chakra-ui/react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import useAxiosPrivate from '../hooks/useAxiosPrivate';
// import useAuth from '../hooks/useAuth';
// import RenderNotificaton from './RenderNotification'
// // import { NotiList } from './RenderNotification'
// const Notification = ({ isOpen1, onClose1 }) => {
//     const effectRan = useRef(false);
//     const axiosPrivate = useAxiosPrivate();
//     const { auth } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [notiList, setNotiList] = useState([]);
//     useEffect(() => {
//         let isMounted = true;
//         const controller = new AbortController();
//         if (effectRan.current === true) {
//             const getNotifications = async () => {
//                 try {
//                     const response = await axiosPrivate.get(`/notifications/byid/${auth.user.userId}`, {
//                         signal: controller.signal
//                     });
//                     isMounted && setNotiList(response.data);
//                 } catch (err) {
//                     console.log(err);
//                     // navigate('/login', { state: { from: location }, replace: true });
//                 }
//             }
//             getNotifications();

//         }
//         return () => {
//             isMounted = false;
//             controller.abort();
//             effectRan.current = true;
//         }
//     },[]);
//     function formatDate(dateString) {
//         const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
//         const date = new Date(dateString);
//         return date.toLocaleDateString(undefined, options);
//     }
//     return (
//         <>
//             <Modal color='white' isOpen={isOpen1} onClose={onClose1} size="md" isCentered>
//                 <ModalOverlay />
//                 <ModalContent bg="#1A202C" color='white' maxH="50vh">
//                     <ModalHeader>Notifications</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody overflowY="scroll" maxH='50vh'>
//                         {notiList.length === 0 ?
//                             <Box h='20vh'><Center pt='7vh'>You do not have any notification.</Center></Box>
//                             :
//                             [...notiList].reverse().map((content, index) => (
//                                 <RenderNotificaton key={index} text={content.text} date={formatDate(content.date)} notiId={content.id} />
//                             ))
//                         }
//                     </ModalBody>
//                 </ModalContent>
//             </Modal>
//         </>


//     )
// }



// export default Notification
