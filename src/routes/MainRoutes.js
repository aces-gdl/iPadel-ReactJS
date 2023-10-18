import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ClubsBrowse = Loadable(lazy(() => import('views/clubs/Browse')));
const DrawGroups = Loadable(lazy(() => import('views/groups/DrawGroups')));
const UsersBrowse = Loadable(lazy(() => import('views/users/Browse')));
const TournamentDashboard = Loadable(lazy(() => import('views/tournaments/Dashboard')))
const TournamentEnrolledTeams = Loadable(lazy(() => import('views/teamsEnrolled/BrowseTeams')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'views/clubs/Browse',
            element: <ClubsBrowse />
        },
        {
            path: 'views/groups/Draw',
            element: <DrawGroups />
        },
        {
            path: 'views/users/Browse',
            element: <UsersBrowse />
        },
        {
            path: 'views/tournament/dashboard',
            element: <TournamentDashboard />
        },
        {
            path: 'views/tournament/teamsenrolled',
            element: <TournamentEnrolledTeams />
        },
    ]
};

export default MainRoutes;
