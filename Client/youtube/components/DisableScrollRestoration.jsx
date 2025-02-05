import { useEffect } from 'react';

const DisableScrollRestoration = () => {
  // This component doesn't render anything visually
  return (useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the r oute changes
  }, []))

};

export default DisableScrollRestoration;
