import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgCa1 from '../image/ssNoteHome.png';
import imgCa2 from '../image/ssAccess.png';

function CarouselFadeExample() {
  return (
    <Carousel fade prevIcon={<i className="fa-solid fa-angle-left" style={{ color: 'black', fontSize: '30px' }}></i>} nextIcon={<i className="fa-solid fa-angle-right" style={{ color: 'black', fontSize: '30px' }}></i>}>
      <Carousel.Item>
        <img src={imgCa1} alt="First slide" className="img-fluid" style={{ maxWidth: '90%', maxHeight: '100%' }} />
        <Carousel.Caption>
          <h3>First slide label</h3>  
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={imgCa2} alt="Second slide" className="img-fluid" style={{ maxWidth: '90%', maxHeight: '100%' }} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={imgCa1} alt="Third slide" className="img-fluid" style={{ maxWidth: '90%', maxHeight: '100%' }} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
