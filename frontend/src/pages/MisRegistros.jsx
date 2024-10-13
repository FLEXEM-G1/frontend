import React, { useState } from 'react';
import './MisRegistros.css';

const records = [
    { id: 1, monto: 1000, tasaInteres: 5, banco: 'Banco A', fechaVencimiento: '2023-12-01', status: 'Pendiente' },
    { id: 2, monto: 2000, tasaInteres: 4.5, banco: 'Banco B', fechaVencimiento: '2024-01-15', status: 'Pagado' },
    { id: 3, monto: 1500, tasaInteres: 6, banco: 'Banco C', fechaVencimiento: '2023-11-20', status: 'Vencido' },
];

const MisRegistros = () => {
    const [visibleRecordId, setVisibleRecordId] = useState(null);

    const toggleVisibility = (id) => {
        setVisibleRecordId(visibleRecordId === id ? null : id);
    };

    return (
        <div className="mis-registros-container">
            <div className="records-container">
                {records.map(record => (
                    <div key={record.id} className={`record ${record.status.toLowerCase()}`} onClick={() => toggleVisibility(record.id)}>
                        <div className="record-summary">
                            <p>Registro {record.id}</p>
                        </div>
                        {visibleRecordId === record.id && (
                            <div className="record-details">
                                <p>Monto: {record.monto}</p>
                                <p>Tasa de Interés: {record.tasaInteres}%</p>
                                <p>Banco Asociado: {record.banco}</p>
                                <p>Fecha de Vencimiento: {record.fechaVencimiento}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="filter-box">
                <h3>Filtros</h3>
                <p><span className="pendiente">Pendiente</span></p>
                <p><span className="pagado">Pagado</span></p>
                <p><span className="vencido">Vencido</span></p>
            </div>
        </div>
    );
};

export default MisRegistros;