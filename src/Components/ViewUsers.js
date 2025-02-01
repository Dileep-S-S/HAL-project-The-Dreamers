import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Modal, Button, Form } from "react-bootstrap"; // Bootstrap for modal
import "../Styles/ViewUsers.css"; 

const ViewUsers = () => {
  const [laborers, setLaborers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLaborer, setSelectedLaborer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hireStatus, setHireStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/getusers")
      .then((response) => {
        setLaborers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching laborers:", error);
      });
  }, []);

  // Filter laborers based on both name and skills
  const filteredLaborers = laborers.filter((laborer) =>
    laborer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    laborer.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open Modal with selected laborer data
  const handleShowModal = (laborer) => {
    setSelectedLaborer(laborer);
    setShowModal(true);
    setHireStatus(""); // Reset selection when opening modal
  };

  // Close Modal (only if selection is made)
  const handleCloseModal = () => {
    if (hireStatus) {
      setShowModal(false);
      setSelectedLaborer(null);
    }
  };

  return (
    <div className="laborer-container">
      <h2 className="title">Labor</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search laborer by name or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="search-icon" />
      </div>

      {/* Laborer List */}
      <div className="laborer-list">
        {filteredLaborers.length > 0 ? (
          filteredLaborers.map((laborer) => (
            <div
              key={laborer.id}
              className="laborer-card"
              onClick={() => handleShowModal(laborer)}
            >
              <span>{laborer.name}</span>
              <span className="online-text fw-5">Online</span>
            </div>
          ))
        ) : (
          <p className="no-results">No laborers found</p>
        )}
      </div>

      {/* Modal Popup */}
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

            {/* Hire Confirmation */}
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
              disabled={!hireStatus} // Disable if no selection
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
