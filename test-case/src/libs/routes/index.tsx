import React from "react";
import { createBrowserRouter } from "react-router-dom";

/* 
Lazy load all views
*/
const Layout = React.lazy(() => import("../../components/layout/index.tsx"));
const Home = React.lazy(() => import("../../views/Home.tsx"));

const Characters = React.lazy(() => import("../../views/Characters/index.tsx"));
const CharacterDetails = React.lazy(() => import("../../views/Characters/Details.tsx"));

const Episodes = React.lazy(() => import("../../views/Episodes/index.tsx"));
const EpisodeDetails = React.lazy(() => import("../../views/Episodes/Details.tsx"));

const NotFound = React.lazy(() => import("../../views/404.tsx"));

const router = createBrowserRouter([
    {
        id: "layout",
        path: "/",
        Component: Layout,
        children: [
            {
                id: "not-found",
                path: "*",
                Component: NotFound
            },
            { 
                path: "/",
                Component: Home
            },
            {
                path: "/characters",
                Component: Characters,
                
                children: [
                    {
                        path: ":id",
                        Component: CharacterDetails
                    }
                ]
            },
            {
                path: "/episodes",
                Component: Episodes,
                children: [
                    {
                        path: ":id",
                        Component: EpisodeDetails
                    }
                ]
            },
            /*{
                path: "/locations",
                Component: Home
            }*/
        ]
    } 
   
]);

export default router;