import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Modal, Button, Form } from "react-bootstrap";
import { Usercontext } from '../UserContext';
import "../Styles/ViewUsers.css";

const ViewUsers = () => {
  const [laborers, setLaborers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLaborer, setSelectedLaborer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hireStatus, setHireStatus] = useState("");
  const { user } = useContext(Usercontext);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Get live location
  useEffect(() => {
     if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition((position) => {
         setLatitude(position.coords.latitude);
         setLongitude(position.coords.longitude);
       });
     }
   }, []);

  // Fetch nearby laborers when location is set
  useEffect(() => {
    if (latitude && longitude) {
      axios
        .post("http://localhost:8080/getbydistance", {
          latitude: latitude,
          longitude: longitude,
        })
        .then((response) => {
          setLaborers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching nearby laborers:", error);
        });
    }
  }, [latitude, longitude]); // Run when latitude & longitude change

  // Filter laborers based on name, skills, and online status
  const filteredLaborers = laborers.filter((laborer) =>
    (laborer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    laborer.skills.toLowerCase().includes(searchTerm.toLowerCase())) &&
    laborer.status === 'online'  // Only show online laborers
  );

  // Open modal with selected laborer details
  const handleShowModal = (laborer) => {
    setSelectedLaborer(laborer);
    setShowModal(true);
    setHireStatus("");
  };

  // Close modal and update status if hired
  const handleCloseModal = async () => {
    if (hireStatus) {
      // If hired, update laborer status to offline
      if (hireStatus === "hired" && selectedLaborer) {
        try {
          await axios.put(`http://localhost:8080/putuser/${selectedLaborer.id}`, {
            ...selectedLaborer,
            status: "offline",  // Set status to offline
          });
          alert("Laborer's status updated to offline");
        } catch (error) {
          console.error("Error updating status:", error);
        }
      }
      setShowModal(false);
      setSelectedLaborer(null);
    }
  };

  return (
    <div className="laborer-container">
      <h2 className="title">Nearby Laborers</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search laborer by name or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="search-icon" />
      </div>

      <div className="laborer-list">
        {filteredLaborers.length > 0 ? (
          filteredLaborers.map((laborer) => (
            <div
              key={laborer.id}
              className="laborer-card"
              onClick={() => handleShowModal(laborer)}
            >
              <span>{laborer.name}</span>
              <button className="btn btn-success p-2">Online</button>
            </div>
          ))
        ) : (
          <p className="no-results">No nearby laborers found</p>
        )}
      </div>

      {selectedLaborer && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton={!!hireStatus}>
            <Modal.Title>{selectedLaborer.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {selectedLaborer.photo && (
              <img
                src={selectedLaborer.photo}
                alt={selectedLaborer.name}
                className="laborer-photo"
              />
            )}
            <p><strong>Experience:</strong> {selectedLaborer.experience} years</p>
            <p><strong>Contact:</strong> {selectedLaborer.phone}</p>
            <p><strong>Skills:</strong> {selectedLaborer.skills}</p>

            <Form>
              <Form.Label><strong>Have you hired this worker?</strong></Form.Label>
              <div className="hire-options">
                <Form.Check
                  type="radio"
                  label="Hired"
                  name="hireStatus"
                  value="hired"
                  onChange={(e) => setHireStatus(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Not Hired"
                  name="hireStatus"
                  value="not_hired"
                  onChange={(e) => setHireStatus(e.target.value)}
                />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              disabled={!hireStatus}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ViewUsers;
