import React from 'react';
import Card from '../components/Card';

const Favourite = () => {
  return (
    <>
      <h1 className="title_coming" style={{marginBottom:'1rem'}}>Favourites</h1>
      <section className="recomend">
        <div className="card__el">
          <Card />
        </div>
      </section>
    </>
  );
};

export default Favourite;
