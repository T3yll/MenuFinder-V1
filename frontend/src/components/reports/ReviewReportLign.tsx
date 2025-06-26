import React, { useState } from 'react';
import {
  TableCell,
  TableRow,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { FaEye, FaCheck, FaTimes, FaClock, FaFlag } from 'react-icons/fa';
import {
  ReviewReport,
  updateReportStatus,
} from '../../services/reviewReport.service';

interface ReviewReportLignProps {
  report: ReviewReport;
  onStatusChange: () => void;
}

const ReviewReportLign: React.FC<ReviewReportLignProps> = ({
  report,
  onStatusChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleStatusChange = async (
    newStatus: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
  ) => {
    try {
      setLoading(true);
      await updateReportStatus(report.report_id, newStatus);
      onStatusChange();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (
    status: string
  ): 'warning' | 'info' | 'success' | 'error' => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'reviewed':
        return 'info';
      case 'resolved':
        return 'success';
      case 'dismissed':
        return 'error';
      default:
        return 'info';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'reviewed':
        return 'Examiné';
      case 'resolved':
        return 'Résolu';
      case 'dismissed':
        return 'Rejeté';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FaClock />;
      case 'reviewed':
        return <FaEye />;
      case 'resolved':
        return <FaCheck />;
      case 'dismissed':
        return <FaTimes />;
      default:
        return <FaFlag />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <TableRow key={report.report_id}>
        <TableCell>{report.report_id}</TableCell>
        <TableCell>
          <div>
            <strong>ID: {report.review_id}</strong>
            {report.review && (
              <div style={{ marginTop: '4px' }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    maxWidth: '300px',
                  }}
                >
                  {report.review.text}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Par:{' '}
                  {report.review.user
                    ? `${report.review.user.prenom} ${report.review.user.nom}`
                    : 'Utilisateur inconnu'}
                </Typography>
              </div>
            )}
          </div>
        </TableCell>
        <TableCell>
          {report.reporter
            ? `${report.reporter.prenom} ${report.reporter.nom}`
            : `Utilisateur ${report.reporter_user_id}`}
        </TableCell>
        <TableCell>{formatDate(report.reported_at)}</TableCell>
        <TableCell>
          <Chip
            icon={getStatusIcon(report.status)}
            label={getStatusText(report.status)}
            color={getStatusColor(report.status)}
            size="small"
          />
        </TableCell>
        <TableCell>
          <Select
            value={report.status}
            onChange={(e) => handleStatusChange(e.target.value as any)}
            size="small"
            disabled={loading}
            sx={{ minWidth: 120, marginRight: 1 }}
          >
            <MenuItem value="pending">En attente</MenuItem>
            <MenuItem value="reviewed">Examiné</MenuItem>
            <MenuItem value="resolved">Résolu</MenuItem>
            <MenuItem value="dismissed">Rejeté</MenuItem>
          </Select>
          <IconButton onClick={() => setModalOpen(true)} color="primary">
            <FaEye />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <FaFlag />
            Détails du signalement #{report.report_id}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Informations du signalement
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography>
                <strong>ID:</strong> {report.report_id}
              </Typography>
              <Typography>
                <strong>Statut:</strong>
                <Chip
                  icon={getStatusIcon(report.status)}
                  label={getStatusText(report.status)}
                  color={getStatusColor(report.status)}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
              <Typography>
                <strong>Date de signalement:</strong>{' '}
                {formatDate(report.reported_at)}
              </Typography>
              <Typography>
                <strong>Dernière mise à jour:</strong>{' '}
                {formatDate(report.updated_at)}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Avis signalé
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography>
                <strong>ID de l'avis:</strong> {report.review_id}
              </Typography>
              {report.review && (
                <Box>
                  <Typography>
                    <strong>Contenu:</strong>
                  </Typography>
                  <Box
                    sx={{
                      background: '#f5f5f5',
                      padding: 2,
                      borderRadius: 1,
                      marginY: 1,
                    }}
                  >
                    <Typography>{report.review.text}</Typography>
                  </Box>
                  <Typography>
                    <strong>Note:</strong> {report.review.rating}/5 ⭐
                  </Typography>
                  <Typography>
                    <strong>Auteur:</strong>{' '}
                    {report.review.user
                      ? `${report.review.user.prenom} ${report.review.user.nom}`
                      : 'Utilisateur inconnu'}
                  </Typography>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Signalé par
            </Typography>
            <Typography>
              <strong>Utilisateur:</strong>{' '}
              {report.reporter
                ? `${report.reporter.prenom} ${report.reporter.nom} (${report.reporter.username})`
                : `ID: ${report.reporter_user_id}`}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewReportLign;
