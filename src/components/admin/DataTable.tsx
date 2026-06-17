'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Pagination } from '@/components/ui/pagination';
import { AdminExportIcon, AdminFilterIcon, AdminSearchIcon, AdminEyeIcon, AdminEditIcon, AdminTrashIcon, AdminLockIcon } from '@/icons/admin-icons';
import EmptyState, { TableSkeleton } from './EmptyState';

export type Column<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  hidden?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

export type RowAction<T> = {
  label: string;
  icon?: 'view' | 'edit' | 'delete' | 'lock';
  onClick: (row: T) => void;
  variant?: 'default' | 'danger';
};

type DataTableProps<T extends { id: string }> = {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  filterable?: boolean;
  exportable?: boolean;
  selectable?: boolean;
  pageSize?: number;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  rowActions?: RowAction<T>[];
  onExport?: () => void;
  toolbar?: React.ReactNode;
};

const actionIcons = {
  view: AdminEyeIcon,
  edit: AdminEditIcon,
  delete: AdminTrashIcon,
  lock: AdminLockIcon,
};

export default function DataTable<T extends { id: string }>({
  data,
  columns: initialColumns,
  searchable = true,
  searchKeys,
  filterable = true,
  exportable = true,
  selectable = true,
  pageSize = 10,
  loading = false,
  emptyTitle = 'Không có dữ liệu',
  emptyDescription = 'Chưa có bản ghi nào trong hệ thống.',
  rowActions,
  onExport,
  toolbar,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [visibleCols, setVisibleCols] = useState<Set<string>>(
    new Set(initialColumns.filter((c) => !c.hidden).map((c) => c.key))
  );
  const [showColMenu, setShowColMenu] = useState(false);

  const columns = initialColumns.filter((c) => visibleCols.has(c.key));

  const filtered = useMemo(() => {
    let result = [...data];

    if (search && searchKeys) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        searchKeys.some((key) => String(row[key]).toLowerCase().includes(q))
      );
    }

    if (sortKey) {
      result.sort((a, b) => {
        const aVal = String((a as Record<string, unknown>)[sortKey] ?? '');
        const bVal = String((b as Record<string, unknown>)[sortKey] ?? '');
        const cmp = aVal.localeCompare(bVal, 'vi');
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [data, search, searchKeys, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleSelectAll = () => {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((r) => r.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
      return;
    }
    const headers = columns.map((c) => c.label).join(',');
    const rows = filtered
      .map((row) =>
        columns.map((c) => {
          const val = c.render ? '' : String((row as Record<string, unknown>)[c.key] ?? '');
          return `"${val.replace(/"/g, '""')}"`;
        }).join(',')
      )
      .join('\n');
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 shadow-theme-xs overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
        {searchable && (
          <div className="relative flex-1 max-w-sm">
            <AdminSearchIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Tìm kiếm..."
              className="w-full h-11 pl-10 pr-4 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-3 focus:ring-primary-300/20"
            />
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {toolbar}
          {filterable && (
            <button type="button" className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition">
              <AdminFilterIcon size={18} />
              <span className="hidden sm:inline">Lọc</span>
            </button>
          )}
          {exportable && (
            <button type="button" onClick={handleExport} className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition">
              <AdminExportIcon size={18} />
              <span className="hidden sm:inline">Xuất CSV</span>
            </button>
          )}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColMenu(!showColMenu)}
              className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition"
            >
              Cột
            </button>
            {showColMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-primary rounded-xl shadow-theme-lg border border-gray-100 dark:border-gray-800 py-2 z-20">
                {initialColumns.map((col) => (
                  <label key={col.key} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleCols.has(col.key)}
                      onChange={() => {
                        const next = new Set(visibleCols);
                        if (next.has(col.key)) next.delete(col.key);
                        else next.add(col.key);
                        setVisibleCols(next);
                      }}
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-300"
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selected.size > 0 && (
        <div className="px-4 py-2 bg-primary-50 dark:bg-primary-500/10 text-sm text-primary-700 dark:text-primary-400 border-b border-primary-100 dark:border-primary-500/20">
          Đã chọn {selected.size} mục
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              {selectable && (
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={paginated.length > 0 && selected.size === paginated.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-300"
                    aria-label="Chọn tất cả"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                    col.sortable && 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none',
                    col.className
                  )}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key && (
                      <span className="text-primary-500">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </span>
                </th>
              ))}
              {rowActions && rowActions.length > 0 && (
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Thao tác
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}>
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              paginated.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition"
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(row.id)}
                        onChange={() => toggleSelect(row.id)}
                        className="rounded border-gray-300 text-primary-500 focus:ring-primary-300"
                        aria-label={`Chọn ${row.id}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={cn('px-4 py-3 text-gray-700 dark:text-gray-300', col.className)}>
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                  {rowActions && rowActions.length > 0 && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {rowActions.map((action, i) => {
                          const Icon = action.icon ? actionIcons[action.icon] : null;
                          return (
                            <button
                              key={i}
                              type="button"
                              title={action.label}
                              onClick={() => action.onClick(row)}
                              className={cn(
                                'inline-flex items-center justify-center size-8 rounded-lg transition',
                                action.variant === 'danger'
                                  ? 'text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10'
                                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white'
                              )}
                            >
                              {Icon && <Icon size={16} />}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
        {paginated.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          paginated.map((row) => (
            <div key={row.id} className="p-4 space-y-2">
              {selectable && (
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => toggleSelect(row.id)}
                  className="rounded border-gray-300 text-primary-500"
                />
              )}
              {columns.map((col) => (
                <div key={col.key} className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 shrink-0">{col.label}</span>
                  <span className="text-gray-900 dark:text-white text-right">
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </span>
                </div>
              ))}
              {rowActions && (
                <div className="flex gap-2 pt-2">
                  {rowActions.map((action, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => action.onClick(row)}
                      className="flex-1 h-11 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {filtered.length > pageSize && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status, map }: { status: string; map: Record<string, { label: string; className: string }> }) {
  const config = map[status] ?? { label: status, className: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400' };
  return (
    <span className={cn('inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium', config.className)}>
      {config.label}
    </span>
  );
}
