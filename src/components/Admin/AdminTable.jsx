import React from "react";
import "./AdminTable.scss";


export default function AdminTable({
  columns = [],
  data = [],
  getRowKey = (row) => row.id || row._id,
  renderActions
}) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={col.width ? { width: col.width } : undefined}
            >
              {col.label}
            </th>
          ))}
          {renderActions && <th style={{ width: 160 }}>Действия</th>}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 && (
          <tr>
            <td
              colSpan={columns.length + (renderActions ? 1 : 0)}
              style={{ textAlign: "center", padding: "16px 0", color: "#9ca3af" }}
            >
              Нет данных для отображения
            </td>
          </tr>
        )}

        {data.map((row) => (
          <tr key={getRowKey(row)}>
            {columns.map((col) => (
              <td key={col.key}>
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}

            {renderActions && (
              <td>
                <div className="admin-table__actions">
                  {renderActions(row)}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
