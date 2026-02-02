'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSchedules, KalendarRow } from './use-kalendar';

const PAGE_SIZES = [10, 25, 50] as const;

const STATUS_CONFIG = {
  active: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    label: 'Active',
  },
  inactive: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    label: 'Inactive',
  },
} as const;

export default function KalendarTable() {
  const {
    data,
    loading,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    pagination,
  } = useSchedules();

  const columns = useMemo<ColumnDef<KalendarRow>[]>(() => [
    { accessorKey: 'kelas', header: 'KELAS' },
    { accessorFn:(row) => `${row.hari}, ${row.start_time} - ${row.end_time}`, header: 'Hari dan waktu' },
    { accessorKey: 'mentor', header: 'MENTOR' },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ getValue }) => {
        const value = getValue() as 'active' | 'inactive';
        const config = STATUS_CONFIG[value];
        return (
          <span
            className={`px-3 py-1 rounded-md text-xs font-semibold ${config.bg} ${config.text}`}
          >
            {config.label}
          </span>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
      globalFilter: search,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Schedule</h2>

        <div className="flex gap-3">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search class or mentor..."
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={limit}
            onChange={e => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            {PAGE_SIZES.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-10 text-center text-gray-500">
            Loading schedules...
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-400 uppercase text-xs">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="text-left py-3 font-medium">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      {pagination && (
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <div className="flex gap-1">
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
            >
              ‹
            </button>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
