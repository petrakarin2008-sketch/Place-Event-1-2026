
const CardDetailsSkeleton = () => {
  return (
    <main className="travel-detail wrapper">
      <section className="container_info">
        <header className="trip-info">
          {/* Скелетон для заголовка */}
          <div className="skeleton skeleton-title"></div>
          <div className="info-pills">
            {/* Скелетон для локации */}
            <div className="skeleton skeleton-pills"></div>
          </div>
        </header>

        <section className="gallery">
          {/* Скелетон для большого изображения */}
          <div className="skeleton skeleton-gallery"></div>
        </section>

        <section className="meta-row">
          <div className="chip-list">
            {/* Скелетон для чипсов (категорий) */}
            <div className="skeleton skeleton-chips"></div>
          </div>
        </section>

        <div className="event-info-grid">
          {/* Скелетон для блока с датой/календарем */}
          <div className="skeleton skeleton-info-item"></div>

          {/* Скелетон для блока погоды (если он загружается отдельно) */}
          <div className="skeleton skeleton-info-item"></div>

          <div className="event-description">
            <h3>About Event</h3>
            {/* Скелетон для текста описания */}
            <div className="skeleton skeleton-description"></div>
          </div>

          {/* Скелетон для кнопки */}
          <div className="skeleton skeleton-button"></div>
        </div>
      </section>
    </main>
  );
};

export default CardDetailsSkeleton;