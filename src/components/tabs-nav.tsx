import Link from "next/link";

export enum Tabs {
  recent = '最近文章',
}

export function TabsNav({ styles, setTab, tab }: {
  styles: { readonly [key: string]: string; }, setTab?: Function, tab: Tabs | string
}) {
  return (
    <div className={styles.tabs} id='tabs'>
      {Object.values(Tabs).map((value, index) => {
        return (
          <Link key={index} href={'/'} >
            <a key={index}
              className={tab === value ? 'active-underline' : ''}
              onClick={() => {
                setTab && setTab(value);
              }}>{value}</a>
          </Link>
        );
      })}
      <Link href={'/pages/tags'}>
        <a className={tab === 'tags' ? 'active-underline' : ''}>标签</a>
      </Link>
      <Link href={'/pages/link'} >
        <a className={tab === 'link' ? 'active-underline' : ''}>链接</a>
      </Link>
      <style jsx>{`
        a:hover {
          color: #7952b3;
        }
      `}</style>
    </div>
  );
}