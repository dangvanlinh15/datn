import { memo, useCallback, useState } from "react";
import { IC_ADD_FRIEND, IC_ADD_MEMBER, IC_SEARCH } from "../../../images";
import { Messager } from "./Messager";

export const SideLeftMessage = memo(( {messagers} ) => {
    const [search, setSearch] = useState('')
    const changeInputSearch = useCallback((event) => {
        setSearch(event.target.value)
    }, [search])

    return (
        <div className="side-left-message">
            <div className="header-side-left align-items-center">
                <input type="text" className="form-control" value={search} onChange={changeInputSearch} />
                <img src={IC_SEARCH} alt="not-found" className="icon-search"/>
                <img src={IC_ADD_MEMBER} alt="not-found" className="icon-add-member mx-2" data-toggle="tooltip" data-placement="bottom" title="Tạo nhóm chat"/>
                <img src={IC_ADD_FRIEND} alt="not-found" className="icon-add-friend mx-2" data-toggle="tooltip" data-placement="bottom" title="Thêm bạn"/>
            </div>
            <div className="content-side-left overflow-auto">
                {
                    messagers.map((item, index) => {
                        return(<Messager name={item.name} time={item.time} endMessage={item.endMessage} key={index}/>)
                    })
                }
            </div>
        </div>
    )
})