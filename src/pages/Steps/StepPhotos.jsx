import "../../pages/CreateListingPage/CreateListingPage.scss"


export default function StepPhotos({ next, prev, images, setImages }) {

    const upload = (e) => {
      const files = Array.from(e.target.files);
      setImages([...images, ...files]);
    };
  
    return (
      <div className="step-card">
        <h2 className="title">Фотографии</h2>
  
        <label className="upload-btn">
          Загрузить фото
          <input type="file" multiple onChange={upload} hidden />
        </label>
  
        <div className="photo-preview">
          {images.map((img, i) => (
            <img key={i} src={URL.createObjectURL(img)} alt="car" />
          ))}
        </div>
  
        <div className="nav-buttons">
          <button onClick={prev}>← Назад</button>
          <button onClick={next} className="next-btn">Продолжить →</button>
        </div>
      </div>
    );
  }
  