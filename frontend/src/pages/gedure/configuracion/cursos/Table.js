import React, { useEffect, useMemo } from 'react'

// MUI
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Components
import ReactTableBase from '../../../../components/ReactTableBase';
import conveterCursorCode from '../../../../components/Utils/converterCursoCode';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getDataCCT, refreshCCT, resetTableConfigCCT, setConfigTableCCT, setSearchCCT } from '../../../../store/slices/gedure/configuracion/cursos/table';
import { setConfirmConfgsGC } from '../../../../store/slices/gedure/configuracion/cursos/confirm';

export default function Table() {
  const { dataR, loading, pageSize, pageCount } = useSelector(state => ({
    dataR: state.gdCConfigTable.tableData.data,
    loading: state.gdCConfigTable.tableData.loading,
    pageSize: state.gdCConfigTable.tableData.pageSize,
    pageCount: state.gdCConfigTable.tableData.pageCount,
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
            onClick={() => {
              dispatch(setConfirmConfgsGC({open: true, data: {id, code}, confirm: 'delete'}))
            }}
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
      promise = dispatch(getDataCCT());
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
      dispatch(resetTableConfigCCT());
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearchCCT(value || ""));
  }

  const handleChange = value => {
    dispatch(setConfigTableCCT(value));
  }

  const handleRefresh = () => {
    dispatch(refreshCCT());
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
              onClick={() => {
                let i = 0;
								let idsArray = [];
								for(let value of dataMassive){
									idsArray[i] = value.id;
									i++;
								}

                dispatch(setConfirmConfgsGC({confirm: 'deleteMassive', open: true, data: idsArray}))
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    />
  )
}
