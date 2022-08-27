export function Links(
  { links }: { links: Array<{ name: string, link: string }> }) {
  return (
    <>
      {links && links.map((value, index) => {
        return (<a
          key={index} href={value.link}
          target="_blank" rel="noreferrer">
          {value.name}</a>);
      })}
      <style jsx>{`
        a {
          line-height: 1.5em;
          padding: 10px;
          margin: 0 1rem;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          transition: 0.5s;
        }
        a:hover {
          color: #7952b3;
          box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
}