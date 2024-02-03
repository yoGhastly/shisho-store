import Link from "next/link";
import { GridTileImage } from "./tile";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: any;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = [
    {
      handle: "",
      title: "Vercel",
      priceRange: { maxVariantPrice: { amount: "10", currencyCode: "AED" } },
      featuredImage: {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAgVBMVEUAAAD///+1tbXy8vLv7+/r6+usrKwTExPBwcG8vLz6+vqEhITk5OT19fX4+PjMzMycnJyjo6N6enre3t5sbGzR0dHY2NiKiorHx8cdHR10dHSSkpKqqqpdXV1BQUE0NDQNDQ1TU1NhYWFGRkYuLi4kJCQ8PDwYGBgwMDBNTU2Hh4diU3JEAAAE8ElEQVR4nO2a7XqqOhCFRS0VUQGtlNbWj1rtqfd/gdtkQhLCxLbPs9mmx/X+gpkQwmKSTAK9HgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQOik127ALyKPrt2CX0QUJdduwq8hiaJoz3p22ehMxTq3lfTNO2xYX9yh3+ENfs76rFU04X1D4YsWnCuRrk47sLz7oMs7/JiJfGg+QnakyHPbcyTPY5ctuxN3GHZ5h58yp6ce895KOmdtx0I67jptWnhijUmsqGC9Hx7nM9l3nTYtOLGKqObpkv/DMc+kNeu2baGJ9aS18j05yVI1jcUlff8aoYmVGbGiV7YE1+GczvmWJ1k2Kh6+c8OHYrTMkvzNte9X/Wo5iud2CAcm1s7SyjdaM0N5Zc0JH31Tw2hTlyA5R+ejYzzRCcaxMmX7tiz5VNtLo2NgYt3ZYnnygDU5rfWjklgmFKtGDdGLKnIvz5JaVzLGzbL6dq/jhn3ZaF0wYj02W+/JMFvpJ0ksU9WRU0NUUpFarIF17cItqxZZJ9c+O1j3CUYst5WepQU54/pUPdz6fNh3a6jjgsSKl9ZbWLbLyiof2naV1wUlVvtRN2w51dX+U6cmLN7UZZMineelOpG9i8TS+vRMFJf5PC0m6uR4XmOqw2l8mq/qMY0m35DE2rRfacmXHNrO2AQL2SM1JO+nxkNiybFoUC6EiXyDNZWV4VSKd6M6+YrsWyX5pzgJSaw6FGz46f/NEuXdPJwym3Ac69C6ryuslJcCa6qLbqIB3YuKmaUptUrMoyGJxYwV9tM0oP4kNwBKc9i3Y8JUKUatWqy0WYOVXqmsjpamdkJswjMgsUxqY5OzZQ/aaQcZjTyxodAPqsQyM4bvVVCnrl5MHdS3z6NZQGLlrFZRtGVL64FqoIPHrMFdelosUwFp0q4489Qh+mg4YnkaSaOFr3ii5rT3i1UcarHMriGNdExqwg2cAjGIBSNWK5vUfLLlU3JSMKmUy1dDrxbLCK8zehcm+5KI5UEoYu29Wvl2mCdWEWWiTH44cOkx4viqpkli6lYx3vfCEct+dBf+K+JnuwClSOyGdEssuuGhVTB1QtAmELHmF7S6vMMcWRsQKvmwFLjXB65YL9KwNIapGsCoDiu/M7sRgYjlm8eImL2mXpdYgxplH2NtyHTS1RJL5bLaIlbVJ3FQOeGcm2kgDLFeLmrF9RaBSjas+b/Oa7Pn8xU7mWUNKO9sD+hqRhk+nlP6dU5va7gxe7WTk3CsZJalJA9CrMMXWtm9xYYC6d6yJMzFUkxm9mOiWQ743JBA2WsQYvmmawO/wywDqZniMzmlyL05sY4eSdz9QwF9qAxBrNcvtfK1sGx/QnQXAoutNHN51fvQKVo73FXqTA2CIYjltJllxV65YT5Ob+zgGtZ5hNmDt7GVndoZSmNnTceuXFp5lvb/CCbqGfhrEy5jfVplQv/xIjafgLaPaZqeWt9wevORDJdJ390Lqh2J9Tbmp3MlXf558jXf0srzE9ITvxb638Jsm7Mcr93QAGjPSR7Y/4xujNb3KC/Mf0Y3xvO3teL+M7oxZt8Xy/MT0u1QfC2RBb9EvBmS/g9I8Hs8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBw/gD1Fy63gEBndAAAAABJRU5ErkJggg==",
      },
    },
    {
      handle: "",
      title: "Vercel",
      priceRange: { maxVariantPrice: { amount: "10", currencyCode: "AED" } },
      featuredImage: {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAgVBMVEUAAAD///+1tbXy8vLv7+/r6+usrKwTExPBwcG8vLz6+vqEhITk5OT19fX4+PjMzMycnJyjo6N6enre3t5sbGzR0dHY2NiKiorHx8cdHR10dHSSkpKqqqpdXV1BQUE0NDQNDQ1TU1NhYWFGRkYuLi4kJCQ8PDwYGBgwMDBNTU2Hh4diU3JEAAAE8ElEQVR4nO2a7XqqOhCFRS0VUQGtlNbWj1rtqfd/gdtkQhLCxLbPs9mmx/X+gpkQwmKSTAK9HgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQOik127ALyKPrt2CX0QUJdduwq8hiaJoz3p22ehMxTq3lfTNO2xYX9yh3+ENfs76rFU04X1D4YsWnCuRrk47sLz7oMs7/JiJfGg+QnakyHPbcyTPY5ctuxN3GHZ5h58yp6ce895KOmdtx0I67jptWnhijUmsqGC9Hx7nM9l3nTYtOLGKqObpkv/DMc+kNeu2baGJ9aS18j05yVI1jcUlff8aoYmVGbGiV7YE1+GczvmWJ1k2Kh6+c8OHYrTMkvzNte9X/Wo5iud2CAcm1s7SyjdaM0N5Zc0JH31Tw2hTlyA5R+ejYzzRCcaxMmX7tiz5VNtLo2NgYt3ZYnnygDU5rfWjklgmFKtGDdGLKnIvz5JaVzLGzbL6dq/jhn3ZaF0wYj02W+/JMFvpJ0ksU9WRU0NUUpFarIF17cItqxZZJ9c+O1j3CUYst5WepQU54/pUPdz6fNh3a6jjgsSKl9ZbWLbLyiof2naV1wUlVvtRN2w51dX+U6cmLN7UZZMineelOpG9i8TS+vRMFJf5PC0m6uR4XmOqw2l8mq/qMY0m35DE2rRfacmXHNrO2AQL2SM1JO+nxkNiybFoUC6EiXyDNZWV4VSKd6M6+YrsWyX5pzgJSaw6FGz46f/NEuXdPJwym3Ac69C6ryuslJcCa6qLbqIB3YuKmaUptUrMoyGJxYwV9tM0oP4kNwBKc9i3Y8JUKUatWqy0WYOVXqmsjpamdkJswjMgsUxqY5OzZQ/aaQcZjTyxodAPqsQyM4bvVVCnrl5MHdS3z6NZQGLlrFZRtGVL64FqoIPHrMFdelosUwFp0q4489Qh+mg4YnkaSaOFr3ii5rT3i1UcarHMriGNdExqwg2cAjGIBSNWK5vUfLLlU3JSMKmUy1dDrxbLCK8zehcm+5KI5UEoYu29Wvl2mCdWEWWiTH44cOkx4viqpkli6lYx3vfCEct+dBf+K+JnuwClSOyGdEssuuGhVTB1QtAmELHmF7S6vMMcWRsQKvmwFLjXB65YL9KwNIapGsCoDiu/M7sRgYjlm8eImL2mXpdYgxplH2NtyHTS1RJL5bLaIlbVJ3FQOeGcm2kgDLFeLmrF9RaBSjas+b/Oa7Pn8xU7mWUNKO9sD+hqRhk+nlP6dU5va7gxe7WTk3CsZJalJA9CrMMXWtm9xYYC6d6yJMzFUkxm9mOiWQ743JBA2WsQYvmmawO/wywDqZniMzmlyL05sY4eSdz9QwF9qAxBrNcvtfK1sGx/QnQXAoutNHN51fvQKVo73FXqTA2CIYjltJllxV65YT5Ob+zgGtZ5hNmDt7GVndoZSmNnTceuXFp5lvb/CCbqGfhrEy5jfVplQv/xIjafgLaPaZqeWt9wevORDJdJ390Lqh2J9Tbmp3MlXf558jXf0srzE9ITvxb638Jsm7Mcr93QAGjPSR7Y/4xujNb3KC/Mf0Y3xvO3teL+M7oxZt8Xy/MT0u1QfC2RBb9EvBmS/g9I8Hs8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBw/gD1Fy63gEBndAAAAABJRU5ErkJggg==",
      },
    },
    {
      handle: "",
      title: "Vercel",
      priceRange: { maxVariantPrice: { amount: "10", currencyCode: "AED" } },
      featuredImage: {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAgVBMVEUAAAD///+1tbXy8vLv7+/r6+usrKwTExPBwcG8vLz6+vqEhITk5OT19fX4+PjMzMycnJyjo6N6enre3t5sbGzR0dHY2NiKiorHx8cdHR10dHSSkpKqqqpdXV1BQUE0NDQNDQ1TU1NhYWFGRkYuLi4kJCQ8PDwYGBgwMDBNTU2Hh4diU3JEAAAE8ElEQVR4nO2a7XqqOhCFRS0VUQGtlNbWj1rtqfd/gdtkQhLCxLbPs9mmx/X+gpkQwmKSTAK9HgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQOik127ALyKPrt2CX0QUJdduwq8hiaJoz3p22ehMxTq3lfTNO2xYX9yh3+ENfs76rFU04X1D4YsWnCuRrk47sLz7oMs7/JiJfGg+QnakyHPbcyTPY5ctuxN3GHZ5h58yp6ce895KOmdtx0I67jptWnhijUmsqGC9Hx7nM9l3nTYtOLGKqObpkv/DMc+kNeu2baGJ9aS18j05yVI1jcUlff8aoYmVGbGiV7YE1+GczvmWJ1k2Kh6+c8OHYrTMkvzNte9X/Wo5iud2CAcm1s7SyjdaM0N5Zc0JH31Tw2hTlyA5R+ejYzzRCcaxMmX7tiz5VNtLo2NgYt3ZYnnygDU5rfWjklgmFKtGDdGLKnIvz5JaVzLGzbL6dq/jhn3ZaF0wYj02W+/JMFvpJ0ksU9WRU0NUUpFarIF17cItqxZZJ9c+O1j3CUYst5WepQU54/pUPdz6fNh3a6jjgsSKl9ZbWLbLyiof2naV1wUlVvtRN2w51dX+U6cmLN7UZZMineelOpG9i8TS+vRMFJf5PC0m6uR4XmOqw2l8mq/qMY0m35DE2rRfacmXHNrO2AQL2SM1JO+nxkNiybFoUC6EiXyDNZWV4VSKd6M6+YrsWyX5pzgJSaw6FGz46f/NEuXdPJwym3Ac69C6ryuslJcCa6qLbqIB3YuKmaUptUrMoyGJxYwV9tM0oP4kNwBKc9i3Y8JUKUatWqy0WYOVXqmsjpamdkJswjMgsUxqY5OzZQ/aaQcZjTyxodAPqsQyM4bvVVCnrl5MHdS3z6NZQGLlrFZRtGVL64FqoIPHrMFdelosUwFp0q4489Qh+mg4YnkaSaOFr3ii5rT3i1UcarHMriGNdExqwg2cAjGIBSNWK5vUfLLlU3JSMKmUy1dDrxbLCK8zehcm+5KI5UEoYu29Wvl2mCdWEWWiTH44cOkx4viqpkli6lYx3vfCEct+dBf+K+JnuwClSOyGdEssuuGhVTB1QtAmELHmF7S6vMMcWRsQKvmwFLjXB65YL9KwNIapGsCoDiu/M7sRgYjlm8eImL2mXpdYgxplH2NtyHTS1RJL5bLaIlbVJ3FQOeGcm2kgDLFeLmrF9RaBSjas+b/Oa7Pn8xU7mWUNKO9sD+hqRhk+nlP6dU5va7gxe7WTk3CsZJalJA9CrMMXWtm9xYYC6d6yJMzFUkxm9mOiWQ743JBA2WsQYvmmawO/wywDqZniMzmlyL05sY4eSdz9QwF9qAxBrNcvtfK1sGx/QnQXAoutNHN51fvQKVo73FXqTA2CIYjltJllxV65YT5Ob+zgGtZ5hNmDt7GVndoZSmNnTceuXFp5lvb/CCbqGfhrEy5jfVplQv/xIjafgLaPaZqeWt9wevORDJdJ390Lqh2J9Tbmp3MlXf558jXf0srzE9ITvxb638Jsm7Mcr93QAGjPSR7Y/4xujNb3KC/Mf0Y3xvO3teL+M7oxZt8Xy/MT0u1QfC2RBb9EvBmS/g9I8Hs8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBw/gD1Fy63gEBndAAAAABJRU5ErkJggg==",
      },
    },
  ];
  if (!homepageItems[0]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
