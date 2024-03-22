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
            id: 'Crear Torneo',
            title: 'Crea Torneo',
            type: 'item',
            url: '/views/tournament/createtournament',
            icon: icons.IconTournament,
            breadcrums: true
        },
        {       
            id: 'tournamentEnrollment',
            title: 'Inscripción a torneo',
            type: 'item',
            url: '/views/tournamentenrollment',
            icon: icons.IconTournament,
            breadcrums: true
        },
        {
            id: 'teammanagement',
            title: 'Parejas',
            type: 'item',
            url: '/views/tournament/teamsenrolled',
            icon: icons.IconUsers,
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
            id: 'Calendario',
            title: 'Calendario Juegos',
            type: 'item',
            url: '/views/gameplanning',
            icon: icons.IconCalendarStats,
            breadcrums: true

        },
        {
            id: 'GroupResults',
            title: 'Resultados por Grupo',
            type: 'item',
            url: '/views/roundrobinwinner',
            icon: icons.IconCalendarStats,
            breadcrums: true

        },
        {
            id: 'PlayOffsQuarters',
            title: 'Grafica de Cuartos',
            type: 'item',
            url: '/views/playoffs/drawcuartos',
            icon: icons.IconTournament,
            breadcrums: true

        },
        {
            id: 'PlayOffsRoundOfSixteen',
            title: 'Grafica de Octavos',
            type: 'item',
            url: '/views/playoffs/drawoctavos',
            icon: icons.IconTournament,
            breadcrums: true

        },
        {       
            id: 'Crear Grupos',
            title: 'Crear Grupos',
            type: 'item',
            url: '/views/tournament/creategroups',
            icon: icons.IconUsers,
            breadcrums: true
        }
    ]

};

export default tournamentAdministration;
