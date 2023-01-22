import Admin from './pages/admin/Admin'
import Main from './pages/main/Main'
import Profile from './pages/profile/Profile'
import Album from './pages/album/Album'
import About from './pages/about/About'
import Api from './pages/apiPage/Api'
import Premium from './pages/premium/Premium'
import { ABOUT_ROUTE, ADMIN_ROUTE, ALBUM_ROUTE, API_ROUTE, MAIN_ROUTE, PREMIUM_ROUTE, PROFILE_ROUTE } from "./utils/consts";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    }
]

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Profile />
    },
    {
        path: PROFILE_ROUTE + '/:username',
        Component: <Profile />
    },
    {
        path: ALBUM_ROUTE + '/:code',
        Component: <Album />
    }
]

export const allRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Main />
    },
    {
        path: ABOUT_ROUTE,
        Component: <About />
    },
    {
        path: API_ROUTE,
        Component: <Api />
    },
    {
        path: PREMIUM_ROUTE,
        Component: <Premium />
    }
]