import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import GlobalHeroArea from "../GlobalHeroArea";
import Footer from "./Footer";
import Header from "./Header";


const Layout: React.FC = () => {
    return (
        <div
            className={
                "w-full h-full "
            }
        >
            <Header />
            <main>
                <GlobalHeroArea />
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}


export default Layout;