import { Link, useLocation } from 'react-router-dom';

const FeatureMenu = () => {
    const location = useLocation();
    const module = "/features"

    const getTitle = () => {
        const editUrl: RegExp = new RegExp(/^\/features\/\d+\/add$/)
        const showUrl: RegExp = new RegExp(/^\/features\/\d+$/)

        if (location.pathname === '/features/add') {
            return 'Ajouter une feature';
        } else if (editUrl.test(location.pathname)) {
            return 'Modifier une feature';
        } else if (showUrl.test(location.pathname)) {
            return 'Features';
        } else {
            return 'Features';
        }
    };

    return (
        <div className="flex justify-between mx-4">
            <h2 className="text-xl font-medium">{getTitle()}</h2>
            <div>
                <Link to={`${module}/`} className='mx-1 bouton-menu inline-block border border-primary text-primary hover:border-accent hover:text-accent py-2 px-4 rounded' title='Retour au menu feature'>
                    <i className="fa fa-home"></i>
                </Link>
                <Link to={`${module}/add`} className='mx-1 bouton-menu inline-block border border-primary text-primary hover:border-accent hover:text-accent py-2 px-4 rounded' title='Créer une feature'>
                    <i className="fa fa-plus"></i>
                </Link>
            </div>
        </div>
    )
}

export default FeatureMenu
