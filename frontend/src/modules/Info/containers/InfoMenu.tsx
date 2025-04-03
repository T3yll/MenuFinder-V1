import { Link, useLocation } from 'react-router-dom';

const InfoMenu = () => {
    const location = useLocation();
    const module = "/infos"

    const getTitle = () => {
        const editUrl: RegExp = new RegExp(/^\/infos\/\d+\/add$/)
        const showUrl: RegExp = new RegExp(/^\/infos\/\d+$/)

        if (location.pathname === '/infos/add') {
            return 'Ajouter une fiche info';
        } else if (editUrl.test(location.pathname)) {
            return 'Modifier une fiche info';
        } else if (showUrl.test(location.pathname)) {
            return 'Fiche Info';
        } else {
            return 'Fiche Info';
        }
    };

    return (
        <div className="flex justify-between mx-4">
            <h2 className="text-xl font-medium">{getTitle()}</h2>
            <div>
                <Link to={`${module}`} className='mx-1 bouton-menu inline-block border border-primary text-primary hover:border-accent hover:text-accent py-2 px-4 rounded' title='Retour au menu fiche info'>
                    <i className="fa fa-home"></i>
                </Link>
                <Link to={`${module}/add`} className='mx-1 bouton-menu inline-block border border-primary text-primary hover:border-accent hover:text-accent py-2 px-4 rounded' title='Créer une fiche info'>
                    <i className="fa fa-plus"></i>
                </Link>
            </div>
        </div>
    )
}

export default InfoMenu
