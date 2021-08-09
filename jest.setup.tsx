import '@testing-library/jest-dom';
// eslint-disable-next-line react/display-name
jest.mock('next/image', () => ({src, alt} :any) => { 
  // eslint-disable-next-line @next/next/no-img-element
  return(<img src={src} alt={alt} />);
}
);