import { memo } from "react";

export const SideRightMessage = memo(({ name, time }) => {
    return (
        <div className="side-right-message">
            <div className="header-side-right d-flex justify-content-center align-items-center">
                <div className="label">Thông tin hội thoại</div>
            </div>
            <div className="content-side-right d-flex align-items-center flex-column">
                <div className="avatar d-flex justify-content-center align-content-center mx-2 my-2">
                    M
                </div>
                <div className="label">Trần Bá Mạnh</div>
                <div className="status mb-4">Hoạt động 3h trước</div>
                <div className="storage-message">
                    <div
                        className="accordion"
                        id="accordionPanelsStayOpenExample"
                    >
                    </div>
                </div>
            </div>
        </div>
    );
});
