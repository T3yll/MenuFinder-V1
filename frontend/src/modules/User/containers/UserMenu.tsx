import { Link, useLocation } from 'react-router-dom';

const UserMenu = () => {
    const location = useLocation();
    const module = "/users"

    const getTitle = () => {
        const editUrl: RegExp = new RegExp(/^\/users\/\d+\/add$/)
        const showUrl: RegExp = new RegExp(/^\/users\/\d+$/)

        if (location.pathname === '/users/add') {
            return 'Ajouter un utilisateur';
        } else if (editUrl.test(location.pathname)) {
            return 'Modifier un utilisateur';
        } else if (showUrl.test(location.pathname)) {
            return 'Utilisateur';
        } else {
            return 'Utilisateur';
        }
    };

    return (
        <div className="flex justify-between mx-4">
            <h2 className="text-xl font-medium">{getTitle()}</h2>
            <div>
                <Link to={`${module}`} className='mx-1 bouton-menu inline-block border border-primary text-primary hover:border-accent hover:text-accent py-2 px-4 rounded' title='Retour au menu utilisateurs'>
                    <i className="fa fa-home"></i>
                </Link>
            </div>
        </div>
    )
}

export default UserMenu
