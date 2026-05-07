import { memo, useCallback } from "react";
import { IC_CALL, IC_FACETIME, IC_INFO, IMG_APP } from "../../../images";

export const HeaderMessage = memo(({ activeMessager, connected }) => {
    const handleInfo = useCallback(() => {}, []);
    const name = activeMessager?.name || "Chat khách hàng";
    return (
        <div className="header-message d-flex align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center">
                <div className="avatar-header-chat d-flex justify-content-center">
                    <img src={IMG_APP} />
                </div>
                <div className="messager mx-2 d-flex flex-column justify-content-center">
                    <div className="label">{name}</div>
                    <div className="status">
                        <span className="active"></span>
                        {activeMessager?.phone ? `${activeMessager.phone} - ` : ""}
                        {connected ? "Đang hoạt động" : "Đang kết nối"}
                    </div>
                </div>
            </div>
            <div className="call-facetime">
                <img src={IC_CALL} alt="not-found" className="icon-call mx-1" />
                <img
                    src={IC_FACETIME}
                    alt="not-found"
                    className="icon-facetime mx-1"
                />
                <img
                    src={IC_INFO}
                    alt="not-found"
                    className="icon-info mx-1"
                    onClick={handleInfo}
                />
            </div>
        </div>
    );
});
