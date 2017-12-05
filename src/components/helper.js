export function ContentSnippet(content){
     return content.split(/\s+/).slice(0, 7).join(" ")+"...";
}
