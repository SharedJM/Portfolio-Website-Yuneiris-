import React, { useState } from 'react';
import { portfolioData } from '../../data';
import './Projects.css';
import { theme } from '../../theme';
import trackEvent from '../../utils/analytics';
import ModalWindow from '../ModalWindow/ModalWindow';

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsPerPage = 3;

  const titleStyle = {
    fontWeight: 'bold',
  };

  const descriptionStyle = {
    backgroundColor: theme.colors.bubbleBlue,
    borderRadius: '20px',
    padding: '15px',
    paddingTop: '5px',
    color: theme.colors.white,
    textAlign: 'left',
  };

  const totalPages = Math.ceil(portfolioData.projects.projects.length / projectsPerPage);

  const handleNextPage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevPage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
      setIsTransitioning(false);
    }, 300);
  };

  const handleShowModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const startIndex = currentPage * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  let currentProjects = portfolioData.projects.projects.slice(startIndex, endIndex);

  if (currentProjects.length < projectsPerPage) {
    const placeholders = Array(projectsPerPage - currentProjects.length).fill(null);
    currentProjects = [...currentProjects, ...placeholders];
  }

  return (
    <div className="projects-container" id="projects" data-testid="projects-section">
      <h1 className="projects-heading section-title-bubble">{portfolioData.projects.title}</h1>
      <div className="projects-grid-container">
        <div className={`projects-grid ${isTransitioning ? 'transitioning' : ''}`}>
          {currentProjects.map((project, index) => (
            project ? (
              <div className="project-card" key={index} onClick={() => handleShowModal(project)}>
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                </div>
                <h1 style={titleStyle}>{project.title}</h1>
                <p style={descriptionStyle}>{project.description}</p>
              </div>
            ) : (
              <div className="project-card-placeholder" key={index}></div>
            )
          ))}
        </div>
      </div>
      <div className="pagination-container">
        <button onClick={handlePrevPage} disabled={currentPage === 0} className="pagination-button">{'<'}</button>
        <span className="page-indicator">{`Page ${currentPage + 1} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="pagination-button">{'>'}</button>
      </div>

      <ModalWindow show={showModal} handleClose={handleCloseModal} title={selectedProject ? selectedProject.title : ''}>
        {selectedProject && (
          <div>
            <p>{selectedProject.description}</p>
            <div className="modal-project-links" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
              <a
                href={selectedProject.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.stopPropagation(); trackEvent('Project Demo Click', { project: selectedProject.title }); }}
                style={{
                  textDecoration: 'none',
                  margin: '0 0.625rem',
                  fontWeight: 'normal',
                  display: 'inline-block',
                  backgroundColor: '#E91E63',
                  color: '#fff',
                  padding: '0.3125rem 1.25rem',
                  borderRadius: '1.25rem',
                  border: '1px solid #E91E63',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
              >
                {selectedProject.liveDemoText}
              </a>
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.stopPropagation(); trackEvent('Project GitHub Click', { project: selectedProject.title }); }}
                style={{
                  textDecoration: 'none',
                  margin: '0 0.625rem',
                  fontWeight: 'normal',
                  display: 'inline-block',
                  backgroundColor: '#E91E63',
                  color: '#fff',
                  padding: '0.3125rem 1.25rem',
                  borderRadius: '1.25rem',
                  border: '1px solid #E91E63',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
              >
                {selectedProject.githubText}
              </a>
            </div>
          </div>
        )}
      </ModalWindow>
    </div>
  );
};

export default Projects;