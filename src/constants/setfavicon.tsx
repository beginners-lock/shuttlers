type SetFaviconProps = {
    type: string
}

export default function setfavicon({ type }: SetFaviconProps){
    //Set favicon
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    let linka = document.querySelector("link[rel~='apple-touch-icon']") as HTMLLinkElement;
    if(!link){
        link = document.createElement('link');
        link.rel = "icon";
        console.log(document.getElementsByTagName('head')[0].innerHTML);
        document.head.appendChild(link)
    }

    if(!linka){
        linka = document.createElement('link');
        linka.rel = "apple-touch-icon";
        document.head.appendChild(linka)
    }
    
    if(type==='driver'){
        link.href = link.href.replace("logo", "logoD");
        linka.href = linka.href.replace("logo", "logoD");
    }
}