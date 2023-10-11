/** https://nextjs.org/docs/api-reference/next/image */
import type { NextPage } from 'next';
import Image from 'next/image';
import LegacyImage from 'next/legacy/image';
import example from '/public/example.jpg';

const Images: NextPage = () => {
  /* 

Next Js Image component (ver 13)
loading 옵션으로 lazy loading 가능 ( 성능 향상 )
webp 타입 용량 최적화 ( 서버에서 이미지 사이즈 최적화 )
quality 옵션으로 최적화 설정 가능 ( 기본값 75 )
placeholder = "blur" 이미지 다운되는 동안 자동 블러 처리 ( 단 빌드 타임에서 이미지의 정보를 미리 알 수 있어 처리하기 때문에 이미지를 static 하게 import 할 경우에만 가능 )
외부 링크를 통해 이미지를 받아 올 경우 fill 옵션을 통해 처리 가능 ( 부모의 사이즈에 의해 결정 )
외부 링크 도메인 허용 ( next.config.js에서 처리 )  

*/
  return (
    <main>
      {/* loading check */}
      {/*<section style={{ height: '500vh' }}>long long content</section>*/}

      <hr style={{ margin: '32px 0' }} />

      {/*<h1>img tag</h1>*/}

      {/*<figure>*/}
      {/*  <img*/}
      {/*    src="https://inflearn-nextjs.vercel.app/example.jpg"*/}
      {/*    alt="example"*/}
      {/*    width={500}*/}
      {/*    height={100}*/}
      {/*    https://web.dev/browser-level-image-lazy-loading/ */}
      {/*    // loading="lazy"*/}
      {/*  />*/}
      {/*  <figcaption>example img</figcaption>*/}
      {/*</figure>*/}

      {/*<hr style={{ margin: '32px 0' }} />*/}

      <h1>next/image</h1>

      <figure>
        <Image
          src={example}
          alt="v13 image"
          // width={500}
          // height={100}
          // placeholder="blur"
        />
        <figcaption>v13 image</figcaption>
      </figure>

      <figure>
        <Image
          src="https://inflearn-nextjs.vercel.app/example.jpg"
          alt="v13 image"
          width={500}
          height={100}
        />
        <figcaption>v13 image</figcaption>
      </figure>

      {/* ERROR */}
      {/*<figure>*/}
      {/*  <Image src="/example.jpg" alt="v13 image" />*/}
      {/*  <figcaption>v13 image</figcaption>*/}
      {/*</figure>*/}

      <figure style={{ position: 'relative', width: '500px', height: '100px' }}>
        <Image
          src="https://inflearn-nextjs.vercel.app/example.jpg"
          alt="v13 fill"
          fill
          style={{ objectFit: 'cover' }}
        />
      </figure>

      <hr style={{ margin: '32px 0' }} />

      <h1>next/legacy/image</h1>

      {/** statically import */}
      <figure>
        <LegacyImage src={example} alt="example image" />
        <figcaption>intrinsic static image</figcaption>
      </figure>

      {/* ERROR */}
      {/*<figure>*/}
      {/*  <Image src="/example.jpg" alt="example" />*/}
      {/*  <figcaption>example image</figcaption>*/}
      {/*</figure>*/}

      {/** path string */}
      <figure>
        <LegacyImage
          src="/example.jpg"
          alt="intrinsic image"
          width={500}
          height={100}
        />
        <figcaption>intrinsic remote image</figcaption>
      </figure>

      <figure>
        <LegacyImage
          src={example}
          alt="fixed image"
          layout="fixed"
          width={500}
          height={100}
        />
        <figcaption>fixed image</figcaption>
      </figure>

      <figure>
        <LegacyImage
          src={example}
          alt="responsive image"
          layout="responsive"
          width={500}
          height={100}
        />
        <figcaption>responsive image</figcaption>
      </figure>

      <figure>
        <div style={{ width: 500, height: 100, position: 'relative' }}>
          <LegacyImage
            src="/example.jpg"
            alt="fill image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <figcaption>fill image</figcaption>
      </figure>

      <hr style={{ margin: '32px 0' }} />
    </main>
  );
};

export default Images;
