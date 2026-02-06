import React from 'react'
import { Modal } from 'antd';
import RoundButton, { RoundButtonCancel } from '../Button/RoundButton';
import SuccessModalSVG from '../../assets/SuccessSVG'
import SvgContentViewOpenIssues from '../../assets/ContentViewOpenIssues'

class MessageConfirmModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            loading: false,
            message: "",
            type: "danger",
            handleOnHide: null,
            handleOnClose: null,
            title: null,
            isCancel: false,
            isConfirm: false,
            isDelete: false,
            isConfirms: false,
            yesTitle1: '',
            yesTitle2: ''
        }
    }

    show(message, title) {
        this.setState({
            visible: true,
            message,
            handleOnHide: null,
            handleOnClose: null,
            isConfirm: false,
            title
        })
    }

    showError(message, title) {
        this.setState({
            visible: true,
            message,
            type: "danger",
            handleOnHide: null,
            handleOnClose: null,
            isConfirm: false,
            title
        })
    }

    showSuccess(message, onHide, title) {
        this.setState({
            visible: true,
            message,
            type: "success",
            handleOnHide: onHide,
            handleOnClose: null,
            isConfirm: false,
            title
        })
    }

    showWarning(message, onHide, title) {
        this.setState({
            visible: true,
            message,
            type: "warning",
            handleOnHide: onHide,
            handleOnClose: null,
            isConfirm: false,
            title
        })
    }


    showWarningConfirm(message, onHide, title, isDelete) {
        this.setState({
            visible: true,
            message,
            type: "warning",
            handleOnHide: onHide,
            handleOnClose: null,
            isCancel: true,
            title,
            isConfirm: true,
            isDelete: isDelete ? isDelete : false,
        })
    }
    showWarningConfirmsp(message, onHide, title, isDelete) {
        this.setState({
            visible: true,
            message,
            type: "warning",
            handleOnHide: onHide,
            handleOnClose: null,
            isCancel: false,
            title,
            isConfirm: true,
            isDelete: isDelete ? isDelete : false,
        })
    }


    showWarningConfirms(message, onHide, title, isDelete) {
        this.setState({
            visible: true,
            message,
            type: "warning",
            handleOnHide: onHide,
            handleOnClose: null,
            isCancel: false,
            title,
            isConfirm: false,
            isDelete: isDelete ? isDelete : false,
            isConfirms: true
        })
    }

    showWarningConfirmsNew(message, onHide, title, isDelete) { //for close when click x action no have button close
        this.setState({
            visible: true,
            message,
            type: "warning",
            handleOnHide: onHide,
            handleOnClose: onHide,
            isCancel: false,
            title,
            isConfirm: false,
            isDelete: isDelete ? isDelete : false,
            isConfirms: true
        })
    }

    showSuccessConfirmsAutoClose(message, onHide, title, isDelete) {
        this.setState({
            visible: true,
            message,
            type: "success",
            handleOnHide: onHide,
            handleOnClose: null,
            isCancel: false,
            title,
            isConfirm: false,
            isDelete: isDelete ? isDelete : false,
            isConfirms: true
        })

        setTimeout(() => {
            this.setState({ visible: false });
            if(onHide) {
                onHide()
            }
            if (this.state.handleOnClose) {
                this.state.handleOnClose()
            }
        }, 1500);
    }
    showWarningConfirmsSuccessNew(message, onHide, title, isDelete) {
        this.setState({
            visible: true,
            message,
            type: "success",
            handleOnHide: onHide,
            handleOnClose: onHide,
            isCancel: false,
            title,
            isConfirm: false,
            isDelete: isDelete ? isDelete : false,
            isConfirms: true
        });
    }
    showWarningConfirmsAutoClose(message, onHide, title, isDelete) {
        this.setState({
            visible: true,
            message,
            type: "warning",
            handleOnHide: onHide,
            handleOnClose: null,
            isCancel: false,
            title,
            isConfirm: false,
            isDelete: isDelete ? isDelete : false,
            isConfirms: true
        })

        setTimeout(() => {
            this.setState({ visible: false });
            if(onHide) {
                onHide()
            }
            if (this.state.handleOnClose) {
                this.state.handleOnClose()
            }
        }, 3000);
    }

    showWarningConfirmClose(message, onHide, title, OnClose) {
        this.setState({
            visible: true,
            message,
            type: "warning",
            handleOnHide: onHide,
            handleOnClose: OnClose,
            isCancel: true,
            title,
            isConfirm: true
        })
    }


    showWarningConfirmCloseCancel(message, onHide, title, OnClose, isDelete, OnClose1, yesTitle1, yesTitle2, isCancel) {
        this.setState({
            visible: true,
            message,
            type: "warning",
            handleOnHide: onHide,
            handleOnClose: OnClose ? OnClose : null,
            handleOnClose1: OnClose1 ? OnClose1 : null,
            isCancel: !isCancel,
            title,
            isConfirm: true,
            isDelete: isDelete ? isDelete : false,
            yesTitle1: yesTitle1 ? yesTitle1 : '',
            yesTitle2: yesTitle2 ? yesTitle2 : ''
        })
    }

    handleCancel = () => {
        this.setState({ visible: false, yesTitle1: '', yesTitle2: '' });
        if(this.state.handleOnClose) {
            this.state.handleOnClose()
        }
    };

    handleOk = () => {

    };

    render() {
        const { message, visible, type, handleOnHide, title, isCancel, isConfirm, isDelete,
            handleOnClose, handleOnClose1, isConfirms, yesTitle1, yesTitle2 } = this.state;
        const {  noTitle, yesTitle, widthBtn, classNameMsg, accessRole } = this.props;


        return (
                    <>
                        <Modal
                            className="custom_modal_delete custom_modal_Release_Pending"
                            centered
                            style={{textAlign:'center'}}
                            open={visible}
                            zIndex={11111}
                            title={title ? <>
                            {isDelete ? <div className="notes_title" style={{textAlign:"center"}}>{type === 'success' ? <SuccessModalSVG/> : <SvgContentViewOpenIssues/>}</div> : ''}
                            {title}
                            </> : <>
                             {isDelete ? <div className="notes_title" style={{textAlign:"center"}}>{type === 'success' ? <SuccessModalSVG/> : <SvgContentViewOpenIssues/>}</div> : ''}
                            </>}
                            onOk={() => {
                                this.setState({ visible: false, yesTitle1: '', yesTitle2: ''  })
                                if (handleOnHide) {
                                    handleOnHide()
                                }
                            }}
                            onCancel={this.handleCancel}
                            footer={[
                                isCancel && <RoundButtonCancel
                                    width={widthBtn ? widthBtn : "10rem"}
                                    fontWeight="600"
                                    borderRadius="0.625rem"
                                    onClick={() => {
                                        this.setState({ visible: false, yesTitle1: '', yesTitle2: ''  })
                                        if(handleOnClose) {
                                            handleOnClose()
                                        }
                                    }}
                                    className="mr-cus skhsk mb-3 mr-3"
                                    title={noTitle ? noTitle : 'No'} />,
                                    isConfirm && <RoundButton
                                    disabled = {accessRole === "yes" ? true : false}
                                    cursor={accessRole === "yes" ? "not-allowed" : "pointer"}
                                    width={widthBtn ? widthBtn : "10rem"}
                                    fontWeight="600"
                                    borderRadius="0.625rem"
                                    marginLeft="2rem"
                                    whiteSpace="nowrap"
                                    onClick={() => {
                                        this.setState({ visible: false, yesTitle1: '', yesTitle2: '' })
                                        if (handleOnHide) {
                                            handleOnHide()
                                        }
                                    }}
                                    className="mr-cus skhsk mb-3 mr-3"
                                    title={ yesTitle1 ? yesTitle1 : yesTitle ? yesTitle : <span style={{color:"white"}}>Yes</span>}
                                />,
                                isConfirm && yesTitle2 && <RoundButton
                                    width={widthBtn ? widthBtn : "10rem"}
                                    fontWeight="600"
                                    borderRadius="0.625rem"
                                    marginLeft="2rem"
                                    whiteSpace="nowrap"
                                    onClick={() => {
                                        this.setState({ visible: false, yesTitle1: '', yesTitle2: '' })
                                        if (handleOnClose1) {
                                            handleOnClose1()
                                        }
                                    }}
                                    className="mr-cus skhsk mb-3 mr-3"
                                    title={ yesTitle2 ? yesTitle2 : <span style={{color:"white"}}>Yes</span>}
                                />,
                                !isConfirm && !isConfirms && <RoundButton
                                    onClick={() => {
                                        this.setState({ visible: false, yesTitle1: '', yesTitle2: '' })
                                        if (handleOnHide) {
                                            handleOnHide()
                                        }
                                        if(handleOnClose) {
                                            handleOnHide()
                                        }
                                    }}
                                    title='Close'
                                />,
                            ]}
                        >
                            <p className={`notes_box_left_modal text-center ${classNameMsg}`} style={{fontSize:"1.2rem", fontWeight:600, color:'#152c5b'}}>{message}</p>
                        </Modal>
                    </>
        )
    }
}

export default MessageConfirmModal;