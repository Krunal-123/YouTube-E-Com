import Flickity from 'react-flickity-component';

const flickityOptions = {
  initialIndex: 0,  // Start at the first slide (index 0)
  wrapAround: true, // Enables looping
  autoPlay: 5000,   // Optional: Automatically move to the next slide every 5 seconds
  prevNextButtons: true,  // Show previous/next buttons
  pageDots: true,         // Show navigation dots
  pauseAutoPlayOnHover: false, // Optional: Prevent autoPlay from pausing on hover
};

export default function Carousel() {
  return (
    <>
      {/* APP render */}
      <Flickity
        className={'md:hidden carousel mt-4 w-100 h-[240px] border-0'}  // Custom class for styling
        elementType={'div'}     // The type of container element (div)
        options={flickityOptions}  // Flickity options
        disableImagesLoaded={false} // Wait until all images are loaded
        reloadOnUpdate={true}  // Reload carousel on update
        static={true}          // Static carousel (no dragging)
      >
        {/* img 1 */}
        <img src="https://i.pinimg.com/originals/c3/5e/e5/c35ee563912b41eab22839be11d887ec.gif" alt="Carousel Slide 1" className='h-[240px] border-0' />
        {/* img 2 */}
        <img src="https://1.bp.blogspot.com/-C-tElKnDojw/W_4_zsIirsI/AAAAAAAAYMc/V0zcWYU3WIQGM0Pj6IdD2M4-QpZoZ7JswCLcBGAs/s1600/merry-christmas-animated-gif.gif" alt="Carousel Slide 2" className='h-[240px] border-0' />
        {/* img 3 */}
        <img src="https://i0.wp.com/www.wordzz.com/wp-content/uploads/2018/12/Happy-New-Year-Colorful.gif?resize=587%2C263&ssl=1" alt="Carousel Slide 3" className='h-[240px] border-0' />
        {/* img 4*/}
        <img src="https://3.bp.blogspot.com/-Th7qDL9q90I/WF-6Hh6f_4I/AAAAAAAAKPQ/J_5BfLHx5J4DR4CFf5x3V5oSfAVNsYkdQCLcB/s1600/happy-new-year-colorful-fireworks-over-city-animated-gif.gif" alt="Carousel Slide 3" className='h-[240px] border-0' />
      </Flickity>

      {/* DESKTOP */}
      <Flickity
        className={'max-md:hidden carousel mt-4 w-100 h-100 border-0'} // Custom class for styling
        elementType={'div'}     // The type of container element (div)
        options={flickityOptions}  // Flickity options
        disableImagesLoaded={false} // Wait until all images are loaded
        reloadOnUpdate={true}  // Reload carousel on update
        static={true}          // Static carousel (no dragging)
      >
        {/* img1 */}
        <img src="https://i.pinimg.com/originals/c3/5e/e5/c35ee563912b41eab22839be11d887ec.gif" alt="Carousel Slide 1" className='h-[400px] border-0 rounded' />
        {/* img2 */}
        <img src="https://1.bp.blogspot.com/-C-tElKnDojw/W_4_zsIirsI/AAAAAAAAYMc/V0zcWYU3WIQGM0Pj6IdD2M4-QpZoZ7JswCLcBGAs/s1600/merry-christmas-animated-gif.gif" alt="Carousel Slide 2" className='h-[400px] rounded border-0' />
        {/* img3 */}
        <img src="https://i0.wp.com/www.wordzz.com/wp-content/uploads/2018/12/Happy-New-Year-Colorful.gif?resize=587%2C263&ssl=1" alt="Carousel Slide 3" className='h-[400px] rounded border-0' />
        {/* img4 */}
        <img src="https://3.bp.blogspot.com/-Th7qDL9q90I/WF-6Hh6f_4I/AAAAAAAAKPQ/J_5BfLHx5J4DR4CFf5x3V5oSfAVNsYkdQCLcB/s1600/happy-new-year-colorful-fireworks-over-city-animated-gif.gif" alt="Carousel Slide 3" className='h-[400px] rounded border-0' />
      </Flickity>
    </>
  );
}
