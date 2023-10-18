// assets
import { IconBrandChrome, IconBeach,IconUser, IconUsers,IconTournament,IconUserPlus, IconCalendarStats } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconBeach, IconUser, IconUsers,IconTournament,IconUserPlus,IconCalendarStats };
// ==============================|| MENU Adminstracion ||============================== //

const tournamentAdministration = {
    id: 'tournaments',
    title: 'Torneos',
    type: 'group',
    children: [
        {
            id: 'subscribed',
            title: 'Inscripciones',
            type: 'item',
            url: '/views/tournament/teamsenrolled',
            icon: icons.IconUserPlus,
            breadcrums: true
        },
        {       
            id: 'Crear Torneo',
            title: 'Crea Torneo',
            type: 'item',
            url: '/views/tournament/dashboard',
            icon: icons.IconTournament,
            breadcrums: true
        },
        {
            id: 'Groups',
            title: 'Grupos',
            type: 'item',
            url: '/views/groups/draw',
            icon: icons.IconUsers,
            breadcrums: true
        },
        {
            id: 'Calendario',
            title: 'Calendario Juegos',
            type: 'item',
            url: '/views/users/browse',
            icon: icons.IconCalendarStats,
            breadcrums: true
        }
    ]

};

export default tournamentAdministration;
