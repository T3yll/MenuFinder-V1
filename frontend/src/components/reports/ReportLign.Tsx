import React from 'react';
import { FullReport, Report } from '../../types/Report';
import { Tab, TableCell, TableRow } from '@mui/material';
import { Button } from 'antd';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ReportService } from '../../services/report.service';


interface ReportLignProps {
    report: FullReport
    onDelete: (id: number) => void;
}

const ReportLign: React.FC<ReportLignProps> = ({ report, onDelete }) => {

    const onClickHandle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onDelete(report.id);
    }

    return (
        <TableRow key={report.id}>
            <TableCell>{report.id}</TableCell>
            <TableCell>{report.user.username} <br /> <small>{report.user.email}</small></TableCell>
            <TableCell>{report.restaurant.name}</TableCell>
            <TableCell>{report.motif}</TableCell>
            <TableCell>{report.description}</TableCell>
            <TableCell>{new Date(report.createdAt).toLocaleString()}</TableCell>
            <TableCell>
                <Button onClick={onClickHandle} danger>
                    <FaTrash />
                </Button>
                <Button style={{ marginLeft: '8px' }}>
                    <Link to={`/restaurants/${report.restaurantId}`}>
                        <FaEye />
                    </Link>
                </Button>
            </TableCell>
        </TableRow>
    )
};

export default ReportLign;
