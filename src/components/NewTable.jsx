import React, { useEffect, useMemo, useRef, useState } from "react";
import { Table } from "antd";
import { createStyles } from "antd-style";

const NewTable = ({
    columns,
    dataSource,
    tableId = "",
    enableResize = true,
    minColPx = 80,
    onRow,
}) => {
    const useStyle = createStyles(({ css, token }) => {
        const { antCls } = token;
        return {
            customTable: css`
        ${antCls}-table {
          ${antCls}-table-container {
            ${antCls}-table-body,
            ${antCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: #eaeaea transparent;
              scrollbar-gutter: stable;
            }
          }
          ${antCls}-table-thead > tr > th {
            padding-left: 12px;
            padding-right: 0; 
          }
        }
        .custom-table-row:hover > td {
          background-color: var(--hover) !important;
        }
      `,
            resizer: css`
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 2px;
        cursor: col-resize;
        user-select: none;
        background: var(--border);
        border-radius: 50px;
      `,
            titleWrap: css`
        position: relative;

      `,
        };
    });

    const containerRef = useRef(null);
    const [colWidths, setColWidths] = useState({});

    // Load persisted widths
    useEffect(() => {
        if (!enableResize) return;
        if (!tableId) return;
        try {
            const saved = localStorage.getItem(`table-widths:${tableId}`);
            if (saved) setColWidths(JSON.parse(saved));
        } catch { /* ignore */ }
    }, [tableId, enableResize]);

    // Save widths
    useEffect(() => {
        if (!enableResize) return;
        if (!tableId) return;
        try {
            localStorage.setItem(`table-widths:${tableId}`, JSON.stringify(colWidths));
        } catch { /* ignore */ }
    }, [colWidths, tableId, enableResize]);

    // Compute initial widths from provided column.width when missing
    useEffect(() => {
        if (!enableResize) return;
        const containerWidth = containerRef.current?.offsetWidth || 1000;
        const next = { ...colWidths };

        columns.forEach((c) => {
            const id = c.key ?? (typeof c.dataIndex === "string" ? c.dataIndex : String(c.dataIndex));
            if (!id) return;
            if (next[id]) return;

            const w = c.width;
            let calculatedWidth = 20;

            if (typeof w === "number") {
                calculatedWidth = w;
            } else if (typeof w === "string" && w.endsWith("%")) {
                const pct = parseFloat(w);
                if (!isNaN(pct)) {
                    calculatedWidth = Math.round((pct / 100) * containerWidth);
                }
            }

            // Always apply minimum width
            if (calculatedWidth) {
                next[id] = Math.max(minColPx, calculatedWidth);
            }
        });

        setColWidths(next);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns, enableResize]);

    // Visible resizer handle and mouse handlers
    const onMouseDownFactory = React.useCallback(
        (id) => (e) => {
            e.preventDefault();
            e.stopPropagation();
            const startX = e.clientX;
            const startWidth = colWidths[id] ?? 120;
            const onMove = (me) => {
                const delta = me.clientX - startX;
                setColWidths((prev) => ({ ...prev, [id]: Math.max(minColPx, startWidth + delta) }));
            };
            const onUp = () => {
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
        },
        [colWidths, minColPx]
    );

    const { styles } = useStyle();

    // Augment columns: inject width and a visible resizer into title
    const computedColumns = useMemo(() => {
        if (!enableResize) return columns;
        return columns.map((col) => {
            const id =
                col.key ?? (typeof col.dataIndex === "string" ? col.dataIndex : String(col.dataIndex));
            if (!id) return col;
            const nextTitle = (
                <div className={styles.titleWrap} onClick={(e) => e.stopPropagation()}>
                    {col.title}
                    <span className={styles.resizer} onMouseDown={onMouseDownFactory(id)} />
                </div>
            );
            const prevOnHeaderCell = col.onHeaderCell;
            const onHeaderCell = (node) => {
                const base = typeof prevOnHeaderCell === "function" ? prevOnHeaderCell(node) || {} : {};
                const baseStyle = base.style || {};
                return {
                    ...base,
                    style: {
                        ...baseStyle,
                        paddingRight: 0,
                        paddingInlineEnd: 0,
                        paddingLeft: 12,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    },
                };
            };
            const prevOnCell = col.onCell;
            const onCell = (record, rowIndex) => {
                const base = typeof prevOnCell === "function" ? prevOnCell(record, rowIndex) || {} : {};
                const baseStyle = base.style || {};
                return {
                    ...base,
                    style: {
                        ...baseStyle,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: colWidths[id] ?? col.width,
                        minWidth: minColPx,
                    },
                };
            };
            return {
                ...col,
                title: nextTitle,
                width: colWidths[id] ?? col.width,
                onHeaderCell,
                onCell,
                ellipsis: true,
            };
        });
    }, [columns, colWidths, enableResize, styles.resizer, styles.titleWrap, minColPx, onMouseDownFactory]);

    return (
        <div className="w-full max-w-full min-w-0 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div
                ref={containerRef}
                className={`rounded-lg h-fit pb-2 min-w-full ${dataSource.length === 0 ? "bottom-border-remove" : " "}`}
                style={{ minWidth: 600 }}
            >
                <Table
                    className={`${styles.customTable} !bg-[var(--card)]`}
                    columns={computedColumns}
                    scroll={{ x: 'max-content', y: "calc(100vh - 450px)" }}
                    dataSource={dataSource}
                    rowClassName={() => 'custom-table-row'}
                    sticky={true}
                    pagination={false}
                    bordered={false}
                    onRow={onRow}
                />
            </div>
        </div>
    );
};

export default NewTable;
