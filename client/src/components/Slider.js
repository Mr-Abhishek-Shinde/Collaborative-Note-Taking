import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgCa1 from '../image/caro01.jpeg';
import imgCa2 from '../image/caro02.jpeg';
import imgCa3 from '../image/caro03.jpeg';

function CarouselFadeExample() {
  return (
    <Carousel fade prevIcon={<i className="fa-solid fa-angle-left" style={{ color: 'black', fontSize: '30px' }}></i>} nextIcon={<i className="fa-solid fa-angle-right" style={{ color: 'black', fontSize: '30px' }}></i>}>
      <Carousel.Item>
        <img src={imgCa1} alt="First slide" className="img-fluid" style={{ maxWidth: '90%', maxHeight: '100%' }} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={imgCa2} alt="Second slide" className="img-fluid" style={{ maxWidth: '90%', maxHeight: '100%' }} />

      </Carousel.Item>
      <Carousel.Item>
        <img src={imgCa3} alt="Third slide" className="img-fluid" style={{ maxWidth: '90%', maxHeight: '100%' }} />

      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
