import React, { useEffect, useMemo } from 'react'

// MUI
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Components
import ReactTableBase from '../../../../components/ReactTableBase';
import conveterCursorCode from '../../../../components/Utils/converterCursoCode';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../../store/slices/tables';
import { getCursos } from '../../../../store/slices/tables/async_trunk/configuracion/TableCursos';
import { setRequestStatus } from '../../../../store/slices/requestStatus';

export default function Table() {
  const { dataR, loading, pageSize, pageCount, gedure: { cursos_destroy } } = useSelector(state => ({
    dataR: state.tables.cursos.tableData.data,
    loading: state.tables.cursos.tableData.loading,
    pageSize: state.tables.cursos.tableData.pageSize,
    pageCount: state.tables.cursos.tableData.pageCount,
    gedure: state.auth.permissions.gedure,
  }));
  const dispatch = useDispatch();

  const columns = useMemo(() => [
    {
      Header: 'Código',
      accessor: 'code',
      Cell: ({ cell: { row: { original: { curso, seccion } } } }) => `${curso}-${seccion}`
    },
    {
      Header: 'Curso',
      accessor: 'curso',
      Cell: ({ cell: { row: { original: { curso } } } }) => conveterCursorCode(curso)
    },
    {
      Header: 'Sección',
      accessor: 'seccion',
    },
    {
      id: 'options',
      Header: 'Opciones',
      accessor: 'options',
      Cell: ({ cell: { row: { original: { id, code } } } }) => (
        <Tooltip title='Eliminar' arrow>
          <IconButton
            component='span'
            onClick={() => {
              dispatch(setRequestStatus({open: true, data: {id, code}, select: 'deleteCurso'}))
            }}
            disabled={!cursos_destroy}
          >
           <DeleteForeverIcon /> 
          </IconButton>
        </Tooltip>
      )
    },
    // eslint-disable-next-line
  ],[]);

  const data = useMemo(() => dataR, [dataR]);

  // NOTA(RECKER): Core request
  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(getCursos());
    }

    return () => {
      if (loading) {
        promise.abort(); 
      }
    }
    // eslint-disable-next-line
  }, [loading]);

  // NOTA(RECKER): Reinicar config al desmontar
  useEffect(() => {
    return () => {
      dispatch(resetTableConfig({ select: 'cursos' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'cursos'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'cursos' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'cursos' }));
  }

  return (
    <ReactTableBase
      title='Cursos activos'
      data={data}
      columns={columns}
      pageCountData={pageCount}
      pageSizeData={pageSize}
      loading={loading}
      handleGlobalFilter={handleGlobalFilter}
      handleChange={handleChange}
      refresh={handleRefresh}
      massiveOptions={dataMassive => (
        <>
          <Tooltip title="Eliminar" arrow>
            <IconButton
              component='span'
              onClick={() => {
                let i = 0;
								let idsArray = [];
								for(let value of dataMassive){
									idsArray[i] = value.id;
									i++;
								}

                dispatch(setRequestStatus({select: 'deleteMassiveCursos', open: true, data: idsArray}))
              }}
              disabled={!cursos_destroy}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    />
  )
}
