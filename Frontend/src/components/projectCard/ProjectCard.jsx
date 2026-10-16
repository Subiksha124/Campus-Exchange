import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ project }) {
  return (
    <div className="projectCard">
      <img src={project.img} alt="" />
      <div className="info">
        <img src={project.pp} alt="" />
        <div className="texts">
          <h2>{project.cat}</h2>
          <span>{project.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;