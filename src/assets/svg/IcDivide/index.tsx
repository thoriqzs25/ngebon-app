import Svg, { Path } from 'react-native-svg';

const IcDivide = ({ size }: { size?: number }) => {
  return (
    <Svg width={size ?? 50} height={size ?? 50} viewBox='0 0 50 50' fill='none'>
      <Path
        d='M0 25c0-4.647 0-6.97.384-8.902A20 20 0 0116.098.384C18.03 0 20.353 0 25 0c4.647 0 6.97 0 8.902.384a20 20 0 0115.714 15.714C50 18.03 50 20.353 50 25c0 4.647 0 6.97-.384 8.902a20 20 0 01-15.714 15.714C31.97 50 29.647 50 25 50c-4.647 0-6.97 0-8.902-.384A20 20 0 01.384 33.902C0 31.97 0 29.647 0 25z'
        fill='#455A64'
      />
      <Path
        d='M10 25c0-2.788 0-4.182.23-5.341a12 12 0 019.429-9.428C20.819 10 22.212 10 25 10c2.788 0 4.182 0 5.341.23a12 12 0 019.428 9.429C40 20.819 40 22.212 40 25c0 2.788 0 4.182-.23 5.341a12 12 0 01-9.429 9.428C29.181 40 27.788 40 25 40c-2.788 0-4.182 0-5.341-.23a12 12 0 01-9.428-9.429C10 29.181 10 27.788 10 25z'
        fill='#fff'
      />
      <Path
        d='M22.997 24.625h1.628A3.375 3.375 0 0128 28h-5.25v.75h6V28a4.184 4.184 0 00-.665-2.25h2.165a3.75 3.75 0 013.387 2.138c-1.774 2.341-4.646 3.862-7.887 3.862-2.07 0-3.825-.442-5.25-1.219v-6.978c.913.131 1.774.5 2.497 1.072zM19.75 30.25A.75.75 0 0119 31h-1.5a.75.75 0 01-.75-.75V23.5a.75.75 0 01.75-.75H19a.75.75 0 01.75.75v6.75zm9.75-10.5a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm-5.25-2.25a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z'
        fill='#455A64'
      />
    </Svg>
  );
};

export default IcDivide;
