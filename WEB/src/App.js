import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    Navigate,
} from "react-router-dom";
import "./scss/app.scss";
import { Index } from "./pages/index/Index";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Post } from "./pages/post/Post";
import { DetailPost } from "./pages/index/DetailPost";
import { Message } from "./pages/message/Message";
import { MainLayout } from "./layout/MainLayout";
import { AuthLayout } from "./layout/AuthLayout";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="home" element={<Index />}></Route>
                        <Route path="home/:id" element={<DetailPost />}></Route>
                        <Route path="post" element={<Post />}></Route>
                        <Route path="message" element={<Message />}></Route>
                        <Route
                            path="*"
                            element={<Navigate to={"/home"} />}
                        ></Route>
                    </Route>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="register" element={<Register />}></Route>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
