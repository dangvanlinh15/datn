import { memo } from "react";
import { Header } from "../../components/Header";
import { MainPost } from "./components/MainPost";

export const Post = memo(()=> {
    return <div className="post">
        <Header/>
        <MainPost/>
    </div>
})