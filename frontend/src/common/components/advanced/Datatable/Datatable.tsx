import {
  DataTable,
  DataTableStateEvent,
  SortOrder,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Button from '@/common/components/base/Button/Button';
import SearchBar from '@/common/components/base/Menu/SearchBar';
import { Dropdown } from 'primereact/dropdown';
import { IFilter } from '@/common/models/IFilter';

interface Props {
  values: any;
  children: React.ReactNode;
  headerGenericActions: string[];
  headerCustomActions?: () => React.ReactNode | React.ReactNode[];
  rowGenericActions: string[];
  rowCustomActions?: (rowData: any) => React.ReactNode | React.ReactNode[];
  totalRecords: number;
  fetchData: (
    page: number,
    offset: number,
    searchQuery?: string,
    isAtelier?: boolean,
    filters?: IFilter[]
  ) => Promise<void>;
  onDeleteProp?: (id: number) => void;
  handleOnFilter?: (e: DataTableStateEvent) => any;
  handleSortChange?: (e: DataTableStateEvent) => void;
  sortField?: string;
  sortOrder?: SortOrder;
}

const Datatable = ({
  values,
  children,
  headerGenericActions,
  headerCustomActions,
  rowGenericActions,
  rowCustomActions,
  fetchData,
  totalRecords,
  onDeleteProp,
  handleOnFilter,
  handleSortChange,
  sortField,
  sortOrder,
}: Props) => {
  const location = useLocation();
  const module = location.pathname.split('/')[1];
  const dt = useRef<DataTable<any>>(null);

  const [first, setFirst] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const rowsPerPageOptions = [10, 25, 50, 100];

  // Permet de gérer la pagination (en lazy load) au sein du datatable)
  const onPageChange = (event: DataTableStateEvent) => {
    const newPage = event.page !== undefined ? event.page + 1 : 1;
    const newRows = event.rows;
    const newFirst = event.first;

    setPage(newPage);
    setRows(newRows);
    setFirst(newFirst);

    fetchData(newPage, newRows, searchQuery, false);
  };

  useEffect(() => {
    fetchData(page, rows, searchQuery, false);
  }, [page, rows, searchQuery]);

  const toCSV = (selectionOnly: boolean) => {
    if (dt.current) {
      dt.current.exportCSV({ selectionOnly });
    }
  };

  // Header du datatable : Permet d'y afficher la barre de recherche et les boutons d'actions
  const headerDatatable = () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Dropdown
            value={rows}
            options={rowsPerPageOptions}
            onChange={(e) => setRows(e.value)}
          />
        </div>
        {/* Affiche les boutons d'actions */}
        {headerActions(headerGenericActions, headerCustomActions)}
      </div>
    </div>
  );

  // Header du datatable : Génère les boutons d'actions génériques et customisés
  const headerActions = (
    genericActions: string[] = [],
    customActions?: () => any
  ) => {
    return (
      <>
        <div className="row">
          {/* Permet d'ajouter les boutons communs à tous les datatables */}
          {genericActions.map((action) => {
            switch (action) {
              case 'csv':
                return (
                  <Button
                    key={action}
                    className="btn btn-success ml-2"
                    onClick={() => toCSV(true)}
                    tooltip="Exporter les données au format CSV"
                  >
                    <i className="fa fa-file-export mr-1"></i>
                    Export CSV
                  </Button>
                );
              default:
                return null;
            }
          })}
          {/* Permet d'ajouter les boutons customisés (un bouton que l'on retrouve dans un seul datatable) */}
          {customActions ? customActions() : null}
        </div>
      </>
    );
  };

  // Column (Actions) : Génère les boutons d'actions génériques et customisés
  const rowActions = (rowData: { id: number }) => {
    return (
      <>
        <div className="row">
          {/* Permet d'ajouter les boutons communs à tous les datatables */}
          {rowGenericActions.map((genericAction) => {
            switch (genericAction) {
              case 'show':
                return (
                  <Link
                    to={`/${module}/${rowData.id}`}
                    state={rowData}
                    className="btn btn-outline btn-secondary mx-1"
                    key={`${rowData.id}-${genericAction}`}
                  >
                    <i className="fa fa-eye mx-1 my-2"></i>
                  </Link>
                );
              case 'edit':
                return (
                  <Link
                    to={`/${module}/${rowData.id}/edit`}
                    state={rowData}
                    className="btn btn-outline btn-warning mx-1"
                    key={`${rowData.id}-${genericAction}`}
                  >
                    <i className="fa fa-pen mx-1 my-2"></i>
                  </Link>
                );
              case 'delete':
                const onDelete = () => {
                  const conf = confirm('Voulez-vous vraiment supprimer ?');
                  if (conf && onDeleteProp) {
                    onDeleteProp(rowData.id);
                  }
                };
                return (
                  <Button
                    className="btn btn-outline btn-error mx-1"
                    onClick={onDelete}
                    key={`${rowData.id}-${genericAction}`}
                  >
                    <i className="fa fa-trash mx-3 my-2"></i>
                  </Button>
                );
              case 'print':
                return (
                  <Link
                    to={`/${module}/${rowData.id}/print`}
                    state={rowData}
                    className="btn btn-outline btn-success mx-1"
                    key={`${rowData.id}-${genericAction}`}
                  >
                    <i className="fa fa-print mx-1 my-2"></i>
                  </Link>
                );
              default:
                return null;
            }
          })}
          {/* Permet d'ajouter les boutons customisés (un bouton que l'on retrouve dans un seul datatable) */}
          {rowCustomActions ? rowCustomActions(rowData) : null}
        </div>
      </>
    );
  };

  return (
    <DataTable
      ref={dt}
      value={values}
      header={headerDatatable}
      showGridlines
      stripedRows
      paginator
      rowsPerPageOptions={rowsPerPageOptions}
      lazy
      first={first}
      rows={rows}
      totalRecords={totalRecords}
      onPage={onPageChange}
      emptyMessage="Aucune donnée disponible"
      onFilter={handleOnFilter}
      onSort={handleSortChange}
      // Sera réimplémenté dans une prochaine version (Filtres)
      // filterDisplay="row"
      sortField={sortField}
      sortOrder={sortOrder}
    >
      {children}
      {rowActions && rowActions.length > 0 && (
        <Column header="Actions" body={rowActions}></Column>
      )}
    </DataTable>
  );
};

export default Datatable;
