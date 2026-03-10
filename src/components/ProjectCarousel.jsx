
import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useProjects } from "./useProjects";
import "./ProjectCarousel.css";


function AddProjectModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);
  const [error, setError] = useState("");
  const fileRef = useRef();

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgPreview(ev.target.result);
      setImgBase64(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit() {
    if (!name.trim()) return setError("Informe o nome do projeto.");
    if (!desc.trim()) return setError("Informe a descrição.");
    if (!imgBase64) return setError("Adicione uma foto.");
    setError("");
    onAdd({ title: name.trim(), description: desc.trim(), img: imgBase64 });
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">Novo Projeto</h2>

        <label>Nome do projeto</label>
        <input
          placeholder="Ex: Portfolio v2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Descrição</label>
        <textarea
          rows={3}
          placeholder="Descreva brevemente o projeto..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <label>Foto do projeto</label>
        <div
          className={`dropzone ${imgPreview ? "filled" : ""}`}
          onClick={() => fileRef.current.click()}
        >
          {imgPreview
            ? <img src={imgPreview} alt="preview" />
            : <span>Clique para selecionar uma imagem</span>
          }
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFile}
          />
        </div>

        {error && <p className="modal-error">{error}</p>}

        <button className="modal-submit" onClick={handleSubmit}>
          + Adicionar projeto
        </button>
      </div>
    </div>
  );
}


export default function ProjectCarousel() {
  const { projects, addProject } = useProjects();
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    setShowModal(false);
    setTimeout(() => emblaApi?.scrollTo(projects.length), 100);
  }

  return (
    <div className="page">
      {}
      <div className="carousel-wrapper">
        <button className="arrow" onClick={() => emblaApi?.scrollPrev()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div ref={emblaRef} className="viewport">
          <div className="track">
            {projects.map((p, i) => (
              <div key={p.id} className="slide">
                <div className={`card ${i === selectedIndex ? "center" : "side"}`}>
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

            {}
            <div className="slide">
              <div
                className={`add-card ${selectedIndex === projects.length ? "center" : "side"}`}
                onClick={() => setShowModal(true)}
              >
                <span className="plus-icon">+</span>
                <span className="add-label">Adicionar projeto</span>
              </div>
            </div>
          </div>
        </div>

        <button className="arrow" onClick={() => emblaApi?.scrollNext()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {}
      <div className="dots">
        {Array.from({ length: projects.length + 1 }).map((_, i) => (
          <button
            key={i}
            className={`dot ${i === selectedIndex ? "active" : ""}`}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>

      {}
      {showModal && (
        <AddProjectModal
          onAdd={handleAddProject}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}