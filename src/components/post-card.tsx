import Link from 'next/link';

export function PostCard(
  { year, month, id, title, desc, tags, date }:
    {
      year: string, month: string, id: string,
      title: string, desc?: string, tags: Array<string>, date: string
    }
) {
  return (
    <>
      <article>
        <h3 id={title}>
          <Link
            href={{
              pathname: '/posts/[year]/[month]/[id]',
              query: { year: year, month: month, id: id }
            }} >{title}
          </Link>
        </h3>
        <p>{desc}</p>
        {tags && tags.map((value, index) => {
          return (
            <Link key={index} href={`/pages/tags#${value}`} passHref>
              <span className={'posts-type'} >{value}</span>
            </Link>
          );
        })}
        <span>{new Date(date).toDateString()}</span>
      </article>
      <style jsx>{`
        article {
          margin: 24px;
          padding: 24px 40px;
          border: 0.5px solid #dddddd;
          box-sizing: border-box;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
        }

        h4 {
          margin: 0;
          font-size: 24px;
        }
      
        span {
          margin-left: 0;
          line-height: 1.5em;
        }
        
        @media screen and (max-width: 600px) {
          section {
            padding: 24px;
          }
        }`}
      </style>
    </>
  );
}