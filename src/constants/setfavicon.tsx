type SetFaviconProps = {
    type: string
}

export default function setfavicon({ type }: SetFaviconProps){
    //Set favicon
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    let linka = document.querySelector("link[rel~='apple-touch-icon']") as HTMLLinkElement;
    
    if(type==='user'){
        link.href = link.href.replace("logoD.png", "logo.png");
        linka.href = linka.href.replace("logoD.png", "logo.png");
    }
    
    if(type==='driver'){
        link.href = link.href.replace("logo.png", "logoD.png");
        linka.href = linka.href.replace("logo.png", "logoD.png");
    }
}