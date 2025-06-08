import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";
import ReportLign from "./ReportLign";
import { useReports } from "../../hooks/useReports";
import { ReportService } from "../../services/report.service";

const ReportTable: React.FC = () => {
    const { reports,setReports } = useReports();

     const DeleteReport = (id:number) => {
                try {
                    ReportService.remove(id);
                    // Optionally, you can update the state to remove the report from the list
                } catch (error) {
                    console.error("Error deleting report:", error);
                }
                setReports(reports.filter(report => report.id !== id));
            }

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Signalements des utilisateurs
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Utilisateur</TableCell>
                            <TableCell>Restaurant</TableCell>
                            <TableCell>Motif</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date de création</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report) => (
                            <ReportLign onDelete={() => DeleteReport(report.id)} report={report} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ReportTable;
