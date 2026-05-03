import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useProjects } from "./useProjects";
import "./ProjectCarousel.css";

function AddProjectModal({ onAdd, onUpdate, onClose, editingProject }) {
  const [name, setName] = useState(editingProject ? editingProject.title : "");
  const [desc, setDesc] = useState(
    editingProject ? editingProject.description : "",
  );
  const [imgPreview, setImgPreview] = useState(
    editingProject ? editingProject.img : null,
  );
  const [imgFile, setImgFile] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef();

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    if (!name.trim()) return setError("Informe o nome do projeto.");
    if (!desc.trim()) return setError("Informe a descrição.");
    if (!imgPreview) return setError("Adicione uma foto.");

    setError("");
    setIsUploading(true);

    try {
      let finalImgUrl = imgPreview;

      if (imgFile) {
        const formData = new FormData();
        formData.append("image", imgFile);
        const API_KEY = "9b8d5791f07670c3d67f9aa66c8a8115";
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${API_KEY}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await response.json();
        if (data.success) {
          finalImgUrl = data.data.url;
        } else {
          throw new Error("Erro no upload");
        }
      }

      const projectData = {
        title: name.trim(),
        description: desc.trim(),
        img: finalImgUrl,
      };

      if (editingProject) {
        onUpdate(editingProject.id, projectData);
      } else {
        onAdd(projectData);
      }
    } catch (err) {
      setError("Erro ao salvar projeto.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          disabled={isUploading}
        >
          ✕
        </button>
        <h2 className="modal-title">
          {editingProject ? "Editar Projeto" : "Novo Projeto"}
        </h2>

        <label>Nome do projeto</label>
        <input
          placeholder="Ex: Portfolio v2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isUploading}
        />

        <label>Descrição</label>
        <textarea
          rows={3}
          placeholder="Descreva brevemente o projeto..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          disabled={isUploading}
        />

        <label>Foto do projeto</label>
        <div
          className={`dropzone ${imgPreview ? "filled" : ""}`}
          onClick={() => !isUploading && fileRef.current.click()}
          style={{
            opacity: isUploading ? 0.5 : 1,
            cursor: isUploading ? "not-allowed" : "pointer",
          }}
        >
          {imgPreview ? (
            <img src={imgPreview} alt="preview" />
          ) : (
            <span>Clique para selecionar uma imagem</span>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFile}
            disabled={isUploading}
          />
        </div>

        {error && <p className="modal-error">{error}</p>}

        <button
          className="modal-submit"
          onClick={handleSubmit}
          disabled={isUploading}
        >
          {isUploading
            ? "Salvando..."
            : editingProject
              ? "Salvar Alterações"
              : "+ Adicionar projeto"}
        </button>
      </div>
    </div>
  );
}

export default function ProjectCarousel() {
  const { projects, addProject, deleteProject, updateProject } = useProjects();
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editingProject, setEditingProject] = useState(null);
  const isAdmin = window.location.search.includes("admin=DW2ADM");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [projects, emblaApi]);

  function handleAddProject(newProject) {
    addProject(newProject);
    handleCloseModal();
    setTimeout(() => emblaApi?.scrollTo(projects.length), 100);
  }

  function handleUpdateProject(id, updatedData) {
    updateProject(id, updatedData);
    handleCloseModal();
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingProject(null);
  }

  const totalSlides = isAdmin ? projects.length + 1 : projects.length;

  return (
    <div className="page">
      <div className="carousel-wrapper">
        <button className="arrow" onClick={() => emblaApi?.scrollPrev()}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div ref={emblaRef} className="viewport">
          <div className="track">
            {projects.map((p, i) => (
              <div key={p.id} className="slide">
                <div
                  className={`card ${i === selectedIndex ? "center" : "side"}`}
                >
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setShowModal(true);
                        }}
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "46px",
                          zIndex: 10,
                          background: "rgba(20, 20, 20, 0.6)",
                          backdropFilter: "blur(4px)",
                          color: "#fff",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          width: "28px",
                          height: "28px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                        }}
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Deseja apagar "${p.title}"?`))
                            deleteProject(p.id);
                        }}
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          zIndex: 10,
                          background: "rgba(20, 20, 20, 0.6)",
                          backdropFilter: "blur(4px)",
                          color: "#fff",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          width: "28px",
                          height: "28px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(255, 68, 68, 0.8)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(20, 20, 20, 0.6)")
                        }
                      >
                        ✕
                      </button>
                    </>
                  )}
                  <div className="card-img-box">
                    <img src={p.img} alt={p.title} />
                  </div>
                  <div className="card-info">
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-desc">{p.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {isAdmin && (
              <div className="slide">
                <div
                  className={`add-card ${selectedIndex === projects.length ? "center" : "side"}`}
                  onClick={() => setShowModal(true)}
                >
                  <span className="plus-icon">+</span>
                  <span className="add-label">Adicionar projeto</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="arrow" onClick={() => emblaApi?.scrollNext()}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            className={`dot ${i === selectedIndex ? "active" : ""}`}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>

      {showModal && (
        <AddProjectModal
          onAdd={handleAddProject}
          onUpdate={handleUpdateProject}
          onClose={handleCloseModal}
          editingProject={editingProject}
        />
      )}
    </div>
  );
}
