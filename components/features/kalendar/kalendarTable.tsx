'use client';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { kalendarData } from '@/components/features/kalendar/kalendar.data';
import { Pencil, MoreVertical } from 'lucide-react';

type KalendarRow = (typeof kalendarData)[number];

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZES = [10, 25, 50] as const;
const STATUS_CONFIG = {
    active: { bg: 'bg-green-100', text: 'text-green-600', label: 'Active' },
    inactive: { bg: 'bg-red-100', text: 'text-red-600', label: 'Inactive' },
} as const;

export default function KalendarTable() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const columns = useMemo<ColumnDef<KalendarRow>[]>(() => [
        {
            accessorKey: 'kelas',
            header: 'KELAS',
        },
        {
            accessorKey: 'tanggal',
            header: 'TANGGAL',
        },
        {
            accessorKey: 'mentor',
            header: 'MENTOR',
        },
        {
            accessorKey: 'status',
            header: 'STATUS',
            cell: ({ getValue }) => {
                const value = getValue() as string;
                const config = STATUS_CONFIG[value as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.inactive;
                return (
                    <span className={`px-3 py-1 rounded-md text-xs font-semibold ${config.bg} ${config.text}`}>
                        {config.label}
                    </span>
                );
            },
        },
        {
            id: 'action',
            header: 'ACTION',
            cell: () => (
                <div className="flex items-center gap-3 text-gray-500">
                    <Pencil size={16} className="cursor-pointer hover:text-gray-700" />
                    <MoreVertical size={16} className="cursor-pointer hover:text-gray-700" />
                </div>
            ),
        },
    ], []);

    const table = useReactTable({
        data: kalendarData,
        columns,
        state: { globalFilter, pagination: { pageIndex: 0, pageSize } },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handlePageSizeChange = useCallback((size: string) => {
        setPageSize(Number(size));
        table.setPageIndex(0);
    }, [table]);

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">Schedule</h2>
                <div className="flex gap-3">
                    <input
                        value={globalFilter ?? ''}
                        onChange={e => table.setGlobalFilter(e.target.value)}
                        placeholder="Search..."
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select 
                        value={pageSize} 
                        onChange={e => handlePageSizeChange(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {PAGE_SIZES.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-gray-400 uppercase text-xs">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="text-left py-3 font-medium"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
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
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                    Showing {table.getRowModel().rows.length === 0 ? 0 : 1} to {table.getRowModel().rows.length} of {kalendarData.length} entries
                </span>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        aria-label="Previous page"
                    >
                        ‹
                    </button>

                    {Array.from({ length: table.getPageCount() }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => table.setPageIndex(i)}
                            aria-current={table.getState().pagination.pageIndex === i ? 'page' : undefined}
                            className={`px-3 py-1 rounded transition ${
                                table.getState().pagination.pageIndex === i
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        aria-label="Next page"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}
