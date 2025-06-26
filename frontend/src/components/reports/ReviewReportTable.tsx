import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { FaSync } from 'react-icons/fa';
import ReviewReportLign from './ReviewReportLign';
import {
  ReviewReport,
  getAllReports,
} from '../../services/reviewReport.service';

const ReviewReportTable: React.FC = () => {
  const [reports, setReports] = useState<ReviewReport[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getAllReports();
      setReports(data);
    } catch (error) {
      console.error('Erreur lors du chargement des signalements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleStatusChange = () => {
    fetchReports(); // Recharger les données après un changement de statut
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" gutterBottom>
          Signalements d'avis
        </Typography>
        <Button
          variant="outlined"
          startIcon={loading ? <CircularProgress size={16} /> : <FaSync />}
          onClick={fetchReports}
          disabled={loading}
        >
          Actualiser
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Avis signalé</TableCell>
              <TableCell>Signalé par</TableCell>
              <TableCell>Date de signalement</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    py={3}
                  >
                    <CircularProgress />
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      Chargement des signalements...
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="textSecondary" py={3}>
                    Aucun signalement d'avis trouvé
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <ReviewReportLign
                  key={report.report_id}
                  report={report}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReviewReportTable;
