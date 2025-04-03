import { Link, useLocation } from 'react-router-dom';

const TeamMenu = () => {
    const location = useLocation();
    const module = "/teams"

    const getTitle = () => {
        const editUrl: RegExp = new RegExp(/^\/teams\/\d+\/add$/)
        const showUrl: RegExp = new RegExp(/^\/teams\/\d+$/)

        if (location.pathname === '/teams/add') {
            return 'Ajouter une team';
        } else if (editUrl.test(location.pathname)) {
            return 'Modifier une team';
        } else if (showUrl.test(location.pathname)) {
            return 'Team';
        } else {
            return 'Teams';
        }
    };

    return (
        <div className="flex justify-between mx-4">
            <h2 className="text-xl font-medium">{getTitle()}</h2>
            <div>
                <Link to={`${module}`} className='mx-1 bouton-menu inline-block border border-primary text-primary hover:border-accent hover:text-accent py-2 px-4 rounded' title='Retour au menu team'>
                    <i className="fa fa-home"></i>
                </Link>
                <Link to={`${module}/add`} className='mx-1 bouton-menu inline-block border border-primary text-primary hover:border-accent hover:text-accent py-2 px-4 rounded' title='Créer une team'>
                    <i className="fa fa-plus"></i>
                </Link>
            </div>
        </div>
    )
}

export default TeamMenu
