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
const Users = Loadable(lazy(() => import('views/users')));
const CreateTournament = Loadable(lazy(() => import('views/tournaments/CreateTournament')))
const TournamentEnrolledTeams = Loadable(lazy(() => import('views/teamsEnrolled/BrowseTeams')))
const SimulateSubcribers = Loadable(lazy(() => import('views/tournaments/SimulateSubcribers')))
const CreateGroups = Loadable(lazy(() => import('views/tournaments/CreateGroups')))
const GamePlanning = Loadable(lazy(() => import('views/gamePlanning')))
const GroupsResults = Loadable(lazy(() => import('views/groupsResults')))

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
            path: 'views/users',
            element: <Users />
        },
        {
            path: 'views/tournament/createtournament',
            element: <CreateTournament />
        },
        {
            path: 'views/tournament/teamsenrolled',
            element: <TournamentEnrolledTeams />
        },
        {
            path: 'views/tournament/simulatesubscribers',
            element: <SimulateSubcribers />
        },
        {
            path: 'views/tournament/creategroups',
            element: <CreateGroups />
        },
        {
            path: 'views/gameplanning',
            element: <GamePlanning />
        },
        {
            path: 'views/roundrobinwinner',
            element: <GroupsResults />
        },
        
        
    ]
};

export default MainRoutes;
