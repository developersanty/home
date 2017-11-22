import React  from 'react'
import Slider from 'react-slick'
import $ from 'jquery'
function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
      <div className={className} style={{...style, display: 'block', background: 'lightgray'}} onClick={onClick}></div>
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props
    return (
        <div
            className={className}
            style={{...style, display: 'block', background: 'lightgray'}}
            onClick={onClick}
        ></div>
    );
}
class Inspiration extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return <div className='inspiration-bar'>
      <div>Inspiration/Tips</div>
      <div className='inspiration-content'>
        <Slider {...settings} >
          <div className='item'>Do a little bit of this and a little bit of that.</div>
          <div className='item'>
            If you wanna come along you come along and sing a song this is how we do it when we're having fun. Is everybody ready? tell me when you're ready?
            Vaa endraal vanakkam, poo endral manakkum!
          </div>
          <div className='item'>Never Say Never! Never Never Never...</div>
            <div className='item'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </div>
        </Slider>
      </div>
    </div>
  }
}

export default Inspiration