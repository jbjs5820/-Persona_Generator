import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './Reports.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const Reports = ({ personas }) => {
  if (!personas || personas.length === 0) {
    return <div>No personas data available</div>;
  }

  // Data processing functions
  const getDemographicData = () => {
    const ageGroups = {};
    personas.forEach(persona => {
      const age = persona.age;
      const group = Math.floor(age / 10) * 10;
      ageGroups[`${group}-${group + 9}`] = (ageGroups[`${group}-${group + 9}`] || 0) + 1;
    });
    return {
      labels: Object.keys(ageGroups),
      datasets: [{
        label: 'Age Distribution',
        data: Object.values(ageGroups),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }]
    };
  };

  const getAcceptanceRateData = () => {
    const acceptanceBySegment = {};
    personas.forEach(persona => {
      const segment = persona.segment || 'Unknown';
      if (!acceptanceBySegment[segment]) {
        acceptanceBySegment[segment] = { accepted: 0, total: 0 };
      }
      acceptanceBySegment[segment].total++;
      if (persona.accepted) {
        acceptanceBySegment[segment].accepted++;
      }
    });

    const segments = Object.keys(acceptanceBySegment);
    const rates = segments.map(segment => 
      (acceptanceBySegment[segment].accepted / acceptanceBySegment[segment].total) * 100
    );

    return {
      labels: segments,
      datasets: [{
        label: 'Acceptance Rate (%)',
        data: rates,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }]
    };
  };

  // PDF Document component
  const ReportDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Personas Analysis Report</Text>
          <Text style={styles.text}>Total Personas: {personas.length}</Text>
          <Text style={styles.text}>Average Age: {
            (personas.reduce((acc, p) => acc + p.age, 0) / personas.length).toFixed(1)
          }</Text>
          <Text style={styles.text}>
            Segments: {[...new Set(personas.map(p => p.segment))].join(', ')}
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="reports-container">
      <h2>Personas Analysis Report</h2>
      
      <div className="chart-container">
        <h3>Age Distribution</h3>
        <Bar data={getDemographicData()} />
      </div>

      <div className="chart-container">
        <h3>Acceptance Rates by Segment</h3>
        <Bar data={getAcceptanceRateData()} />
      </div>

      <div className="pdf-download">
        <PDFDownloadLink document={<ReportDocument />} fileName="personas-report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Generating PDF...' : 'Download Report PDF'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Reports;
