// assets
import { IconBrandChrome, IconBeach,IconUser, IconUsers,IconTournament,IconUserPlus, IconCalendarStats, IconAffiliate } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconBeach, IconUser, IconUsers,IconTournament,IconUserPlus,IconCalendarStats,IconAffiliate };
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
            id: 'SimulateSubcribers',
            title: 'Simular Inscripciones',
            type: 'item',
            url: '/views/tournament/simulatesubscribers',
            icon: icons.IconAffiliate,
            breadcrums: true
        },
    
        {       
            id: 'Crear Grupos',
            title: 'Crear Grupos',
            type: 'item',
            url: '/views/tournament/creategroups',
            icon: icons.IconUsers,
            breadcrums: true
        },
        
        {       
            id: 'Crear Torneo',
            title: 'Crea Torneo',
            type: 'item',
            url: '/views/tournament/createtournament',
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
            url: '/views/gameplanning',
            icon: icons.IconCalendarStats,
            breadcrums: true

        }
    ]

};

export default tournamentAdministration;
