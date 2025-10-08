import React, { useState, useEffect } from 'react';
import { MapPin, TrendingDown, AlertTriangle, Upload, BarChart3, Leaf, Cloud, Info, Search, Filter, Download, Users, Satellite } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';

const TreaTroiderApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedZone, setSelectedZone] = useState(null);
  const [citizenReports, setCitizenReports] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);

  // Sample NDVI (Vegetation Index) trend data
  const ndviTrendData = [
    { month: 'Jan', zone1: 0.65, zone2: 0.72, zone3: 0.58, zone4: 0.68 },
    { month: 'Feb', zone1: 0.63, zone2: 0.70, zone3: 0.55, zone4: 0.66 },
    { month: 'Mar', zone1: 0.60, zone2: 0.68, zone3: 0.52, zone4: 0.64 },
    { month: 'Apr', zone1: 0.58, zone2: 0.65, zone3: 0.48, zone4: 0.61 },
    { month: 'May', zone1: 0.55, zone2: 0.62, zone3: 0.45, zone4: 0.58 },
    { month: 'Jun', zone1: 0.52, zone2: 0.59, zone3: 0.42, zone4: 0.55 }
  ];

  // Risk zones data
  const riskZones = [
    { id: 1, name: 'Downtown Core', risk: 'High', ndvi: 0.52, aqi: 145, treeCount: 1200, predicted_loss: 18 },
    { id: 2, name: 'East Industrial', risk: 'Critical', ndvi: 0.42, aqi: 178, treeCount: 850, predicted_loss: 28 },
    { id: 3, name: 'North Suburbs', risk: 'Medium', ndvi: 0.59, aqi: 98, treeCount: 3400, predicted_loss: 8 },
    { id: 4, name: 'West Park Area', risk: 'Low', ndvi: 0.68, aqi: 75, treeCount: 5200, predicted_loss: 4 }
  ];

  // Environmental correlation data
  const correlationData = [
    { factor: 'AQI', impact: 85, color: '#ef4444' },
    { factor: 'Temperature', impact: 72, color: '#f97316' },
    { factor: 'Urban Expansion', impact: 68, color: '#eab308' },
    { factor: 'Rainfall', impact: -45, color: '#3b82f6' },
    { factor: 'Soil Quality', impact: -38, color: '#10b981' }
  ];

  // Citizen reports data
  const reportData = [
    { id: 1, zone: 'Downtown Core', type: 'Tree Removal', date: '2025-10-01', status: 'Verified' },
    { id: 2, zone: 'East Industrial', type: 'Disease Spotted', date: '2025-10-03', status: 'Investigating' },
    { id: 3, zone: 'North Suburbs', type: 'Healthy Growth', date: '2025-10-05', status: 'Verified' },
    { id: 4, zone: 'East Industrial', type: 'Tree Cutting', date: '2025-10-07', status: 'Verified' }
  ];

  // Model performance metrics
  const modelMetrics = {
    accuracy: 87.3,
    precision: 84.6,
    recall: 89.2,
    f1Score: 86.8
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Zones</p>
              <p className="text-3xl font-bold mt-1">24</p>
            </div>
            <MapPin className="w-12 h-12 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Critical Zones</p>
              <p className="text-3xl font-bold mt-1">3</p>
            </div>
            <AlertTriangle className="w-12 h-12 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Trees Monitored</p>
              <p className="text-3xl font-bold mt-1">12.4K</p>
            </div>
            <Leaf className="w-12 h-12 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Citizen Reports</p>
              <p className="text-3xl font-bold mt-1">156</p>
            </div>
            <Users className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* NDVI Trend Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-blue-600" />
            NDVI Vegetation Index Trends
          </h3>
          <span className="text-sm text-gray-500">Last 6 months</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ndviTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0.4, 0.8]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="zone1" stroke="#3b82f6" name="Downtown Core" strokeWidth={2} />
            <Line type="monotone" dataKey="zone2" stroke="#ef4444" name="East Industrial" strokeWidth={2} />
            <Line type="monotone" dataKey="zone3" stroke="#10b981" name="North Suburbs" strokeWidth={2} />
            <Line type="monotone" dataKey="zone4" stroke="#f59e0b" name="West Park Area" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Zones Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          High-Risk Zones
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Zone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Risk Level</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">NDVI</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">AQI</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tree Count</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Predicted Loss</th>
              </tr>
            </thead>
            <tbody>
              {riskZones.map((zone) => (
                <tr key={zone.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{zone.name}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(zone.risk)}`}>
                      {zone.risk}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{zone.ndvi.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${zone.aqi > 150 ? 'text-red-600' : zone.aqi > 100 ? 'text-orange-600' : 'text-green-600'}`}>
                      {zone.aqi}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{zone.treeCount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-semibold ${zone.predicted_loss > 20 ? 'text-red-600' : zone.predicted_loss > 10 ? 'text-orange-600' : 'text-green-600'}`}>
                      {zone.predicted_loss}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AnalysisView = () => (
    <div className="space-y-6">
      {/* Model Performance */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          ML Model Performance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(modelMetrics).map(([key, value]) => (
            <div key={key} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-purple-700 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">{value}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Correlation */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-blue-600" />
          Environmental Factors Impact on Tree Loss
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={correlationData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[-50, 100]} />
            <YAxis dataKey="factor" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="impact" name="Impact Score">
              {correlationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-4 italic">Positive values indicate factors that increase tree loss; negative values indicate protective factors</p>
      </div>

      {/* Satellite Data Processing */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Satellite className="w-5 h-5 text-indigo-600" />
          Satellite Data Integration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-2">MODIS Terra</h4>
            <p className="text-sm text-gray-600">Vegetation indices (NDVI, EVI) at 250m resolution</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-700 font-medium">Active</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-2">Landsat 8/9</h4>
            <p className="text-sm text-gray-600">High-resolution multispectral imagery at 30m</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-700 font-medium">Active</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-2">Sentinel-2</h4>
            <p className="text-sm text-gray-600">Cloud-free imagery with 5-day revisit time</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-700 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CitizenReportsView = () => (
    <div className="space-y-6">
      {/* Report Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" />
          Submit New Report
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input type="text" placeholder="Enter zone or address" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Tree Removal</option>
              <option>Disease Spotted</option>
              <option>Healthy Growth</option>
              <option>Other</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea placeholder="Describe your observation..." rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          <div className="md:col-span-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
              Submit Report
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          Recent Citizen Reports
        </h3>
        <div className="space-y-3">
          {reportData.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-800">{report.zone}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      report.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{report.type}</p>
                </div>
                <span className="text-xs text-gray-500">{report.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Statistics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Validation Rate</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-full" style={{width: '78%'}}></div>
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-800">78%</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">Citizen reports validated against satellite data</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <Leaf className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">TreaTroider Research</h1>
                <p className="text-green-100 text-sm">Urban Tree Loss Prediction Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'dashboard' 
                  ? 'border-green-600 text-green-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'analysis' 
                  ? 'border-green-600 text-green-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Analysis
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'reports' 
                  ? 'border-green-600 text-green-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Citizen Reports
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'analysis' && <AnalysisView />}
        {activeTab === 'reports' && <CitizenReportsView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2025 TreaTroider Research | NASA Space Apps Challenge</p>
            <div className="flex items-center gap-4">
              <span>Powered by Terra/MODIS Satellite Data</span>
              <span>•</span>
              <span>ML Model v2.1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TreaTroiderApp;