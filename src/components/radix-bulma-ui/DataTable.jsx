import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'

export function DataTable({
  data,
  columns,
  // ソート
  enableSorting = true,
  // フィルタ
  enableFiltering = false,
  globalFilter: externalGlobalFilter,
  onGlobalFilterChange,
  // ページネーション
  enablePagination = false,
  pageSize: initialPageSize = 10,
  // 行選択
  enableRowSelection = false,
  onRowSelectionChange,
  // スタイル
  striped = true,
  hoverable = true,
  bordered = false,
  narrow = false,
  fullwidth = true,
  className = '',
  // ローディング
  loading = false,
  // 空状態
  emptyMessage = 'データがありません',
}) {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  // 行選択用のチェックボックス列
  const selectionColumn = enableRowSelection
    ? {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 40,
      }
    : null

  const allColumns = useMemo(() => {
    return selectionColumn ? [selectionColumn, ...columns] : columns
  }, [columns, selectionColumn])

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
      globalFilter: externalGlobalFilter ?? globalFilter,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: onGlobalFilterChange ?? setGlobalFilter,
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater
      setRowSelection(newSelection)
      onRowSelectionChange?.(newSelection)
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    enableRowSelection,
  })

  // テーブルクラス
  const tableClasses = [
    'table',
    striped && 'is-striped',
    hoverable && 'is-hoverable',
    bordered && 'is-bordered',
    narrow && 'is-narrow',
    fullwidth && 'is-fullwidth',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="datatable-wrapper">
      {/* グローバルフィルタ */}
      {enableFiltering && !externalGlobalFilter && (
        <div className="field datatable-filter">
          <div className="control has-icons-left">
            <input
              type="text"
              className="input"
              placeholder="検索..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <span className="icon is-left">🔍</span>
          </div>
        </div>
      )}

      {/* テーブル */}
      <div className="table-container">
        <table className={tableClasses}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    className={header.column.getCanSort() ? 'is-clickable' : ''}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="datatable-header-cell">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="datatable-sort-icon">
                          {{
                            asc: ' ▲',
                            desc: ' ▼',
                          }[header.column.getIsSorted()] ?? ' ⇅'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={allColumns.length} className="has-text-centered">
                  <span className="loader" /> 読み込み中...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={allColumns.length} className="has-text-centered has-text-grey">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={row.getIsSelected() ? 'is-selected' : ''}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ページネーション */}
      {enablePagination && (
        <nav className="pagination is-centered datatable-pagination" role="navigation">
          <button
            className="pagination-previous"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            前へ
          </button>
          <button
            className="pagination-next"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            次へ
          </button>
          <ul className="pagination-list">
            <li>
              <span className="pagination-info">
                {table.getState().pagination.pageIndex + 1} / {table.getPageCount()} ページ
                （全 {table.getFilteredRowModel().rows.length} 件）
              </span>
            </li>
          </ul>
          <div className="select is-small datatable-pagesize">
            <select
              value={pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}件表示
                </option>
              ))}
            </select>
          </div>
        </nav>
      )}
    </div>
  )
}

// カラム定義ヘルパー
export function createColumnHelper() {
  return {
    accessor: (accessorKey, options = {}) => ({
      accessorKey,
      ...options,
    }),
    display: (options) => ({
      ...options,
    }),
  }
}

// 選択された行を取得するヘルパー
export function getSelectedRows(data, rowSelection) {
  return Object.keys(rowSelection)
    .filter((key) => rowSelection[key])
    .map((key) => data[parseInt(key, 10)])
    .filter(Boolean)
}
