import { Column as ColumnPr } from 'primereact/column'

interface Props {
    field: string,
    header: string,
    sortable?: boolean,
    showFilterMenu?: boolean,
    filter?: boolean,
    filterPlaceholder?: string,
    filterField?: string,
    body?: any,
}

const Column = ({ field, header, sortable, showFilterMenu, filter, filterPlaceholder, body }: Props) => {
    return (
        <ColumnPr field={field} header={header} sortable={sortable} showFilterMenu={showFilterMenu} filter={filter} filterPlaceholder={filterPlaceholder}
            body={body}
        />
    )
}

Column.defaultProps = {
    sortable: true,
    showFilterMenu: false,
    filter: true,
    filterPlaceholder: 'Rechercher...',
    body: undefined,
    filterMatchMode: 'contains',
    showFilterMatchModes: false, 
    showFilterMenuOptions: false, 
    showFilterOperator: false,
}

export default Column