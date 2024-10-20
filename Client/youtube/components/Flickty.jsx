import Flickity from 'react-flickity-component';

const flickityOptions = {
  initialIndex: 0,  // Start at the first slide (index 0)
  wrapAround: true, // Enables looping
  autoPlay: 7000,   // Optional: Automatically move to the next slide every 3 seconds
  prevNextButtons: true,  // Show previous/next buttons
  pageDots: true,         // Show navigation dots
  pauseAutoPlayOnHover: false, // Optional: Prevent autoPlay from pausing on hover
};

export default function Carousel() {
  return (
    <>
    {/* DESKTOP */}
      <Flickity
        className={'carousel mt-4 w-100 h-100 border-0 max-md:hidden'} // Custom class for styling
        elementType={'div'}     // The type of container element (div)
        options={flickityOptions}  // Flickity options
        disableImagesLoaded={false} // Wait until all images are loaded
        reloadOnUpdate={true}  // Reload carousel on update
        static={true}          // Static carousel (no dragging)
      >
        <img src="../../src/assets/carousel 1.jpg" alt="Carousel Slide 1" className='h-[400px] border-0 rounded' />
        <img src="../../src/assets/carousel 2.jpg" alt="Carousel Slide 2" className='h-[400px] rounded border-0' />
        <img src="../../src/assets/carousel 3.jpg" alt="Carousel Slide 3" className='h-[400px] rounded border-0' />
      </Flickity>

      {/* APP render */}
      <Flickity
        className={'carousel mt-4 w-100 h-[250px] border-0 md:hidden'}  // Custom class for styling
        elementType={'div'}     // The type of container element (div)
        options={flickityOptions}  // Flickity options
        disableImagesLoaded={false} // Wait until all images are loaded
        reloadOnUpdate={true}  // Reload carousel on update
        static={true}          // Static carousel (no dragging)
      >
        <img src="../../src/assets/carousel 1.jpg" alt="Carousel Slide 1" className='h-[400px] border-0 rounded' />
        <img src="../../src/assets/carousel 2.jpg" alt="Carousel Slide 2" className='h-[400px] rounded border-0' />
        <img src="../../src/assets/carousel 3.jpg" alt="Carousel Slide 3" className='h-[400px] rounded border-0' />
      </Flickity>
    </>
  );
}
