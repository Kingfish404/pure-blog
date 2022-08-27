import { useEffect } from "react";

export function Comment({ url }: { url: string }) {
  useEffect(() => {
    if (url !== null) {
      /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
      /*
      var disqus_config = function () {
      this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      */
      (function () { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = url;
        s.setAttribute('data-timestamp', Date.now().toString());
        (d.head || d.body).appendChild(s);
      })();
    }
  }, [url]);
  return (
    <div>
      <div id="disqus_thread" style={{ marginTop: '100px' }}></div>
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    </ div >
  );
}
