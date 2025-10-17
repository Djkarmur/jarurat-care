import React, { useState, useEffect } from 'react';
import { Search, X, Plus, User, Phone, Mail, MapPin, Calendar, Activity } from 'lucide-react';

// Mock patient data with detailed information
const mockPatients = [
  {
    id: 1,
    name: "Rajesh Kumar",
    age: 45,
    contact: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    address: "123 MG Road, Mumbai, Maharashtra",
    bloodGroup: "O+",
    lastVisit: "2024-10-10",
    condition: "Diabetes Type 2"
  },
  {
    id: 2,
    name: "Priya Sharma",
    age: 32,
    contact: "+91 87654 32109",
    email: "priya.sharma@email.com",
    address: "456 Park Street, Kolkata, West Bengal",
    bloodGroup: "A+",
    lastVisit: "2024-10-12",
    condition: "Hypertension"
  },
  {
    id: 3,
    name: "Amit Patel",
    age: 58,
    contact: "+91 76543 21098",
    email: "amit.patel@email.com",
    address: "789 CG Road, Ahmedabad, Gujarat",
    bloodGroup: "B+",
    lastVisit: "2024-10-08",
    condition: "Arthritis"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    age: 28,
    contact: "+91 65432 10987",
    email: "sneha.reddy@email.com",
    address: "321 Jubilee Hills, Hyderabad, Telangana",
    bloodGroup: "AB+",
    lastVisit: "2024-10-15",
    condition: "Asthma"
  },
  {
    id: 5,
    name: "Vikram Singh",
    age: 51,
    contact: "+91 54321 09876",
    email: "vikram.singh@email.com",
    address: "654 Connaught Place, New Delhi",
    bloodGroup: "O-",
    lastVisit: "2024-10-05",
    condition: "Heart Disease"
  },
  {
    id: 6,
    name: "Anjali Desai",
    age: 39,
    contact: "+91 43210 98765",
    email: "anjali.desai@email.com",
    address: "987 FC Road, Pune, Maharashtra",
    bloodGroup: "A-",
    lastVisit: "2024-10-14",
    condition: "Migraine"
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state for adding new patient
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    contact: '',
    email: '',
    address: '',
    bloodGroup: '',
    condition: ''
  });

  // API fetch
  useEffect(() => {
    if (currentPage === 'patients') {
      fetchPatients();
    }
  }, [currentPage]);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      // API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPatients(mockPatients);
    } catch (err) {
      setError('Failed to fetch patients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age || !newPatient.contact || !newPatient.email || !newPatient.address || !newPatient.bloodGroup || !newPatient.condition) {
      alert('Please fill all fields');
      return;
    }
    if(newPatient.contact.length !== 10){
      alert('Contact number must be 10 digits');
      return;
    }
    if(isNaN(newPatient.age) || parseInt(newPatient.age) <= 0){
      alert('Please enter a valid age');
      return;
    }
    if(!/\S+@\S+\.\S+/.test(newPatient.email)){
      alert('Please enter a valid email');
      return;
    }
    if(!/^\+91\s\d{10}$/.test(newPatient.contact)){
      alert('Contact number must be in the format +91 XXXXXXXXXX');
      return;
    }if(!/^[ABO]{1,2}[+-]$/.test(newPatient.bloodGroup)){
      alert('Please enter a valid blood group (e.g., A+, O-, AB+)');
      return;
    }
    const patient = {
      id: patients.length + 1,
      ...newPatient,
      age: parseInt(newPatient.age),
      lastVisit: new Date().toISOString().split('T')[0]
    };
    setPatients([...patients, patient]);
    setNewPatient({
      name: '',
      age: '',
      contact: '',
      email: '',
      address: '',
      bloodGroup: '',
      condition: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Jarurat Care</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`text-sm font-medium ${
                  currentPage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('patients')}
                className={`text-sm font-medium ${
                  currentPage === 'patients' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Patients
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className={`text-sm font-medium ${
                  currentPage === 'about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                About
              </button>
            </nav>
            <div className="md:hidden flex space-x-4">
              <button onClick={() => setCurrentPage('home')} className="text-gray-700">Home</button>
              <button onClick={() => setCurrentPage('patients')} className="text-gray-700">Patients</button>
              <button onClick={() => setCurrentPage('about')} className="text-gray-700">About</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Activity className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Jarurat Care</h2>
            <p className="text-xl text-gray-600 mb-8">Your trusted patient management system</p>
            <button
              onClick={() => setCurrentPage('patients')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              View Patients
            </button>
          </div>
        )}

        {currentPage === 'patients' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-3xl font-bold text-gray-900">Patient Records</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Add Patient</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search patients by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading patients...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Patient Cards Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <div key={patient.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{patient.name}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Age: {patient.age} years
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {patient.contact}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewDetails(patient)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No patients found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {currentPage === 'about' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Jarurat Care</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <p className="text-gray-700 mb-4">
                Jarurat Care is a modern patient management system designed to help healthcare providers efficiently manage and access patient records.
              </p>
              <p className="text-gray-700 mb-4">
                Our platform offers a streamlined interface for viewing patient information, searching records, and maintaining up-to-date medical data.
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Comprehensive patient record management</li>
                  <li>Quick search and filtering capabilities</li>
                  <li>Responsive design for all devices</li>
                  <li>Secure and user-friendly interface</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Patient Details Modal */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Patient Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 pb-4 border-b">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedPatient.name}</h4>
                    <p className="text-gray-600">Patient ID: #{selectedPatient.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="text-gray-900 font-medium">{selectedPatient.age} years</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Activity className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Blood Group</p>
                      <p className="text-gray-900 font-medium">{selectedPatient.bloodGroup}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="text-gray-900 font-medium">{selectedPatient.contact}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">{selectedPatient.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900 font-medium">{selectedPatient.address}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Medical Condition</p>
                  <p className="text-gray-900 font-medium">{selectedPatient.condition}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Last Visit</p>
                  <p className="text-gray-900 font-medium">{selectedPatient.lastVisit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Add New Patient</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <input
                      type="text"
                      value={newPatient.bloodGroup}
                      onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    maxLength={10}
                    minLength={10}
                    value={newPatient.contact}
                    onChange={(e) => setNewPatient({...newPatient, contact: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medical Condition</label>
                  <input
                    type="text"
                    value={newPatient.condition}
                    onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleAddPatient}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Add Patient
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;